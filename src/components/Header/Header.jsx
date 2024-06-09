import { useState } from 'react';
import { Link } from 'react-router-dom'
import logo from '../../assets/logo.svg'
import './Header.css'

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <header>
      <img src={logo} alt="Imagem logo Salvatore Academy" className='logo' />

      <nav className={menuOpen ? 'open' : ''}>
        <Link to="/">Home</Link>
        <Link to="/create">Create</Link>
        <Link to="/update">Update</Link>
        <Link to="/delete">Delete</Link>
      </nav>

      <div className="hamburger" onClick={toggleMenu}>
        <div className="line"></div>
        <div className="line"></div>
        <div className="line"></div>
      </div>
    </header>
  )
}