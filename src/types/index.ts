
export interface ExploreResponse {
    content: string;
    relatedTopics: Array<{
        topic: string;
        type: string;
    }>;
    relatedQuestions: Array<{
        question: string;
        type: string;
        context: string;
    }>;
}

export interface RelatedTopic {
    query: string;
    type: 'prerequisite' | 'extension' | 'application' | 'parallel' | 'deeper';
    context: string;
}

export interface Question {
    text: string;
    options: string[];
    correctAnswer: number;
    explanation: {
        correct: string;
        key_point: string;
    };
    difficulty: number;
    topic: string;
    subtopic: string;
    questionType: string;
    ageGroup: string;
}

export interface SearchBarProps {
    key?: string;
    onSearch: (query: string) => Promise<void> | void;
    placeholder: string;
    centered?: boolean;
    title?: string;
    className?: string;
    suggestions?: Array<{
        text: string;
        icon: string;
    }>;
    buttonText?: string;
    initialValue?: string;
    onSubmit?: (query: string) => void;
}

export interface QuestionHistory {
    usedQuestions: Set<string>;
    lastLevel: number;
    consecutiveCorrect: number;
    consecutiveWrong: number;
    topicStrength: number;
    usedContexts: Set<string>;
    usedConcepts: Set<string>;
    usedApplications: Set<string>;
    usedExamples: Set<string>;
}
