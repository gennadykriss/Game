// src/components/MemoryGame.jsx

import React, { useState, useEffect } from 'react';

// Define your icon sets
const ICON_SETS = {
  Normal: ['🧠', '🔬', '🧩', '📊', '💡', '🔧', '⚙️', '📈', '🧪', '📐'],
  Emojis: ['😀', '🚀', '🎉', '🌟', '🔥', '🍕', '🎮', '🏆', '🎲', '🎯'],
  Animals: ['🐶', '🐱', '🦊', '🐼', '🦁', '🐵', '🦄', '🐸', '🐨', '🐧'],
  Colours: ['🟥', '🟧', '🟨', '🟩', '🟦', '🟪', '⬛️', '⬜️', '🟫', '🟨'],
};

// Map difficulties to total cards
const DIFFICULTY_LEVELS = {
  Easy: 12,
  Medium: 20,
  Hard: 36,
  'Very Hard': 54,
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
  iconSet = 'Normal',
  matchCount = 2,
}) {
  // derive total cards and how many full groups of matchCount
  const totalCards = DIFFICULTY_LEVELS[difficulty] || DIFFICULTY_LEVELS.Easy;
  const groupCount = Math.floor(totalCards / matchCount);

  const [cards, setCards] = useState([]);
  const [flipped, setFlipped] = useState([]);
  const [matched, setMatched] = useState([]);
  const [moves, setMoves] = useState(0);
  const [disabled, setDisabled] = useState(false);

  // rebuild deck on difficulty, iconSet, or matchCount change
  useEffect(() => {
    const icons = ICON_SETS[iconSet] || ICON_SETS.Normal;
    const shuffledIcons = shuffleArray(icons);

    // select icons for each match group
    const groupIcons = shuffledIcons.slice(0, groupCount);

    // calculate leftover decoys
    const leftover = totalCards - groupCount * matchCount;
    const decoys = shuffleArray(
      shuffledIcons.filter((i) => !groupIcons.includes(i))
    ).slice(0, leftover);

    // build deck: each group icon appears matchCount times, plus decoys
    const deck = shuffleArray([
      ...groupIcons.flatMap((icon) => Array(matchCount).fill(icon)),
      ...decoys,
    ]).map((icon, i) => ({ icon, id: i }));

    setCards(deck);
    setFlipped([]);
    setMatched([]);
    setMoves(0);
    setDisabled(false);
  }, [difficulty, iconSet, matchCount, totalCards, groupCount]);

  // handle card click
  function handleClick(idx) {
    if (disabled || flipped.includes(idx) || matched.includes(idx)) return;
    const newFlipped = [...flipped, idx];
    setFlipped(newFlipped);

    if (newFlipped.length === matchCount) {
      setDisabled(true);
      setMoves((m) => m + 1);

      // check if all flipped cards match
      const firstIcon = cards[newFlipped[0]].icon;
      const allMatch = newFlipped.every((i) => cards[i].icon === firstIcon);
      if (allMatch) {
        setMatched((m) => [...m, ...newFlipped]);
      }

      setTimeout(() => {
        setFlipped([]);
        setDisabled(false);
      }, 1000);
    }
  }

  const hasWon = matched.length >= groupCount * matchCount;
  const cols = Math.ceil(Math.sqrt(totalCards));

  return (
    <div className="flex flex-col items-center w-full">
      <h2 className="text-2xl font-semibold mb-4">
        Moves: {moves} — collect {matchCount} of a kind!
      </h2>

      <div
        className="grid gap-4 w-full max-w-screen-lg"
        style={{
          gridTemplateColumns: `repeat(${cols}, minmax(0, 1fr))`,
        }}
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
        onClick={() => setCards(shuffleArray(cards))}
        className="mt-6 bg-blue-500 hover:bg-blue-400 text-white font-semibold px-6 py-2 rounded-full"
      >
        Restart
      </button>
    </div>
  );
}
