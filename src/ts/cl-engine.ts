import { InputDevice, OutputDevice, InputConsumer } from "./interfaces.js";

abstract class CLEngine implements InputConsumer {
    public abstract getPrompt(): string;
    public abstract consume(e: KeyboardEvent): void;
    public abstract attachInput(device: InputDevice): void;
    public abstract attachOutput(device: OutputDevice): void;
}

class WebShell extends CLEngine {
    private _prompt: string = "~ $ ";
    private inputBuffer: string = "";
    private stdout: OutputDevice | null = null;
    private stdin:  InputDevice  | null = null;

    public constructor(cli: (InputDevice & OutputDevice) | null = null) {
        super();
        if (cli) {
            this.attachInput(cli);
            this.attachOutput(cli);
        }
        this.initiate();
    }

    public initiate(): void {
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
        if      (e.key == " ")      this.inputBuffer += "\u00A0";
        else if (e.key.length == 1) this.inputBuffer += e.key;
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
        return `<span class="cli-prompt-prefix">${this._prompt}</span><span class="cli-prompt">${this.inputBuffer}</span>`
    }

    private commit(): void {
        this.print(this._prompt + this.inputBuffer);
        if (this.inputBuffer.startsWith("vim")) {
            this.print("You gotta be kidding!");
        } else if (this.inputBuffer.startsWith("pwd")) {
            this.print("/home/florian");
        } else {
            let cmd: string = this.inputBuffer.split(" ")[0];
            this.print(`${cmd.split(/\W/)[0]}: command not found.\n`);
        }
        this.clearInputBuffer();
    }

    private print(what: string): void {
        if (this.stdout) this.stdout.push(what);
    }
}

export { CLEngine, WebShell };
