import React from 'react';

function UnicodeExample({ char }: { char: string }) {
  const codePoint = char.codePointAt(0) ?? 0;
  const hexString = ('00000' + codePoint.toString(16)).slice(-5);
  const binString = ('000000000000000000' + codePoint.toString(2)).slice(-18);

  return (
    <div className="unicodeExample">
      <div className="char">{char}</div>
      <div className="code">
        <div className="hex">{`0x${hexString}`}</div>
        <div className="bin">
          {binString.split('').map((n, i) => (
            <span key={char + i.toString()}>{n}</span>
          ))}
        </div>
      </div>
    </div>
  );
}

export default UnicodeExample;
