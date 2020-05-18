export interface TestsHubProps {
    user: {
        name: string|undefined
    },
    quizes_all_by_rating: Array<string>|undefined,
    request_in_progress: boolean,
    onRequestTopQuizes: Function
}
