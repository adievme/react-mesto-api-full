import React, { useRef } from 'react';
import PopupWithForm from "./PopupWithForm";

function EditAvatarPopup(props) {
  const avatarRef = useRef()

  function handleSubmit(e) {
    e.preventDefault();
  
    props.onUpdateAvatar({
      avatar: avatarRef.current.value,
    });
  } 
  
  return (
    <PopupWithForm 
      isOpen={props.isOpen} 
      onClose={props.onClose}
      onSubmit={handleSubmit} 
      title="Обновить аватар" 
      name="update-avatar" 
      btnText="Сохранить">
        <input ref={avatarRef} className="input input_type_popup" type="url" placeholder="Ссылка на картинку" defaultValue="" id="input_link-avatar" name="link_avatar" required />
        <span className="popup__error" id="input_link-avatar_error"></span>
    </PopupWithForm>
  );
}

export default EditAvatarPopup;