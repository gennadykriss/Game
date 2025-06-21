// src/components/MemoryGame.jsx

import React, { useState, useEffect, useCallback } from 'react';

// Define icons
const ICON_SETS = {
  Normal: [
    '🧠','🔬','🧩','📊','💡','🔧','⚙️','📈','🧪','📐',
    '📏','🖥️','💾','🗜️','🔒','🔑','📁','📂','📠','☎️',
    '📱','💻','🖨️','🖱️','🪛','🧲','🧱','📣','📝','📖'
  ],
  Emojis: [
    '😀','😁','😂','🤣','😃','😄','😅','😆','😉','😊',
    '😇','😍','🥰','🤩','😎','🤗','🤔','🤨','😐','😑',
    '😶','🙄','😏','😣','😥','😮','🤐','😯','😴','😪'
  ],
  Animals: [
    '🐶','🐱','🐭','🐹','🐰','🦊','🐻','🐼','🐨','🐯',
    '🦁','🐮','🐷','🐽','🐸','🐵','🙈','🙉','🙊','🐒',
    '🐔','🐧','🐦','🐤','🐣','🐥','🦆','🦅','🦉','🦇'
  ],
  Colours: [
    '🔴','🟠','🟡','🟢','🔵','🟣','⚫️','⚪️','🟤','🟥',
    '🟧','🟨','🟩','🟦','🟪','🟫','⬜️','⬛️','🍎','🍊',
    '🍌','🥝','🍇','🍆','🌶️','🥕','🌈','🎨','🖌️','🖍️'
  ],
};

// Map difficulties to total cards
const DIFFICULTY_LEVELS = {
  Easy:       12,
  Medium:     20,
  Hard:       36,
  'Very Hard':54,         // ← corrected from 49 → 54
};

// Fisher–Yates shuffle
function shuffleArray(array) {
  const arr = array.slice();
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

export default function MemoryGame({
  difficulty = 'Easy',
  iconSet    = 'Normal',
  matchCount = 2,
}) {
  // derive our numbers
  const totalCards = DIFFICULTY_LEVELS[difficulty] || DIFFICULTY_LEVELS.Easy;
  const groupCount = Math.floor(totalCards / matchCount);
  const cols       = Math.ceil(Math.sqrt(totalCards));

  // state
  const [cards,    setCards]    = useState([]);
  const [flipped,  setFlipped]  = useState([]);
  const [matched,  setMatched]  = useState([]);
  const [moves,    setMoves]    = useState(0);
  const [disabled, setDisabled] = useState(false);

  // deck builder
  const initializeDeck = useCallback(() => {
    const icons    = ICON_SETS[iconSet] || ICON_SETS.Normal;
    const shuffled = shuffleArray(icons);

    const groupIcons = shuffled.slice(0, groupCount);
    const leftover   = totalCards - groupCount * matchCount;
    const decoys     = shuffleArray(
      shuffled.filter(i => !groupIcons.includes(i))
    ).slice(0, leftover);

    const newDeck = shuffleArray([
      ...groupIcons.flatMap(icon => Array(matchCount).fill(icon)),
      ...decoys,
    ]).map((icon, idx) => ({ icon, id: idx }));

    setCards(newDeck);
    setFlipped([]);
    setMatched([]);
    setMoves(0);
    setDisabled(false);
  }, [iconSet, groupCount, totalCards, matchCount]);

  // init on prop changes
  useEffect(() => {
    initializeDeck();
  }, [initializeDeck]);

  // restart handler
  const handleRestart = () => {
    initializeDeck();
  };

  // click logic
  const handleClick = idx => {
    if (disabled || flipped.includes(idx) || matched.includes(idx)) return;
    const nextFlipped = [...flipped, idx];
    setFlipped(nextFlipped);

    if (nextFlipped.length === matchCount) {
      setDisabled(true);
      setMoves(m => m + 1);

      const firstIcon = cards[nextFlipped[0]].icon;
      const allMatch  = nextFlipped.every(i => cards[i].icon === firstIcon);
      if (allMatch) {
        setMatched(m => [...m, ...nextFlipped]);
      }

      setTimeout(() => {
        setFlipped([]);
        setDisabled(false);
      }, 1000);
    }
  };

  const hasWon = matched.length >= groupCount * matchCount;

  return (
    <div className="flex flex-col items-center w-full">
      <h2 className="text-2xl font-semibold mb-4">
        Moves: {moves} — collect {matchCount} of a kind!
      </h2>

      <div
        className="grid gap-4 w-full max-w-screen-lg"
        style={{ gridTemplateColumns: `repeat(${cols}, minmax(0,1fr))` }}
      >
        {cards.map((card, idx) => {
          const revealed = flipped.includes(idx) || matched.includes(idx);
          return (
            <button
              key={card.id}
              onClick={() => handleClick(idx)}
              disabled={revealed}
              className={`
                aspect-square flex items-center justify-center
                text-3xl font-bold rounded-lg transition
                ${revealed ? 'bg-green-300' : 'bg-gray-200 hover:bg-gray-300'}
                ${matched.includes(idx) ? 'opacity-50 cursor-default' : ''}
              `}
            >
              {revealed ? card.icon : '❓'}
            </button>
          );
        })}
      </div>

      {hasWon && (
        <div className="mt-6 text-xl font-bold text-green-500">
          🎉 You matched {groupCount} set
          {groupCount > 1 ? 's' : ''} of {matchCount} in {moves} moves! 🎉
        </div>
      )}

      <button
        onClick={handleRestart}
        className="mt-6 bg-blue-500 hover:bg-blue-400 text-white font-semibold px-6 py-2 rounded-full"
      >
        Restart
      </button>
    </div>
  );
}
