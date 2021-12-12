import React from 'react';
import { CurrentUserContext } from '../contexts/CurrentUserContext';
import '../index.css'

function Card(props) {
  const currentUser = React.useContext(CurrentUserContext)

  // Определить, являемся ли мы владельцем текущей карточки
  const isOwn = props.card.owner === currentUser._id;
  
  const cardDeleteButtonClassName = (
    `element__delete ${!isOwn && `element__delete_inactive`}`
  ); 

  // Определить, есть ли у карточки лайк, поставленный текущим пользователем
  const isLiked = props.card.likes.some(i => i === currentUser._id);
  const cardLikeButtonClassName = (
    `element__like-button ${isLiked && `element__like-button_active`}`
  ); 

  function handleImageClick() {
    props.onCardClick(props.card);
  } 

  function handleLikeClick() {
    props.onCardLike(props.card)
  }

  function handleDeleteClick() {
    props.onCardDeleteClick(props.card._id)
  }

  return (
    <li className="element__item">
      <img className="element__image" onClick={handleImageClick} src={props.card.link} alt={props.card.name} />
      <button className={cardDeleteButtonClassName} type="button" onClick={handleDeleteClick}></button>
      <div className="element__figure">
        <h2 className="element__name">{props.card.name}</h2>
        <div className="element__like-wrapper">
          <button className={cardLikeButtonClassName} type="button" onClick={handleLikeClick}></button>
          <span className="element__like-count">{props.card.likes.length}</span>
        </div>
      </div>
    </li>
  )
}

export default Card;