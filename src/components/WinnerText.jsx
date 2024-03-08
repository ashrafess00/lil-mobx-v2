import { observer } from "mobx-react-lite";

const WinnerText = observer(({PlayersStore}) => {

    const {word, winners, lettersGuessed} = PlayersStore;

    const allLettersGuessed = word.split("").every((l) => {
        return lettersGuessed.includes(l);
    });


    return (
        <h3 className="winner-text">
            {(allLettersGuessed && winners.length === 1)
            ? `Game over. ${winners[0].name} won!`
            : allLettersGuessed ? `Game Over. it's a tie between ${winners.map((winner) => winner.name).join(", ")}`
            : ""
            }

        </h3>
    )
})

export default WinnerText;