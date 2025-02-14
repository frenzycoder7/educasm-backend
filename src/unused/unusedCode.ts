import { Question } from "src/types";

class UnUsedCode {
   async exploreQuery(query: string): Promise<string> {
      try {
         // const response = await this.openai.chat.completions.create({
         //     model: 'gpt-3.5-turbo',
         //     messages: [
         //         {
         //             role: 'system' as const,
         //             content: 'You are a social media trend expert who explains topics by connecting them to current viral trends, memes, and pop culture moments.'
         //         },
         //         {
         //             role: 'user' as const,
         //             content: this.buildPrompt(query)
         //         }
         //     ],
         //     temperature: 0.9,
         //     max_tokens: 4000
         // });

         // return response.choices[0].message?.content || '';
         return 'bestie, the wifi must be acting up... let me try again';
      } catch (error) {
         console.error('Error in exploreQuery:', error);
         return 'bestie, the wifi must be acting up... let me try again';
      }
   }

   // Helper method to build the prompt
   private buildPrompt(query: string): string {
      return `
      Explain "${query}" using current social media trends, memes, and pop culture references.
      
      Content Style Guide:
      1. Social Media Format Mix:
         - Start with a TikTok-style hook ("POV: you're learning ${query}")
         - Add Instagram carousel-style bullet points
         - Use Twitter/X thread style for facts
         - Include YouTube shorts-style quick explanations
         - End with a viral trend reference
      
      2. Current Trends to Use:
         - Reference viral TikTok sounds/trends
         - Use current meme formats
         - Mention trending shows/movies
         - Reference popular games
         - Include viral challenges
         - Use trending audio references
      
      3. Make it Relatable With:
         - Instagram vs Reality comparisons
         - "That one friend who..." examples
         - "Nobody: / Me:" format
         - "Real ones know..." references
         - "Living rent free in my head" examples
         - "Core memory" references
      
      4. Structure it Like:
         - 🎭 The Hook (TikTok style intro)
         - 📱 The Breakdown (Instagram carousel style)
         - 🧵 The Tea (Twitter thread style facts)
         - 🎬 Quick Takes (YouTube shorts style)
         - 🌟 The Trend Connection (viral reference)
      
      5. Format as:
         {
           "part": {
             "style": "tiktok/insta/twitter/youtube/trend",
             "content": "explanation using current trend",
             "trendReference": "name of trend being referenced",
             "viralComparisons": ["relatable comparison 1", "relatable comparison 2"],
             "popCultureLinks": {
               "trend or term": "how it relates to the topic"
             }
           }
         }

      6. Related Content Style:
         - "Trending topics to explore..."
         - "This gives... vibes"
         - "Main character moments in..."
         - "POV: when you learn about..."

      Important:
      - Use CURRENT trends (2024)
      - Reference viral moments
      - Make pop culture connections
      - Use platform-specific formats
      - Keep updating references
    `;
   }


   async getTestQuestions(topic: string, examType: 'JEE' | 'NEET') {
      try {
         const systemPrompt = `Create a ${examType} exam test set about ${topic}.
      Generate exactly 15 questions following this structure:
      {
        "questions": [
          {
            "text": "Clear question text",
            "options": ["A", "B", "C", "D"],
            "correctAnswer": 0,
            "explanation": "Step-by-step solution",
            "difficulty": 1,
            "topic": "${topic}",
            "subtopic": "specific concept",
            "examType": "${examType}",
            "questionType": "conceptual"
          }
        ]
      }`;
         // ..


         console.log('Generating test questions...');

         // const content = await this.makeRequest(
         //    systemPrompt,
         //    `Create 15 ${examType} questions about ${topic} (5 easy, 5 medium, 5 hard)`,
         //    3000
         // );

         console.log('Received response from API');

         // if (!content) {
         //    console.error('Empty response from API');
         //    throw new Error('No content received from API');
         // }

         // let parsed;
         // try {
         //    parsed = JSON.parse(content);
         //    console.log('Successfully parsed JSON response');
         // } catch (error) {
         //    console.error('JSON parse error:', error);
         //    console.log('Raw content:', content);
         //    throw new Error('Failed to parse API response');
         // }

         // if (!parsed?.questions || !Array.isArray(parsed.questions)) {
         //    console.error('Invalid response structure:', parsed);
         //    throw new Error('Invalid response structure');
         // }

         // console.log(`Received ${parsed.questions.length} questions`);

         // const processedQuestions = parsed.questions.map((q: Partial<Question>, index: number) => {
         //    const difficulty = Math.floor(index / 5) + 1;
         //    return {
         //       text: q.text || '',
         //       options: Array.isArray(q.options) ? q.options : [],
         //       correctAnswer: typeof q.correctAnswer === 'number' ? q.correctAnswer : 0,
         //       explanation: q.explanation || '',
         //       difficulty,
         //       topic,
         //       subtopic: q.subtopic || `${topic} Concept ${index + 1}`,
         //       examType,
         //       questionType: 'conceptual',
         //       ageGroup: '16-18'
         //    } as Question;
         // });

         // console.log('Processed questions:', processedQuestions.length);

         // const validQuestions = processedQuestions.filter((q: Question) => {
         //    const isValid = this.validateQuestionFormat(q);
         //    if (!isValid) {
         //       console.log('Invalid question:', q);
         //    }
         //    return isValid;
         // });

         // console.log(`Valid questions: ${validQuestions.length}`);

         // if (validQuestions.length >= 5) {
         //    const finalQuestions = validQuestions.slice(0, 15);
         //    console.log(`Returning ${finalQuestions.length} questions`);
         //    return finalQuestions;
         // }

         // throw new Error(`Only ${validQuestions.length} valid questions generated`);
      } catch (error) {
         console.error('Test generation error:', error);
         throw new Error(`Failed to generate test questions: ${error instanceof Error ? error.message : 'Unknown error'}`);
      }
   }
}