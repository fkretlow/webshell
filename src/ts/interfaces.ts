interface InputConsumer {
    consume(e: KeyboardEvent): void;
    getPrompt(): string;
}

interface InputDevice {
    lockInput(to: InputConsumer): Boolean;
    releaseInput(): void;
}

interface OutputDevice {
    push(what: string): void;
    clear(): void;
}

export { InputConsumer, InputDevice, OutputDevice };
