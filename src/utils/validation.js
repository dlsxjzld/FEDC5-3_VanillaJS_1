export default function validation(state) {
    return state.every(
        ({ text, isCompleted, id }) =>
            text != null && isCompleted != null && id != null
    );
}
