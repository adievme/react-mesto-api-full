import React, { useState } from 'react';
import { Link, useHistory } from "react-router-dom";

function Register({ onRegister, infoTooltip }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const history = useHistory();
  
  const resetForm = () => {
    setEmail('');
    setPassword('');
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    onRegister({ email, password })
      .then(res => {
        console.log(res)
        if (!res.message) {
          infoTooltip({ 
            data: { text: 'Вы успешно зарегистрировались!', image: 'successfully' }, 
            isOpen: true
          })
          history.push('/sign-in')
        } else {
          infoTooltip({
            data: { text: res.message, image: 'error'}, 
            isOpen: true
          })
        }
      })
      .then(resetForm)
  };

  return (
    <section className="auth">
      <div className="auth__container">
        <h2 className="auth__title">Регистрация</h2>
        <form className="auth__form" onSubmit={handleSubmit}>
          <input 
            className="input input_type_auth" 
            type="email" 
            placeholder="Email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            />
          <span></span>
          <input 
            className="input input_type_auth" 
            type="password" 
            placeholder="Пароль"
            value={password}
            onChange={e => setPassword(e.target.value)}
          />
          <span></span>
          <button className="auth__button" type="submit">Зарегистрироваться</button>
        </form>
          <p className="auth__caption">Уже зарегистрированы? <Link className="auth__link" to="/sign-in">Войти</Link></p>
      </div>
    </section>
  );
}

export default Register;