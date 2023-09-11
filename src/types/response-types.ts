export type ResponseError = {
    error: any;
    msg: string | null;

}

export type ResponseRequest = {
    status: number | boolean, 
    error: ResponseError | string | null,
    content: any;
}