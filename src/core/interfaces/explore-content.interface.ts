export interface IExploreContent {
    messageId: string,
    type: 'ai' | 'user',
    content: {
        paragraph1: string,
        paragraph2: string,
        paragraph3: string
    },
    code: {
        summary: string,
        language: string,
        code: string
    },
    topics: {
        topic: string,
        type: string,
        reason: string
    }[],
    questions: {
        question: string,
        type: string,
        context: string
    }[]
}