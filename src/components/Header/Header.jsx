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
        <Link to="/create" onClick={toggleMenu}>Create</Link>
        <Link to="/update" onClick={toggleMenu}>Update</Link>
        <Link to="/delete" onClick={toggleMenu}>Delete</Link>
      </nav>

      <div className={`hamburger ${menuOpen ? 'open' : ''}`} onClick={toggleMenu}>
        <div className="line"></div>
        <div className="line"></div>
        <div className="line"></div>
      </div>
    </header>
  )
}