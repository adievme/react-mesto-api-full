import successfully from '../images/successfully.png';
import error from '../images/error.png';

function InfoTooltip({ isOpen, onClose }) {
  return (
    <section className={`popup popup_type_info-tooltip ${isOpen.isOpen && `popup_active`}`}>
      <div className="popup__container popup__container_padding">
        <button className="popup__close" onClick={onClose} type="button" aria-label="close"></button>
        <img className="popup__image-tooltip" src={isOpen.data.image === 'error' ? error : successfully} alt={isOpen.data.image} />
        <h2 className="popup__title popup__title_center">{isOpen.data.text}</h2>
      </div>
    </section>
  );
}

export default InfoTooltip;