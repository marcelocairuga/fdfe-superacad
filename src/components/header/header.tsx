import styles from './header.module.css';
import logoImage from '../../assets/logo.svg'; // Adjust the path as necessary
import { NavLink } from 'react-router-dom';

export function Header() {
   return (
      <header className={styles.container}>
         <div className={styles.logo}>
            <img src={logoImage} alt="SuperAcad Logo"/>
            <span>SuperAcad</span>
         </div>
         <nav className={styles.menu}>
            <ul>
               <li><NavLink to="/" className={({ isActive }) => isActive ? styles.active : ''}>Início</NavLink></li>
               <li><NavLink to="/cursos" className={({ isActive }) => isActive ? styles.active : ''}>Cursos</NavLink></li>
               <li><NavLink to="/disciplinas" className={({ isActive }) => isActive ? styles.active : ''}>Disciplinas</NavLink></li>
               <li><NavLink to="/login" className={({ isActive }) => isActive ? styles.active : ''}>Sair</NavLink></li>
            </ul>
         </nav>
      </header>
   );
};