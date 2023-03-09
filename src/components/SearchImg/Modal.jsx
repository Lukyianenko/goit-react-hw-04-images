import css from './styles.module.css';
import { useEffect } from "react";
import PropTypes from 'prop-types';


export const Modal = ({ images, id, onClose }) => {

    const onClosing = (e) => {
        if(e.code === 'Escape') {
            onClose('false');
        }
    }

    const onCloseBackdrop = (e) => {
        if(e.currentTarget === e.target) {
            onClose('false');
        }
    }

    useEffect(() => {
        window.addEventListener('keydown', onClosing);
        return () => {
            window.removeEventListener('keydown', onClosing);
        }
    });

    const image = images.filter(image => image.id === id);
    return (
        <div className={css.Overlay} onClick={onCloseBackdrop}>
        <div className={css.Modal}>
            <img src={image[0].largeImageURL} alt={image.tags} />
        </div>
    </div>
    )
}


Modal.propTypes = {
    image: PropTypes.arrayOf(PropTypes.exact({
        id: PropTypes.number.isRequired,
        largeImageURL: PropTypes.string.isRequired,
        tags: PropTypes.string.isRequired,
    }))
}