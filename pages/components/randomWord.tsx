const WORDS = [
  "plan",
  "abounding",
  "monkey",
  "test",
  "spell",
  "dare",
  "rebel",
  "stocking",
  "wacky",
  "improve",
  "colossal",
  "open"
];

function randomWord() {
  return WORDS[Math.floor(Math.random() * WORDS.length)];
}

export { randomWord };
