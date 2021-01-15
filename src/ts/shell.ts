class Shell {
    private active: Boolean = false;
    private history: string[] = [];
    private listing: HTMLElement;

    constructor(private root: HTMLElement) {
        this.root.addEventListener("click", () => { this.activate(); });
        this.listing = document.createElement("ul");
        this.listing.classList.add("shell-listing");
        this.root.appendChild(this.listing);
    }

    activate() {
        this.active = true;
        this.root.classList.add("active");
    }

    inputLine(line: string) {
        this.history.push(line);
        let li: HTMLElement = document.createElement("li");
        li.textContent = line;
        this.listing.appendChild(li);
    }
}

export { Shell };
