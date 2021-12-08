import React from 'react';
import { CurrentUserContext } from '../contexts/CurrentUserContext';
import '../index.css';
import Card from './Сard.js';

function Main(props) {
  const currentUser = React.useContext(CurrentUserContext)

  return (
    <main className="content">

      <section className="profile">
        <div className="profile__info">
          <div className="profile__avatar-wrapper">
            <img className="profile__avatar" src={currentUser.avatar} alt="аватар"/>
            <button type="button" className="profile__avatar-edit-button" onClick={props.onEditAvatar}></button> 
          </div>
          <div className="profile__info-edit">  
            <div className="profile__header">
              <h1 className="profile__name">{currentUser.name}</h1>
              <p className="profile__job">{currentUser.about}</p> 
            </div>
            <button className="profile__edit-button" type="button" aria-label="Edit" onClick={props.onEditProfile}></button>
          </div>
        </div>
        <button className="profile__add-button" type="button" aria-label="add" onClick={props.onAddPlace}></button>
      </section>

      <section className="elements">
        <ul className="elements__list">
          {props.cards.map((item) => {
            return (
              <Card 
                key={item._id} 
                card={item} 
                onCardClick={props.onCardClick} 
                onCardLike={props.onCardLike}
                onCardDeleteClick={props.onCardDeleteClick}
              />
            )            
          })}
        </ul>
      </section>

    </main>
  );
}

export default Main;