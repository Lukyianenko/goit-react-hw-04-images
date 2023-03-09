import css from './styles.module.css';
import PropTypes from 'prop-types';

export const ImageGalleryItem = ({ images, loadId }) => (
        images.map(({ id, webformatURL, tags }) => (
    <li className={css.ImageGalleryItem} key={id} onClick={() => loadId(id)}>
        <img src={webformatURL} alt={tags} className={css.ImageGalleryItemImage} />
    </li>
        )
    )
)   


ImageGalleryItem.propTypes = {
    image: PropTypes.arrayOf(PropTypes.exact({
        id: PropTypes.number.isRequired,
        webformatURL: PropTypes.string.isRequired,
        tags: PropTypes.string.isRequired,
    }))
}
