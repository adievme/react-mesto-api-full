import React, { useState } from 'react';
import { useHistory } from "react-router-dom";

function Login({ onLogin, infoTooltip }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const history = useHistory();

  const resetForm = () => {
    setEmail('');
    setPassword('');
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    onLogin({ email, password })
      .then(res => {
        // Если есть ошибка то открываем попап с ошибкой, иначе авторизуемся
        if (res.message) {
          infoTooltip({
            data: {text: res.message, image: 'error'}, 
            isOpen: true
          })
        } else {
          history.push('/')
        }
      })
      .then(resetForm)
  };

  return (
    <section className="auth">
      <div className="auth__container">
        <h2 className="auth__title">Вход</h2>
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
          <button className="auth__button">Войти</button>
        </form>
      </div>
    </section>
  );
}

export default Login;