/* TS usually omits the file ending, but this is needed for the browser */
import { CLInterface } from "./cl-interface.js";
import { CLEngine, WebShell } from "./cl-engine.js";

window.addEventListener("load", () => {
    const r: HTMLElement | null = document.querySelector("#cli");
    console.log(r);
    if (r) {
        const cli: CLInterface = new CLInterface(r);
        const engine: CLEngine = new WebShell(cli);
    }
});
