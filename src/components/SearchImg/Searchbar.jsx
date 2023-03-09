import { useState } from "react";
import css from './styles.module.css';
import { FaSearch } from 'react-icons/fa';


export const Searchbar = ({onSubmit}) => {
  const [name, setName] = useState('');

  const OnInputChange = (e) => {
    setName(e.currentTarget.value)
  }

  const onSubmitContact = (e) => {
    e.preventDefault();
        
    onSubmit({name});
    reset();
  }

  const reset = () => {
    setName('');
  }

 return (
       <header className={css.Searchbar}>
      <form className={css.SearchForm} onSubmit={onSubmitContact}>
       
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
          onChange={OnInputChange}
          value={name}
        />
      </form>
    </header>
 )
}
