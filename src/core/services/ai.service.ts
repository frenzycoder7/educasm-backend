import { Injectable } from '@nestjs/common';
import { Question, ExploreResponse } from '../../types/';
import OpenAI from 'openai';
import { ConfigService } from '@nestjs/config';
import { ConfigKeys } from 'src/config/config.keys';
import { EnhancedGenerateContentResponse, GoogleGenerativeAI } from '@google/generative-ai';
import { AiPromptPattern } from '../functions/ai-prompt-pattern';
import { IExploreContent } from '../interfaces/explore-content.interface';
import { v4 as uuidv4 } from 'uuid';
@Injectable()
export class AIService {
    constructor(private readonly configService: ConfigService) { }
    private openai: OpenAI = new OpenAI({
        apiKey: this.configService.get(ConfigKeys.OPENAI_API_KEY),
        dangerouslyAllowBrowser: true
    });

    private gemini: GoogleGenerativeAI = new GoogleGenerativeAI(this.configService.get(ConfigKeys.GEMINI_API_KEY) ?? "");
    private model = this.gemini.getGenerativeModel({ model: this.configService.get(ConfigKeys.GEMINI_ENGINE) ?? "" });




    private async makeRequest(systemPrompt: string, userPrompt: string, maxTokens: number = 2000) {
        try {
            // const stream = await this.openai.chat.completions.create({
            //     model: 'gpt-3.5-turbo',
            //     messages: [
            //         { role: 'system', content: systemPrompt },
            //         { role: 'user', content: userPrompt }
            //     ],
            //     stream: true,
            //     temperature: 0.7
            // });
            this.model.systemInstruction = {
                parts: [{ text: systemPrompt }],
                role: 'system',
            }
            this.model.generationConfig = {
                temperature: 0.7,
                topP: 0.9,
                topK: 40,
                maxOutputTokens: maxTokens,
                responseMimeType: 'application/json'
            }
            const response = await this.model.generateContent(userPrompt)
            return response.response.text()
        } catch (error) {
            console.error('OpenAI API Error:', error);
            throw new Error('Failed to generate content');
        }
    }

    private async streamResponse(systemPrompt: string, userPrompt: string, maxTokens: number = 2000) {
        this.model.systemInstruction = {
            parts: [{ text: systemPrompt }],
            role: 'system',
        }
        this.model.generationConfig = {
            temperature: 0.7,
            topP: 0.9,
            topK: 40,
            maxOutputTokens: maxTokens,
            responseMimeType: 'application/json'
        }
        const response = await this.model.generateContentStream(userPrompt)
        return response.stream
    }





    private validateQuestionFormat(question: Question): boolean {
        try {
            // Basic validation
            if (!question.text?.trim()) return false;
            if (!Array.isArray(question.options) || question.options.length !== 4) return false;
            if (question.options.some(opt => !opt?.trim())) return false;
            if (typeof question.correctAnswer !== 'number' ||
                question.correctAnswer < 0 ||
                question.correctAnswer > 3) return false;

            // Explanation validation
            if (!question.explanation?.correct?.trim() ||
                !question.explanation?.key_point?.trim()) return false;

            // Additional validation
            if (question.text.length < 10) return false;  // Too short
            if (question.options.length !== new Set(question.options).size) return false; // Duplicates
            if (question.explanation.correct.length < 5 ||
                question.explanation.key_point.length < 5) return false; // Too short explanations

            return true;
        } catch (error) {
            console.error('Validation error:', error);
            return false;
        }
    }

    async getPlaygroundQuestion(topics: string, level: number, age: number): Promise<Question> {
        try {
            const { systemPrompt, userPrompt } = AiPromptPattern.getQuestionPrompt(
                topics,
                level,
                age,
                AiPromptPattern.getPlaygroundQuestionAspects()
            );

            const content = await this.makeRequest(systemPrompt, userPrompt, 1500);
            if (!content) {
                throw new Error('Empty response received');
            }

            let parsedContent: Question;
            try {
                parsedContent = JSON.parse(content);
            } catch (error) {
                console.error('JSON Parse Error:', error);
                throw new Error('Invalid JSON response');
            }

            // Randomly shuffle the options and adjust correctAnswer accordingly
            const shuffled = this.shuffleOptionsAndAnswer(parsedContent);

            // Validate and format the question
            const formattedQuestion: Question = {
                text: shuffled.text || '',
                options: shuffled.options,
                correctAnswer: shuffled.correctAnswer,
                explanation: {
                    correct: shuffled.explanation?.correct || 'Correct answer explanation',
                    key_point: shuffled.explanation?.key_point || 'Key learning point'
                },
                difficulty: level,
                topic: shuffled.topic || topics,
                subtopic: parsedContent.subtopic || topics,
                questionType: parsedContent.questionType || 'conceptual',
                ageGroup: age.toString()
            };



            if (this.validateQuestionFormat(formattedQuestion)) {
                return formattedQuestion;
            }

            throw new Error('Generated question failed validation');
        } catch (error) {
            console.error('Question generation error:', error);
            throw new Error('Failed to generate valid question');
        }
    }

    private shuffleOptionsAndAnswer(question: Question): Question {
        // Create array of option objects with original index
        const optionsWithIndex = question.options.map((opt, idx) => ({
            text: opt,
            isCorrect: idx === question.correctAnswer
        }));

        // Shuffle the options
        for (let i = optionsWithIndex.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [optionsWithIndex[i], optionsWithIndex[j]] = [optionsWithIndex[j], optionsWithIndex[i]];
        }

        // Find new index of correct answer
        const newCorrectAnswer = optionsWithIndex.findIndex(opt => opt.isCorrect);

        return {
            ...question,
            options: optionsWithIndex.map(opt => opt.text),
            correctAnswer: newCorrectAnswer
        };
    }





    async exploreQuery(
        query: string,
        age: number,
    ): Promise<IExploreContent> {
        const messageId = uuidv4();
        const { systemPrompt, userPrompt } = AiPromptPattern.getExploreContentPromptV2(query, age);
        const response = await this.makeRequest(systemPrompt, userPrompt, 2000)
        const data = JSON.parse(response)
        data.messageId = messageId;
        data.type = 'ai';
        return data;
    }
}


