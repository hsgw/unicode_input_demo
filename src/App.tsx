import './App.scss';

import React, { useState } from 'react';
import { FaGithub } from 'react-icons/fa';

type UnicodeChar = {
  value: string;
  codePoint: number;
  method: UnicodeMethod;
};

type UnicodeMethod = null | 'linux' | 'win';

function App() {
  const [textAreaValue, setTextAreaValue] = useState('');

  const [currentChar, setCurrentChar] = useState<UnicodeChar | null>(null);
  const [inputError, setInputError] = useState('');
  const [currentUnicodeMethod, setCurrentUnicodeMethod] = useState<UnicodeMethod>(null);
  const [isComposing, setIsComposing] = useState(false);
  const [inputedCode, setInputedCode] = useState('');

  const [showSetting, setShowSetting] = useState(false);
  const [showTitleBar, setshowTitleBar] = useState(true);
  const [showDescription, setshowDescription] = useState(false);
  const [fontSize, setFontSize] = useState(96);
  const [bottomMargin, setBottomMargin] = useState(0);

  const changeFontSize = (add: number) => {
    let temp = fontSize + add;
    if (temp < 0) temp = 0;
    setFontSize(temp);
  };

  const toHexString = (n: number) => '0x' + n.toString(16).toUpperCase();

  const handleInput = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    // check starting wincompose
    if (isComposing) {
      setIsComposing(false);
      if (e.key.toLowerCase() == 'u') {
        e.preventDefault();
        console.log('start input: wincompose');
        setCurrentUnicodeMethod('win');
        setInputedCode('');
        return;
      }
    }

    if (currentUnicodeMethod == null && e.key == 'Alt') {
      e.preventDefault();
      setIsComposing(true);
    }

    // check starting linux
    if (e.key.toLowerCase() == 'u' && e.ctrlKey && e.shiftKey) {
      e.preventDefault();
      console.log('start input: linux');
      setCurrentUnicodeMethod('linux');
      setInputedCode('');
      return;
    }

    if (currentUnicodeMethod) {
      e.preventDefault();
      if (e.key == 'Enter' || e.key == ' ') {
        const codePoint = parseInt(inputedCode.replace(/U|U\+|0x/, ''), 16);
        try {
          const c = String.fromCodePoint(codePoint);
          setCurrentChar({ value: c, codePoint, method: currentUnicodeMethod });
          setTextAreaValue(textAreaValue + c);
          setInputError('');
        } catch (err) {
          console.error(err);
          setInputError(`Invalid Code Point`);
        }
        setCurrentUnicodeMethod(null);
        setInputedCode('');
        console.log('finish input');
      } else {
        if (e.key.length == 1) {
          console.log(`inputed: ${e.key}`);
          setInputedCode(inputedCode + e.key);
        }
      }
    }
  };

  const handleChangeTextArea = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setTextAreaValue(e.currentTarget.value);
  };

  const clearTextArea = () => {
    setTextAreaValue('');
  };

  return (
    <div className="App">
      {showTitleBar && (
        <div className="titleBar">
          <div className="title">Unicode Demo App</div>
          <div>
            <a href="https://github.com/hsgw/unicode_input_demo/">
              <div className="centered">
                <FaGithub />
                <span>Github</span>
              </div>
            </a>
          </div>
        </div>
      )}
      <div className="main">
        <textarea
          className="textarea"
          id="text"
          wrap="hard"
          spellCheck="false"
          placeholder="Type here"
          autoFocus
          value={textAreaValue}
          onChange={handleChangeTextArea}
          onKeyDown={handleInput}
          style={{ fontSize: `${fontSize}px` }}
        ></textarea>
        {showSetting && (
          <div className="setting">
            <div className="containt">
              <div className="title">Setting</div>
              <button
                type="button"
                onClick={() => {
                  changeFontSize(4);
                }}
              >
                Font size++
              </button>
              <button
                type="button"
                onClick={() => {
                  changeFontSize(-4);
                }}
              >
                Font size--
              </button>
              <hr />
              <button
                type="button"
                onClick={() => {
                  if (bottomMargin != 0) setBottomMargin(0);
                  else setBottomMargin(120);
                }}
              >
                Add bottom margin
              </button>
              <button
                type="button"
                onClick={() => {
                  setshowTitleBar(!showTitleBar);
                }}
              >
                Toggle TitleBar
              </button>
              <button
                type="button"
                onClick={() => {
                  setshowDescription(!showDescription);
                }}
              >
                Toggle Description
              </button>
            </div>
          </div>
        )}
      </div>
      <div className="statusBar">
        <div className="status">
          <div className="item">{inputError ? inputError : 'No Error'}</div>
          <div className="item">
            {currentChar
              ? `${toHexString(currentChar.codePoint)} - ${currentChar.method}`
              : ''}
          </div>
        </div>
        <div className="setting">
          <div className="item">
            <button type="button" onClick={clearTextArea}>
              clear
            </button>
          </div>
          <div className="item">
            <button
              type="button"
              onClick={() => {
                setShowSetting(!showSetting);
              }}
            >
              setting
            </button>
          </div>
        </div>
      </div>
      <div className="bottomMargin" style={{ height: `${bottomMargin}px` }}></div>
    </div>
  );
}

export default App;
