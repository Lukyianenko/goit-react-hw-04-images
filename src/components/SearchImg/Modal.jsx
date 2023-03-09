import css from './styles.module.css';
import { Component } from "react";
import PropTypes from 'prop-types';


export class Modal extends Component {

    onClose = (e) => {
        if(e.code === 'Escape') {
            this.props.onClose('false')
        }
    }

    onCloseBackdrop = (e) => {
        if(e.currentTarget === e.target) {
            this.props.onClose('false')
        }
    }

    componentDidMount() {
        window.addEventListener('keydown', this.onClose)
    }
    
    componentWillUnmount() {
    window.removeEventListener('keydown', this.onClose)
    }

    render() {
        const { images, id } = this.props;
    const image = images.filter(image => image.id === id);
    return (
        <div className={css.Overlay} onClick={this.onCloseBackdrop}>
        <div className={css.Modal}>
            <img src={image[0].largeImageURL} alt={image.tags} />
        </div>
    </div>
    )
    }
}

Modal.propTypes = {
    image: PropTypes.arrayOf(PropTypes.exact({
        id: PropTypes.number.isRequired,
        largeImageURL: PropTypes.string.isRequired,
        tags: PropTypes.string.isRequired,
    }))
}