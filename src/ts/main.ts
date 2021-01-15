import { Shell } from "./shell.js";

window.addEventListener("load", () => {
    const r: HTMLElement | null = document.querySelector("#shell");
    console.log(r);
    if (r) {
        let shell: Shell = new Shell(r);
        shell.inputLine("new line");
        shell.inputLine("second line");
    }
});
