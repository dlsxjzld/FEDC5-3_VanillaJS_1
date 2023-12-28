import { LOCAL_STORAGE_CHANGED } from "../../constants/event.js";
import canUseStorage from "./canUseStorage.js";

function LocalStorage({ key, defaultValue }) {
    const storage = canUseStorage("localStorage") ? window.localStorage : null;

    this.setItem = (value) => {
        if (!storage) {
            console.error("값을 저장할 수 없습니다.");
            return;
        }
        //try catch 로 Local storage 오염되어도 방어
        try {
            storage.setItem(key, JSON.stringify(value));
            dispatchStorageEvent(value);
        } catch (error) {
            console.error(error);
        }
    };
    this.getItem = () => {
        if (!storage) {
            console.error("값을 저장할 수 없습니다.");
            return defaultValue;
        }

        try {
            const storedValue = storage.getItem(key);

            const item = storedValue ? JSON.parse(storedValue) : defaultValue;

            dispatchStorageEvent(item);
            return item;
        } catch (error) {
            console.error(error);
            return defaultValue;
        }
    };
}

function dispatchStorageEvent(item) {
    const event = new CustomEvent(LOCAL_STORAGE_CHANGED, {
        detail: {
            localStorage: item,
        },
    });

    window.dispatchEvent(event);
}

export const localStorage = new LocalStorage({
    key: "todos",
    defaultValue: [],
});
