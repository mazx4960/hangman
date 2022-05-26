import React, { useState, useEffect } from 'react';

function randomWord() {
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [items, setItems] = useState([]);

  useEffect(() => {
    fetch("https://random-word-api.herokuapp.com/word")
      .then(res => res.json())
      .then(
        (result) => {
          setIsLoaded(true);
          setItems(result);
        },
        (error) => {
          setIsLoaded(true);
          setError(error);
        }
      )
  }, [])

  if (error) {
    return "Error";
  } else if (!isLoaded) {
    return "Loading";
  } else {
    return items;
  }

}

export { randomWord };
