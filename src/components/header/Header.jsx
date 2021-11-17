import React from 'react';
import logo from '../../assets/logo.svg';
import './Header.css'

/**
 * @component
 * @returns Header with NavLink
 */
function Header() {
    return (
        <header className="headerContent">
            <img src={logo} alt="logo"/>
            <nav className="headerNav">
                <a className="headerNavLink" href="#Accueil">Accueil</a>
                <a className="headerNavLink" href="#Profil">Profil</a>
                <a className="headerNavLink" href="#Réglage">Réglage</a>
                <a className="headerNavLink" href="#Communauté">Communauté</a>
            </nav>
        </header>
    );
}

export default Header;