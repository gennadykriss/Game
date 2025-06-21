import React from 'react'
import BrainIcon from '../assets/brain.png'

export default function Navbar({ darkMode, onMainMenu }) {
  return (
    <header
      className={`flex justify-between items-center px-8 py-4
        ${darkMode ? 'bg-gray-800 text-white' : 'bg-white text-gray-900'}`}
    >
      <nav className="flex space-x-6 text-sm">
        <button
          onClick={onMainMenu}
          className="hover:underline focus:outline-none"
        >
          Main Menu
        </button>
      </nav>
      <img src={BrainIcon} alt="NeuroMatch Logo" className="h-6 w-6" />
    </header>
  )
}
