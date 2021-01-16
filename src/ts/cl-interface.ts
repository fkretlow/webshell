import { InputDevice, OutputDevice, InputConsumer } from "./interfaces.js";

class CLInterface implements InputDevice, OutputDevice {
    private active: Boolean = false;
    private history: string[] = [];
    private engine: InputConsumer | null = null;
    private output: HTMLUListElement;
    private input: HTMLInputElement;
    private prompt: HTMLDivElement;

    constructor(private root: HTMLElement) {
        this.root.classList.add("cli-container");

        this.output = document.createElement("ul");
        this.output.classList.add("cli-output");
        this.root.appendChild(this.output);

        this.prompt = document.createElement("div");
        this.prompt.classList.add("cli-prompt");
        this.root.appendChild(this.prompt);

        this.input = document.createElement("input")
        this.input.classList.add("cli-input");
        this.root.appendChild(this.input);

        /* Trap tab. */
        this.input.addEventListener("keydown", (e) => {
            e.preventDefault();
            if (this.engine) {
                this.engine.consume(e);
                this.updatePrompt();
            }
        });

        this.input.addEventListener("blur", e => { this.deactivate(e); });
        this.root.addEventListener("click", e => { this.activate(e); });
        window.addEventListener("click", e => { if (this.active) this.deactivate(e); });
    }

    activate(e: Event): void {
        if (!this.active) {
            this.active = true;
            this.input.focus();
        }
        e.stopPropagation();
    }

    deactivate(e: Event): void {
        if (this.active) {
            this.active = false;
            this.input.blur();
        }
    }

    update(): void {
        this.output.textContent = "";
        for (const line of this.history) {
            let li: HTMLElement = document.createElement("li");
            li.classList.add("cli-output-line");
            li.textContent = line;
            this.output.appendChild(li);
        }
    }

    updatePrompt(): void {
        if (!this.engine) return;
        this.prompt.innerHTML = this.engine.getPrompt();
    }

    lockInput(to: InputConsumer): Boolean {
        if (this.engine) return false;
        this.engine = to;
        this.updatePrompt();
        return true;
    }

    releaseInput(): void {
        this.engine = null;
    }

    push(what: string): void {
        for (const line of what.split("\n")) {
            this.history.push(line);
        }
        this.update();
    }

    clear(): void {}
}

export { CLInterface };
