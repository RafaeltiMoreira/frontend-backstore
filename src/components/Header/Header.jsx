import { Link } from 'react-router-dom'
import logo from '../../assets/logo.svg'
import './Header.css'

export default function Header() {
    return (
        <header>
          <img src={logo} alt="Imagem logo Salvatore Academy" className='logo' />

          <nav>
            <Link to="/">Home</Link>
            <Link to="/create">Create</Link>
            <Link to="/update">Update</Link>
            <Link to="/delete">Delete</Link>
          </nav>
        </header>
    )
}