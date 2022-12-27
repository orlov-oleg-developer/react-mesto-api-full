import logoPath from '../images/logo.svg';
import {Link} from "react-router-dom";

export default function Header({ action, isLoggedIn, link, onSignOut, userData }) {

  return (
    <header className="header root__header">
      <img className="header__logo" src={logoPath} alt="Логотип сайта" />
      <div className="header__container">
        {isLoggedIn && <p className="header__mail">{userData}</p>}
        {isLoggedIn ?
          <button onClick={onSignOut} className="header__logout">Выйти</button> :
          <Link to={link} className="header__action">{action}</Link>}
      </div>
    </header>
  )
}
