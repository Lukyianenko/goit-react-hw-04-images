import { Component } from "react";
import css from './styles.module.css';
import { FaSearch } from 'react-icons/fa';



class Searchbar extends Component {
    state = {
        name: '',

    }

  OnInputChange = (e) => {
    this.setState({
        name: e.currentTarget.value,
    })
  }

  onSubmitContact = (e) => {
    e.preventDefault();
        
    this.props.onSubmit(this.state);
    this.reset();
  }

  reset = () => {
    this.setState({
        name: '',
    })
  }



    render() {
        return (
            <header className={css.Searchbar}>
            <form className={css.SearchForm} onSubmit={this.onSubmitContact}>
            
              <button type="submit" className={css.SearchFormButton}>
              <FaSearch size={30}/>
                <span className={css.SearchFormButtonLabel}>
                Search
                </span>
              </button>
          
              <input
                className={css.SearchFormInput}
                type="text"
                autoComplete="off"
                autoFocus
                placeholder="Search images and photos"
                onChange={this.OnInputChange}
                value={this.state.name}
              />
            </form>
          </header>
          )
    }    
}

export default Searchbar;