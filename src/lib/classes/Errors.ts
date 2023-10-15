// set of custom error classes
class NoSignerError extends Error {
    constructor(message: string) {
        super(message);
        this.name = "NoSignerError";
    }
}

export class NonceError extends Error {
    constructor(message: string) {
        super(message);
        this.name = "NonceError";
    }
}

class ContractError extends Error {
    constructor(message: string) {
        super(message);
        this.name = "ContractError";
    }
}

export { NoSignerError, ContractError }