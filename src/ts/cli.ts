import { CLEngine, WebShell } from "./cl-engine.js";

class CLInterface {
    private active: Boolean = false;
    private buffer: string = "";
    private history: string[] = [];
    private listing: HTMLUListElement;
    private input: HTMLInputElement;

    constructor(private root: HTMLElement, private engine: CLEngine = new WebShell()) {
        this.root.classList.add("cli-container");

        this.listing = document.createElement("ul");
        this.listing.classList.add("cli-listing");
        this.root.appendChild(this.listing);

        this.input = document.createElement("input");
        this.input.classList.add("cli-input");
        this.root.appendChild(this.input);
        this.input.value = this.engine.prompt();

        this.input.addEventListener("keyup", (e) => {
            if (e.code === "Enter") {
                this.commit(this.input.value);
                this.input.value = this.engine.prompt();
            }
        });

        /* Trap tab. */
        this.input.addEventListener("keydown", (e) => {
            if (e.which === 9) {
                e.preventDefault();
                this.input.value += "\t";
            }
        })

        this.input.addEventListener("input", (e) => {
            if (this.input.value.length < this.engine.prompt().length) {
                this.input.value = this.engine.prompt();
            }
        });

        this.input.addEventListener("blur", () => {
            this.active = false;
        })

        this.root.addEventListener("click", (e) => {
            e.stopPropagation();
            this.activate();
        });

        window.addEventListener("click", () => {
            if (this.active) this.deactivate();
        });

        this.record(...this.engine.initiate());
    }

    activate() {
        if (!this.active) {
            this.active = true;
            this.input.value = this.engine.prompt();
            this.input.focus();
        }
    }

    deactivate() {
        if (this.active) {
            this.active = false;
            this.input.blur();
        }
    }

    update() {
        this.listing.textContent = "";
        for (const line of this.history) {
            let li: HTMLElement = document.createElement("li");
            li.classList.add("cli-listing-line");
            li.textContent = line;
            this.listing.appendChild(li);
        }
    }

    record(...lines: string[]) {
        for (const line of lines) {
            this.history.push(line);
        }
        this.update();
    }

    commit(line: string) {
        this.record(line);
        this.record(...this.engine.process(line.slice(this.engine.prompt().length)));
    }
}

export { CLInterface };
