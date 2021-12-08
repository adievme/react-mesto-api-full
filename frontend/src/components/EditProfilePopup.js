import React, { useState, useEffect } from 'react';
import PopupWithForm from './PopupWithForm';
import { CurrentUserContext } from '../contexts/CurrentUserContext';

function EditProfilePopup(props) {
  const [name, setName] = useState('')
  const [description, setDescription] = useState('')

  const currentUser = React.useContext(CurrentUserContext);

  function handleChangeName(e) {
    setName(e.target.value)
  }

  function handleChangeDescription(e) {
    setDescription(e.target.value)
  }

  function handleSubmit(e) {
    e.preventDefault()

    props.onUpdateUser({
      name,
      about: description
    })
  }

  useEffect(() => {
    setName(currentUser.name);
    setDescription(currentUser.about);
  }, [currentUser, props.isOpen]); 

  return (
    <PopupWithForm 
      isOpen={props.isOpen} 
      onClose={props.onClose}
      onSubmit={handleSubmit}
      title="Редактировать профиль" 
      name="edit-profile" 
      btnText="Сохранить">
        <input className="input input_type_popup" onChange={handleChangeName} value={name || ''} type="text" placeholder="Имя" id="input_name" name="name_user" minLength="2" maxLength="40" required />
        <span className="popup__error" id="input_name_error"></span>
        <input className="input input_type_popup" onChange={handleChangeDescription} value={description || ''} type="text" placeholder="О себе" id="input_job" name="info" minLength="2" maxLength="200" required />
        <span className="popup__error" id="input_job_error"></span>
    </PopupWithForm>
  );
}

export default EditProfilePopup;