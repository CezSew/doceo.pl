export interface SingleTestProps {
    location: {
        state: {
            quiz: {
                id: string,
                title: string,
                type: string,
                rating: string,
                votes:string,
                questions:string
            }
        }
    }
}

export interface SingleTestState {
    stats: any,
    lastQuestionIndex: number,
    questionsProbabilityArray: Array<number>,
    currentQuestion: any,
    questions: any
}
