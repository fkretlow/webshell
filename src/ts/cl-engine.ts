import { InputDevice, OutputDevice, InputConsumer } from "./interfaces.js";

abstract class CLEngine implements InputConsumer {
    public abstract getPrompt(): string;
    public abstract consume(e: KeyboardEvent): void;
    public abstract attachInput(device: InputDevice): void;
    public abstract attachOutput(device: OutputDevice): void;
}

class WebShell extends CLEngine {
    private _prompt: string = "$ ";
    private inputBuffer: string = "";
    private stdout: OutputDevice | null = null;
    private stdin: InputDevice | null = null;

    public constructor(cli: InputDevice & OutputDevice | null = null) {
        super();
        if (cli) {
            this.attachInput(cli);
            this.attachOutput(cli);
        }
        this.initiate();
    }

    initiate(): void {
        this.print("Welcome. Type 'help' to see what you can do.");
    }

    public attachInput(device: InputDevice) {
        device.lockInput(this);
        this.stdin = device;
    }

    public attachOutput(device: OutputDevice) {
        this.stdout = device;
    }

    public consume(e: KeyboardEvent): void {
        if (e.key.length == 1) this.inputBuffer += e.key;
        else {
            switch (e.key) {
                case "Backspace":
                    this.inputBuffer = this.inputBuffer.slice(0, this.inputBuffer.length - 1);
                    break;
                case "Enter":
                    this.commit();
            }
        }
    }

    private clearInputBuffer(): void {
        this.inputBuffer = "";
    }

    public getPrompt(): string {
        return this._prompt + this.inputBuffer;
    }

    private commit(): void {
        this.print(this.getPrompt());
        if (this.inputBuffer.startsWith("vim")) {
            this.print("You gotta be kidding!");
        } else {
            this.print("I don't understand this.");
        }
        this.clearInputBuffer();
    }

    private print(what: string): void {
        if (this.stdout) this.stdout.push(what);
    }
}

export { CLEngine, WebShell };
