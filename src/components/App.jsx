import { Component } from "react";
import css from './SearchImg/styles.module.css';
import { Audio } from 'react-loader-spinner';
import Searchbar from './SearchImg/Searchbar';
import { ImageGallery } from './SearchImg/ImageGallery';
import { Button } from './SearchImg/Button';

const API_KEY = '33017005-3089560dbf89e85a2a48421c2';

class App extends Component {
  state = {
    searchName: '',
    images: null,
    status: 'idle',
    page: 1,
  }

  reset = () => {
    this.setState({
      searchName: '',
    })
  }

  onSubmitSaveName = (search) => {
    const normilizedName = search.name.toLowerCase().trim();
    if(normilizedName === '') {
      alert('Please, enter a search name');
      return
    }
    this.setState({
      searchName: normilizedName
    })
  }

  onClickLoadMore = () => {
    this.setState(prevState => (
      { page: prevState.page + 1 }
    ))
  }

  async componentDidUpdate(prevProps, prevState) {
    if(prevState.searchName !== this.state.searchName) {
      this.setState({
        status: 'pending',
        page: 1,
      })

      fetch(`https://pixabay.com/api/?q=${this.state.searchName}&page=${this.state.page}&key=${API_KEY}&image_type=photo&orientation=horizontal&per_page=12`)
      .then(resp => resp.json())
      .then(data => {
        if(data.hits.length === 0) {
          if(prevState.searchName === this.state.searchName) {
            alert('Picture not faund');
          this.setState({ status: 'idle' });
          return
          } else {
            alert('Picture not faund');
          this.setState({ status: 'idle' });
          return
          }
          
        }
        this.setState({ images: data.hits, status: 'resolved' })})
        .catch(erorr => alert(erorr))
    }
    if(prevState.page + 1 === this.state.page) {
      fetch(`https://pixabay.com/api/?q=${this.state.searchName}&page=1&key=${API_KEY}&image_type=photo&orientation=horizontal&per_page=${this.state.page * 12}`)
      .then(resp => resp.json())
      .then(data => {
        if(data.hits.length === 0) {
          alert('Picture no faund')
          return
        }
        this.setState({ images: data.hits, status: 'resolved' })})
      .catch(erorr => alert(erorr))
    }
  }


  render() {
   const { status } =this.state
    return (
      <div className={css.App}>
        <Searchbar onSubmit={this.onSubmitSaveName}/>
        {status === 'resolved' && <>
          <ImageGallery images={this.state.images} onLargeImage={this.onLargeImage}/>
          <Button pageClick={this.onClickLoadMore}/>
          </>
        }
        { status === 'pending' &&  <Audio /> }

      </div>
    );
  }
  
};

export default App;