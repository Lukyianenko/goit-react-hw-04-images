import css from './styles.module.css';
import { Component } from "react";
import PropTypes from 'prop-types';

class ImageGalleryItem extends Component {
render() {
    const { images, loadId } = this.props;
   
    return (
        images.map(image => (
    <li className={css.ImageGalleryItem} key={image.id} onClick={() => loadId(image.id)}>
        <img src={image.webformatURL} alt={image.tags} className={css.ImageGalleryItemImage} />
    </li>
    )
))   
}
}

ImageGalleryItem.propTypes = {
    image: PropTypes.arrayOf(PropTypes.exact({
        id: PropTypes.number.isRequired,
        webformatURL: PropTypes.string.isRequired,
        tags: PropTypes.string.isRequired,
    }))
}

export default ImageGalleryItem;