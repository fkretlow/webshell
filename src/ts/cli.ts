interface IStreamListener {
    notify(what: string): void;
}
interface IStream {
    subscribe(who: IStreamListener): void;
    unsubscribe(whom: IStreamListener): void;
}
interface OStream {
    push(what: string): void;
}

class CLInterface implements IStream, OStream {
    private active: Boolean = false;
    private history: string[] = [];
    private output: HTMLUListElement = new HTMLUListElement();
    private input: HTMLInputElement = new HTMLInputElement();
    private listeners: IStreamListener[] = [];

    constructor(private root: HTMLElement) {
        this.root.classList.add("cli-container");

        // this.output = document.createElement("ul");
        this.output.classList.add("cli-output");
        this.root.appendChild(this.output);

        // this.input = document.createElement("input");
        this.input.classList.add("cli-input");
        this.root.appendChild(this.input);
        this.input.value = this.engine.prompt();

        /* Trap tab. */
        this.input.addEventListener("keydown", (e) => {
            if (e.which === 9) {
                e.preventDefault();
                this.input.value += "\t";
            }
        })

        this.input.addEventListener("input", e => { this.commit(e); });
        this.input.addEventListener("blur", e => { this.deactivate(e); });
        this.root.addEventListener("click", e => { this.activate(e); });
        window.addEventListener("click", () => { if (this.active) this.deactivate(); });
    }

    activate(e: Event): void {
        if (!this.active) {
            this.active = true;
            this.input.value = this.engine.prompt();
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

    push(what: string): void {
        for (const line of what.split("\n")) {
            this.history.push(line);
        }
        this.update();
    }
}

export { CLInterface };
