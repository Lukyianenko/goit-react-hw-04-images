import { useState, useEffect } from "react";
import css from './SearchImg/styles.module.css';
import { Audio } from 'react-loader-spinner';
import { Searchbar } from './SearchImg/Searchbar';
import { ImageGallery } from './SearchImg/ImageGallery';
import { Button } from './SearchImg/Button';

const API_KEY = '33017005-3089560dbf89e85a2a48421c2';

export const App = () => {
  const [searchName, setSearchName] = useState('');
  const [images, setImages] = useState(null);
  const [status, setStatus] = useState('idle');
  const [page, setPage] = useState(1);

  const onSubmitSaveName = (search) => {
    const normilizedName = search.name.toLowerCase().trim();
    if(normilizedName === '') {
      alert('Please, enter a search name');
      return
    }
    setSearchName(normilizedName)
  }
  const onClickLoadMore = () => {
    setPage(page + 1);
  }

    useEffect(() => {
      if(!searchName) {
        return
      } 
      setPage(1);
    }, [searchName])

    useEffect(() => {
    if(!searchName) {
      return
    } 
      if(page === 1) {
        setStatus('pending');
        async function fetchData() {
          const fetching = await fetch(`https://pixabay.com/api/?q=${searchName}&page=1&key=${API_KEY}&image_type=photo&orientation=horizontal&per_page=12`)
          .then(resp => resp.json())
          .then(data => {
            if(data.hits.length === 0) {
                alert('Picture not faund');
                setStatus('idle');
              return
              }
            setImages(data.hits);
            setStatus('resolved');
          })
            .catch(erorr => alert(erorr));
            return fetching;
        }
        fetchData();
      }
      else {
        fetch(`https://pixabay.com/api/?q=${searchName}&page=1&key=${API_KEY}&image_type=photo&orientation=horizontal&per_page=${page * 12}`)
        .then(resp => resp.json())
        .then(data => {
          setImages(data.hits);
          setStatus('resolved');})
        .catch(erorr => alert(erorr))
      }
    } , [searchName, page])

//   useEffect(() => {
//     if(page === 1) {
//       return
//     }
//     fetch(`https://pixabay.com/api/?q=${searchName}&page=1&key=${API_KEY}&image_type=photo&orientation=horizontal&per_page=${page * 12}`)
//     .then(resp => resp.json())
//     .then(data => {
//       setImages(data.hits);
//       setStatus('resolved');})
//     .catch(erorr => alert(erorr))
// }, [page]);

    return (
      <div className={css.App}>
        <Searchbar onSubmit={onSubmitSaveName}/>
        {status === 'resolved' && <>
          <ImageGallery images={images} />
          <Button pageClick={onClickLoadMore}/>
          </>
        }
        { status === 'pending' &&  <Audio /> }
      </div>
    );  
};
