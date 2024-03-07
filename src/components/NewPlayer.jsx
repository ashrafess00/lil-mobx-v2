import { useState, useRef } from "react";
import { BigHead } from "@bigheads/core";
import { observer } from "mobx-react-lite";
import { getRandomBighead } from "../../bighead";
import "../styles/NewPlayer.css";

export default observer(({ PlayersStore }) => {
  const [bighead, setBighead] = useState(getRandomBighead());
  const [name, setName] = useState("");
  const inputRef = useRef(null);

  const [nameError, setNameError] = useState(false);
  const [duplicationError, setDuplicationError] = useState(false);
  const newBighead = () => {
    setBighead(getRandomBighead());
  };

  const addPlayer = () => {
    if (name === "")
      setNameError(true);
    else if (PlayersStore.players.find(player => player.name === name))
      setDuplicationError(true);
    else {
      PlayersStore.addPlayer({
        id: PlayersStore.players.length + 1,
        name: name,
        score: 0,
        lettersGuessed: [],
        bighead: { ...bighead },
      });

      setName("");
      newBighead();
      inputRef.current.focus();
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      addPlayer();
    }
  };

  return (
    <div
      style={{ display: "flex", flexDirection: "column", alignItems: "center" }}
    >
      {bighead && (
        <BigHead
          accessory={bighead.accessory}
          body={bighead.body}
          circleColor={bighead.circleColor}
          clothing={bighead.clothing}
          clothingColor={bighead.clothingColor}
          eyebrows={bighead.eyebrows}
          eyes={bighead.eyes}
          facialHair={bighead.facialHair}
          graphic={bighead.graphic}
          hair={bighead.hair}
          hairColor={bighead.hairColor}
          hat={bighead.hat}
          hatColor={bighead.hatColor}
          lashes={bighead.lashes}
          lipColor={bighead.lipColor}
          mask={bighead.mask}
          mouth={bighead.mouth}
          skinTone={bighead.skinTone}
          style={{
            width: "200px",
            height: "200px",
          }}
        />
      )}
      {/* input name */}
      <input
        ref={inputRef}
        placeholder="Name"
        className={`input ${nameError ? "input_error" : ""}`}
        type="text"
        value={name}
        onChange={(e) => {
          e.preventDefault();
          setName(e.target.value);
          setNameError(false);
          setDuplicationError(false);
        }}
        onKeyPress={handleKeyPress}
      />

      {nameError ? <p className="text-error">Name field shouldn't be empty</p> : ""}
      {duplicationError ? <p className="text-error">Name is Alrady Exists</p> : ""}


      {PlayersStore.players.length < 5 && (
        <>
          <button onClick={newBighead} className="newplayer-button">New Bighead</button>
          <button onClick={addPlayer} className="newplayer-button">Save</button>
        </>
      )}
      {PlayersStore.players.length >= 2 && (
        <button onClick={() => PlayersStore.startGame()} className="newplayer-button">Start Game</button>
      )}
    </div>
  );
});
