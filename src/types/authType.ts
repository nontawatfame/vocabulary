export interface  RequestLogin {
    username: string,
    password: string
}

export interface RequestRegister {
    name: string,
    username: string,
    password: string,
    confirmPassword: string,
    
}