  import './css/styles.css';
  import axios from 'axios'
  import Notiflix from 'notiflix';
   import debounce from 'lodash.debounce'
// /// Opisany w dokumentacji
  import SimpleLightbox from 'simplelightbox';
// // // // Dodatkowy import stylów

 import 'simplelightbox/dist/simple-lightbox.min.css';

const API_KEY = '29532345-deb84d68428e9d4fffb51e10d'
const form = document.querySelector(".search-form")
const word = document.querySelector('.word').value
const gallery = document.querySelector(".gallery")
const searchButton = document.querySelector(".search-button")
const page = 1
const per_page = 40
const lightbox = new SimpleLightbox('.gallery a')
const loadMoreBtn = document.querySelector('.load-more')
let query = ''
// const URL = 'https://pixabay.com/api/'
const fetchPixabay = async (query, pageNr) => {
    
  const response = await axios.get(`https://pixabay.com/api/?key=${API_KEY}&q=${query}&image_type=photo&orientation=horizontal&safesearch=true&per_page=${per_page}&page=${pageNr}`)
    
          
    return response;
};

function renderitems(items) {
  const markup = items
    .map(item=>{
      const { id, largeImageURL, webformatURL, tags, likes, views, comments, downloads } = image
      return

       `<a href='${largeImageURL}'> 
       <div class="photo-card" id= "${id}">
      <img src="${webformatURL}" alt="${tags}" loading="lazy" />
      <div class="info">
        <p class="info-item">
          <b>likes</b>${likes}
        </p>
        <p class="info-item">
          <b>views</b>${views}
        </p>
        <p class="info-item">
          <b>comments</b>${comments}
        </p>
        <p class="info-item">
          <b>downloads</b>${downloads}
        </p>
      </div>
    </div>
  </a>`
})
    .join("");
    gallery.innerHTML = markup
}



loadMoreBtn.addEventListener('click', onLoadMoreBtn)

searchButton.addEventListener('submit', async e => {
  e.preventDefault();
  page = 1
  
  query  = e.currentTarget.searchQueary.value.trim();
  if (query === '') {
    Notiflix.Notify.failure(`Oops, the search input cannot be empty, {width: "350px", timeout: 1500}`)
    return;
  }

  gallery.innerHTML = '';
   loadMoreBtn.classList.add('is-hidden')
    try {
      
      const photos = await fetchPixabay(query, page)
      const data = photos.data
       if (data.totalHits === 0) {
        Notiflix.Notify.failure("Sorry, there are no images matching your search query. Please try again.")
       } else {
        renderitems(data.hits)
        lightbox.refresh()
            Notiflix.Notify.success(`Hooray! We found ${data.totalHits} images.`)
            onSearchNotification(data);
          




       }
    }
//    localStorage.setItem('text', `${trimmed}`)
//    gallery.innerHTML = '';
//     const photos = await fetchPixabay(trimmed, page)
//     const find = photos.hits
//     const parseInt = photos.totalHits
//     if (parseInt > 0) {
//      console.log(`Horaay ${parseInt}`);; 
//      searchItems(find)
//     }
// if (find.length === 0) {
//   throw new Error()
//   }
//     //  .then(searchItems(items))
//     console.log(searchItems(find))
  
 
catch (error) {
 
    console.log('error');
}
  });


  async function onLoadMoreBtn() {
    page +=1
    try {
      const photos = await fetchPixabay(trimmed, page)
      const data = photos.data
      renderitems(data.hits)
      lightbox.refresh();
      onSearchNotification(data)
    }
    catch(error) {
      console.log(error)
    }
  }

  function onSearchNotification(data) {
const totalPages = Math.ceil(data.totalHits / per_page);
if (page >= totalPages) {
  loadMoreBtn.classList.add('is-hidden')
  Notiflix.Notify.failure("We're sorry, but you've reached the end of search results.")
  return
}
if (data.totalHits=== 0) {
Notiflix.Notify.failure('Sorry, there are no images matching your search query. Please try again.')

}
if (data.totalHits >= per_page) {

  loadMoreBtn.classList.remove('is-hidden')
}

  }