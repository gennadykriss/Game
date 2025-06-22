import { useState } from 'react';
import BrainIcon from '../assets/brain.png';
import Navbar from './Navbar';
import MemoryGame from './MemoryGame';

export default function MenuScreen() {
  const [difficulty, setDifficulty] = useState('Easy');
  const [matchCount, setMatchCount] = useState(2);
  const [iconSet, setIconSet] = useState('Normal');
  const [darkMode, setDarkMode] = useState(true);
  const [showGame, setShowGame] = useState(false);

  return (
    <div className={`${darkMode ? 'bg-gray-900 text-white' : 'bg-white text-gray-900'} min-h-screen flex flex-col`}> 
        <Navbar 
            darkMode={darkMode} 
            onMainMenu={() => setShowGame(false)} 
        />

      {!showGame ? (
        <main className="flex-grow flex flex-col items-center justify-center px-4">
          {/* Hero */}
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold flex items-center justify-center space-x-2">
              <span>NeuroMatch</span>
              <img src={BrainIcon} alt="Brain icon" className="h-8 w-8" />
            </h1>
            <p className="mt-2 text-lg">Train your brain. Elevate your game.</p>
          </div>

          <button
            onClick={() => setShowGame(true)}
            className="bg-green-400 hover:bg-green-300 text-gray-900 font-semibold text-xl px-10 py-3 rounded-full transition mb-16"
          >
            Start Game
          </button>

          {/* Settings Panel */}
          <div
            className={`p-8 rounded-2xl grid grid-cols-1 md:grid-cols-3 gap-8 w-full max-w-4xl
              ${darkMode ? 'bg-gray-800 text-white' : 'bg-gray-100 text-gray-900'}`}
          >
            {/* Difficulty */}
            <div>
              <h2 className="text-2xl font-semibold mb-4">Difficulty</h2>
              {['Easy', 'Medium', 'Hard', 'Very Hard'].map((lvl) => (
                <button
                  key={lvl}
                  onClick={() => setDifficulty(lvl)}
                  className={`block w-full text-center py-2 mb-2 rounded-full transition
                    ${difficulty === lvl
                      ? 'bg-green-400 text-gray-900'
                      : darkMode
                        ? 'bg-gray-900 hover:bg-gray-700 text-white'
                        : 'bg-gray-200 hover:bg-gray-300 text-gray-900'
                    }`}
                >
                  {lvl}
                </button>
              ))}
            </div>

            {/* Match # */}
            <div>
              <h2 className="text-2xl font-semibold mb-4">Match #</h2>
              {[2, 3, 4, 5].map((n) => (
                <button
                  key={n}
                  onClick={() => setMatchCount(n)}
                  className={`block w-full text-center py-2 mb-2 rounded-full transition
                    ${matchCount === n
                      ? 'bg-green-400 text-gray-900'
                      : darkMode
                        ? 'bg-gray-900 hover:bg-gray-700 text-white'
                        : 'bg-gray-200 hover:bg-gray-300 text-gray-900'
                    }`}
                >
                  {n}
                </button>
              ))}
            </div>

            {/* Icons */}
            <div>
              <h2 className="text-2xl font-semibold mb-4">Icons</h2>
              {['Normal', 'Emojis', 'Animals', 'Food'].map((set) => (
                <button
                  key={set}
                  onClick={() => setIconSet(set)}
                  className={`block w-full text-center py-2 mb-2 rounded-full transition
                    ${iconSet === set
                      ? 'bg-green-400 text-gray-900'
                      : darkMode
                        ? 'bg-gray-900 hover:bg-gray-700 text-white'
                        : 'bg-gray-200 hover:bg-gray-300 text-gray-900'
                    }`}
                >
                  {set}
                </button>
              ))}
            </div>
          </div>

          {/* Theme Toggle */}
            <label className="flex items-center space-x-2 mt-6 cursor-pointer">
                <span>🌞</span>

                {/* wrapper to position track + thumb */}
                <div className="relative">
                    {/* hidden real checkbox */}
                    <input
                    type="checkbox"
                    checked={darkMode}
                    onChange={() => setDarkMode(d => !d)}
                    className="sr-only peer"
                    />

                    {/* the track */}
                    <div
                    className="
                        w-12 h-6 rounded-full
                        bg-gray-300 transition-colors
                        peer-checked:bg-gray-700
                    "
                    />

                    {/* the thumb */}
                    <div
                    className="
                        dot absolute top-0.5 left-0.5
                        w-5 h-5 rounded-full bg-white
                        transition-transform
                        peer-checked:translate-x-6
                    "
                    />
                </div>

                <span>🌙</span>
                </label>

        </main>
      ) : (
        <main className="flex-grow flex flex-col items-center justify-center px-4">
          {/* Memory Game */}
          <MemoryGame
            difficulty={difficulty}
            iconSet={iconSet}
            matchCount={matchCount}
            darkMode={darkMode}
            onMainMenu={() => setShowGame(false)}
        />

          <button
            onClick={() => setShowGame(false)}
            className="mt-6 text-sm underline"
          >
            ← Back to Settings
          </button>
        </main>
      )}

      {/* Footer */}
      <footer className="px-8 py-4 text-sm flex flex-col md:flex-row justify-between text-gray-500">
        <div>© 2025 NeuroMatch</div>
        <div className="absolute left-1/2 transform -translate-x-1/2 text-center">
          Follow Us On Social Media
          </div>
        <div>Designers: Gennady Kriss, David McIntyre-Garcia</div>
      </footer>
    </div>
  );
}
