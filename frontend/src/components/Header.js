import { Link } from "react-router-dom";
import { Route } from 'react-router-dom';
import logo from '../images/logo.svg';
import '../index.css';

function Header({ userEmail, onSignOut, onMenuClick, isMenuClick, loggedIn }) {
  // Показать email и кнопку выхода при нажатии на иконку бургера
  const userContentClassName = (
    `header__user-content ${isMenuClick && `header__user-content_active`}`
  );

  // При нажатии на иконку бургера меняем на иконку закрытия
  const menuClassName = (
    `header__menu ${isMenuClick && `header__menu_close`}`
  );
  
  // в НЕ авторизованном состоянии применяется только класс "header" 
  // При нажатии на иконку бургера меняем направление флекс-контейнера (поднимаем доп.инфу юзера наверх)
  const headerClassName = (
    `header 
    ${isMenuClick && `header_direction_column-reverse`} 
    ${loggedIn && !isMenuClick && `header_direction_row`}`
  );

  return (
    <header className={headerClassName}>
      <Route path="/lenta">
        <div className="header__container">
          <img className="header__logo" src={logo} alt="логотип" />
          <button className={menuClassName} type="button" onClick={onMenuClick} />
        </div>
        
        <div className={userContentClassName}>
          <p className="header__email" >{userEmail}</p>
          <button className="header__exit" type="button" onClick={onSignOut}>Выйти</button>
        </div>
      </Route>
      
      <Route path="/sign-in">
          <img className="header__logo" src={logo} alt="логотип" />
          <Link className="header__auth" to="/sign-up">Регистрация</Link>  
      </Route>

      <Route path="/sign-up">
        <img className="header__logo" src={logo} alt="логотип" />
        <Link className="header__auth" to="/sign-in">Войти</Link>
      </Route>

      
    </header>
  );
}

export default Header;