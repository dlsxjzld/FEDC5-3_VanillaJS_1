import App from "./App.js";
import { localStorage } from "./utils/storage/localStorage.js";

const initialState = localStorage.getItem();
const appElement = document.querySelector(".app");

try {
    new App({
        targetElement: appElement,
        initialState,
    });
} catch (error) {
    console.error(error);
}
