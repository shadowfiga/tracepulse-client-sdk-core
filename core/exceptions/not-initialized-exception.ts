export class NotInitializedException extends Error {
    public constructor(reason: string) {
        super(reason)
    }
}
