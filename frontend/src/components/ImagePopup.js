function ImagePopup(props) {
  return (
    <section className={`popup popup_type_preview ${props.card.isOpen && `popup_active`}`}>
      <div className="popup__preview-container">
        <img  className="popup__image" src={props.card.data.link} alt={props.card.data.name} />
        <h2 className="popup__title-preview">{props.card.data.name}</h2>
        <button className="popup__close" type="button" aria-label="close" onClick={props.onClose}></button> 
      </div>
    </section>
  );
}

export default ImagePopup;