import css from './styles.module.css';
import PropTypes from 'prop-types';

export const Button = ({ pageClick, disable }) => (
            <button tupe="button" disable={disable} onClick={() => pageClick()} className={css.Button}>Load more</button>
        )

Button.propTypes = {
    pageClick: PropTypes.func,
    disable: PropTypes.bool
}
