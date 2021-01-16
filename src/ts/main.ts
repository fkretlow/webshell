/* TS usually omits the file ending, but this is needed for the browser */
import { CLInterface } from "./cl-interface.js"; 

window.addEventListener("load", () => {
    const r: HTMLElement | null = document.querySelector("#cli");
    console.log(r);
    if (r) {
        let cli: CLInterface = new CLInterface(r);
    }
});
