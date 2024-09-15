export default interface ICustomResponse<T> {
    error: boolean;
    data: T | null;
    message: string;
}