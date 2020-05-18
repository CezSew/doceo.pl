export interface LoginProps {
    history: any,
    dispatchLogin: Function
}

export interface LoginState {
    username: string,
    password: string,
    error: boolean
}
