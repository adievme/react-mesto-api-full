function PopupWithForm(props) {
  return (
    <section className={`popup popup_type_${props.name} ${props.isOpen && `popup_active`}`}>
      <div className="popup__container">
        <h2 className="popup__title">{props.title}</h2>
          <form className="popup__form" onSubmit={props.onSubmit} name={`${props.name}`} >
            {props.children}
            <button className={`popup__button ${props.className}`} type="submit" aria-label="save">{props.btnText}</button>
          </form>
          <button className="popup__close" onClick={props.onClose} type="button" aria-label="close" ></button> 
      </div>
    </section>
  );
}

export default PopupWithForm;