import React, { useState } from 'react';
import PopupWithForm from "./PopupWithForm";

function AddPlacePopup({ onAddPlace, isOpen, onClose }) {
  const [nameCard, setNameCard] = useState('')
  const [linkCard, setLinkCard] = useState('')

  const resetForm = () => {
    setNameCard('');
    setLinkCard('');
  };

  function handleChangeNameCard(e) {
    setNameCard(e.target.value)
  }

  function handleChangeLinkCard(e) {
    setLinkCard(e.target.value)
  }

  const handleSubmit = (e) => {
    e.preventDefault();

    onAddPlace({
      name: nameCard,
      link: linkCard
    }).then(resetForm)
    
  }

  return (
    <PopupWithForm 
      isOpen={isOpen} 
      onClose={onClose} 
      onSubmit={handleSubmit} 
      title="Новое место" 
      name="add-card" 
      btnText="Создать">
        <input className="input input_type_popup" onChange={handleChangeNameCard} type="text" placeholder="Название" value={nameCard} id="input_title" name="name" minLength="2" required />
        <span className="popup__error" id="input_title_error"></span>
        <input className="input input_type_popup" onChange={handleChangeLinkCard} type="url" placeholder="Ссылка на картинку" value={linkCard} id="input_link" name="link" required />
        <span className="popup__error" id="input_link_error"></span>
    </PopupWithForm>
  );
}

export default AddPlacePopup;