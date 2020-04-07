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
