import PopupWithForm from "./PopupWithForm";

function DeleteCardPopup({ onCardDelete, ...props }) {

  function handleSubmit(e) {
    e.preventDefault();

    onCardDelete(); // при отправки формы вызываем функцию удаления карточки
  }

  return (
    <PopupWithForm 
      isOpen={props.isOpen} 
      onClose={props.onClose}
      onSubmit={handleSubmit}
      className="popup__button_delete" 
      title="Вы уверены?" 
      name="delete" 
      btnText="Да" 
    />
  );
}

export default DeleteCardPopup;