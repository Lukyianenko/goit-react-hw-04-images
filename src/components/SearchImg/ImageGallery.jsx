import css from './styles.module.css';
import { useState } from "react";
import PropTypes from 'prop-types';
import { ImageGalleryItem } from './ImageGalleryItem';
import { Modal } from './Modal';

export const ImageGallery = ({ images, onLargeImage }) => {
    const [id, setId] = useState(null);
    const [isOpen, setIsOpen] = useState('false');

    const onLoadId = id => {
        setId(id);
        setIsOpen('true');
    }

    const onClose = isClose => {
        setIsOpen(isClose);
    }

    return(
        <ul className={css.ImageGallery}>
            <ImageGalleryItem images={images} onLargeImage={onLargeImage} loadId={onLoadId}/>
            {isOpen === 'true' && <Modal images={images} id={id} onClose={onClose}/>}
        </ul>
    )
} 


ImageGallery.propTypes = {
    images: PropTypes.array.isRequired,
    onLargeImage: PropTypes.func
}