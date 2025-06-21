import BrainIcon from '../assets/brain.png';

export default function Navbar() {
  return (
    <header className="flex justify-between items-center px-8 py-4">
      <nav className="flex space-x-6 text-sm">
        <a href="#" className="hover:underline">
          Main Menu
        </a>
        <a href="#" className="hover:underline">
          Reviews
        </a>
        <a href="#" className="hover:underline">
          Other Games
        </a>
      </nav>
      <img src={BrainIcon} alt="NeuroMatch Logo" className="h-6 w-6" />
    </header>
  );
}