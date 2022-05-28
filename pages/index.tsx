import React, { useEffect, useState } from "react";
import Image from "next/image";
import dynamic from "next/dynamic";
import { generateRandomWord } from "../utils/random_word";

import step0 from "../public/hangman0.png";
import step1 from "../public/hangman1.png";
import step2 from "../public/hangman2.png";
import step3 from "../public/hangman3.png";
import step4 from "../public/hangman4.png";
import step5 from "../public/hangman5.png";
import step6 from "../public/hangman6.png";

const Hangman: React.FC = () => {
  const maxWrong = 6;
  const images = [step0, step1, step2, step3, step4, step5, step6];

  const [mistake, setMistake] = useState(0);
  const [guessed, setGuessed] = useState(new Set());
  const [answer, setAnswer] = useState(generateRandomWord());
  const [gameStat, setGameStat] = useState("");
  const [gameOver, setGameOver] = useState(false);
  const [image, setImage] = useState(step0);

  const guessedWord = () => {
    return answer.split("").map((bingo) => (guessed.has(bingo) ? bingo : "_"));
  };

  const handleGuess = (letter: string) => {
    setMistake(mistake + (answer.includes(letter) ? 0 : 1));
    setImage(images[mistake]);
    setGuessed(guessed.add(letter));
    if (mistake >= maxWrong) {
      setGameStat("YOU LOST");
      setGameOver(true);
      return;
    }
    const isWinner = guessedWord().join("") === answer;
    if (isWinner) {
      setGameStat("YOU WON");
    }
  };

  const keyPress = (event: any) => {
    /**
     * 8 = backspace
     * 13 = enter
     * 32 = space
     * 65 = A (Capital)
     * 90 = Z (Capital)
     * 97 = a (Small)
     * 122 = z (Small)
     */
    if (gameStat === "YOU WON" || gameStat === "YOU LOST") {
      if (event.keyCode === 8 || event.keyCode === 13 || event.keyCode === 32) {
        resetButton();
      }
    } else if (
      (event.keyCode >= 65 && event.keyCode <= 90) ||
      (event.keyCode >= 97 && event.keyCode <= 122)
    ) {
      handleGuess(event.key);
    } else if (
      event.keyCode === 8 ||
      event.keyCode === 13 ||
      event.keyCode === 32
    ) {
      resetButton();
    } else {
    }
  };

  const resetButton = () => {
    setMistake(0);
    setGuessed(new Set());
    setAnswer(generateRandomWord());
    setGameStat("");
    setGameOver(false);
    setImage(step0);
  };

  useEffect(() => {
    window.addEventListener("keydown", keyPress);
  });

  return (
    <div className="Hangman">
      <nav className="navbar navbar-expand-lg">
        <h1>Hangman</h1>
        <span className="float-right">
          Wrong Guesses: {mistake} of {maxWrong}
        </span>
      </nav>
      <p className="text-center">
        <Image src={image} alt={`${mistake}/${maxWrong} wrong guesses`} />
      </p>
      <nav className="text-center">Guess the Word</nav>
      <p className="Hangman-word text-center">
        {!gameOver ? guessedWord() : answer}
      </p>
      <p className="text-center">{gameOver && gameStat}</p>

      <p className="text-center text-warning mt-4">
        {!gameStat &&
          "abcdefghijklmnopqrstuvwxyz".split("").map((letter) => (
            <button
              key={letter}
              value={letter}
              onClick={(e: any) => handleGuess(e.target.value)}
              disabled={guessed.has(letter)}
            >
              {letter}
            </button>
          ))}
      </p>

      <div>
        <p className="text-center">
          <button className="Hangman-reset" onClick={resetButton}>
            Reset
          </button>
        </p>
      </div>
    </div>
  );
};

export default dynamic(() => Promise.resolve(Hangman), {
  ssr: false,
});
