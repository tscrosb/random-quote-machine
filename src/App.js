import React, { useState, useEffect } from "react";
import "./App.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTwitter } from "@fortawesome/free-brands-svg-icons";

let quoteQuery =
  "https://gist.githubusercontent.com/camperbot/5a022b72e96c4c9585c32bf6a75f62d9/raw/e3c6895ce42069f0ee7e991229064f167fe8ccdc/quotes.json";

function App() {
  const [quote, setQuote] = useState("");
  const [author, setAuthor] = useState("");
  const [quotesArray, setQuotesArray] = useState(null);

  const fetchQuotes = async url => {
    const response = await fetch(url);
    const parsedJSON = await response.json();
    setQuotesArray(parsedJSON.quotes);
  };

  useEffect(() => {
    fetchQuotes(quoteQuery);
  }, [quoteQuery]);

  const getRandomQuote = () => {
    let randomInteger = Math.floor(quotesArray.length * Math.random());
    setQuote(quotesArray[randomInteger].quote);
    setAuthor(quotesArray[randomInteger].author);
  };

  return (
    <div className="App">
      <header className="App-header">
        <div id="quote-box">
          <h1></h1>
          <p id="text">"{quote}"</p>
          <p id="author">- {author}</p>
          <button id="new-quote" onClick={() => getRandomQuote()}>
            Generate A Random Quote
          </button>
          <a
            id="tweet-quote"
            href={encodeURI(
              `http://www.twitter.com/intent/tweet?text=${quote} - ${author}`
            )}
          >
            <FontAwesomeIcon icon={faTwitter}></FontAwesomeIcon>
          </a>
        </div>
      </header>
    </div>
  );
}

export default App;
