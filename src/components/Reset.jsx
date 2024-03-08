import { observer } from "mobx-react-lite";


const Reset = observer(({ PlayersStore }) => {
    return (
        <button
                onClick={() => {
                PlayersStore.resetGame();
                }}
                className="reset"
            >
                Reset
        </button>
    )
});

export default Reset;