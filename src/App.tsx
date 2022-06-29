import './App.scss';

import React, { useState } from 'react';
import { FaTerminal } from 'react-icons/fa';

type UnicodeChar = {
  value: string;
  codePoint: number;
  id: string;
};

function App() {
  const [isEntered, setIsEntered] = useState(true);
  const [isFocused, setIsFocused] = useState(false);
  const [currentChar, setCurrentChar] = useState<UnicodeChar | null>(null);
  const [inputError, setInputError] = useState('');
  const [history, setHistory] = useState<UnicodeChar[]>([]);

  const toHexString = (n: number) => '0x' + n.toString(16).toUpperCase();

  const handleInput = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (isEntered) {
      e.currentTarget.value = '';
      setIsEntered(false);
      return;
    }
    if (e.key == 'Enter' || e.key == ' ') {
      e.preventDefault();
      setIsEntered(true);
      if (currentChar) {
        if (history.length > 20) history.shift();
        setHistory([...history, currentChar]);
      }
      const codePoint = parseInt(e.currentTarget.value.replace(/U|U\+|0x/, ''), 16);
      try {
        const value = String.fromCodePoint(codePoint);
        setCurrentChar({
          value,
          codePoint,
          id: toHexString(codePoint) + '-' + Date.now().toString(),
        });
        e.currentTarget.value = toHexString(codePoint);
        console.log(currentChar);
      } catch (err) {
        setInputError(`Invalid Code Point`);
        setCurrentChar(null);
        return;
      }
      setInputError('');
    }
  };

  return (
    <div className="App">
      <div className="historyContainer">
        {history.map((char) => (
          <div className="item" key={char.id}>
            <div className="char">{char.value}</div>
            <div className="codePoint">{toHexString(char.codePoint)}</div>
          </div>
        ))}
      </div>
      <div className="currentChar">{currentChar?.value}</div>
      <div>
        <div className="errorContainer">
          {inputError && <div className="error">!! {inputError} !!</div>}
          {!isFocused && <div className="error">!! Focus TextBox !!</div>}
        </div>
        <div className={'inputContainer ' + (isFocused ? '' : 'unfocus')}>
          <div className="icon">
            <FaTerminal />
          </div>
          <div>
            <input
              className=""
              type="text"
              placeholder="HEX"
              onKeyDown={handleInput}
              onFocus={() => {
                setIsFocused(true);
              }}
              onBlur={() => {
                setIsFocused(false);
              }}
            ></input>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
