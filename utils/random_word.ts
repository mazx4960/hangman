import { words } from "./word_bank";

export const generateRandomWord = (): string => {
  return words[Math.floor(Math.random() * words.length)];
};
