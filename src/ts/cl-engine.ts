abstract class CLEngine {
    abstract initiate(): string[];
    abstract process(input: string): string[];
    abstract prompt(): string;
}

class WebShell extends CLEngine {
    private _prompt: string = "$ ";
    initiate() {
        let welcome: string[] = [];
        welcome.push("Welcome. So you're a programmer, huh? What do you want to know?");
        return welcome;
    }

    process(input: string) {
        console.log(`WebShell.process(${input})`);
        if (input.startsWith("vim")) {
            return [ "You gotta be kidding..." ];
        } else if (/g?cc|g\+\+/.test(input)) {
            return [ "You do realise this is all just show, right?" ];
        }
        return [ "Err... what?" ];
    }

    prompt() { return this._prompt; }
}

export { CLEngine, WebShell };
