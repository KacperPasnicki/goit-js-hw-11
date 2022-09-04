  import './css/styles.css';
  import axios from 'axios'
  import Notiflix from 'notiflix';
   import debounce from 'lodash.debounce'
// /// Opisany w dokumentacji
  import SimpleLightbox from 'simplelightbox';
// // // // Dodatkowy import stylów

 import 'simplelightbox/dist/simple-lightbox.min.css';

const API_KEY = '29532345-deb84d68428e9d4fffb51e10d';
 const form = document.querySelector(".search-form");
// const word = document.querySelector('.word').value
const gallery = document.querySelector(".gallery");
const searchButton = document.querySelector(".search-button");
let page = 1;
const per_page = 40;
const lightbox = new SimpleLightbox('.gallery a');
const loadMoreBtn = document.querySelector('.load-more');
let query = ''
// const URL = 'https://pixabay.com/api/'
const fetchPixabay = async (query, page) => {
    
  const response = await axios.get(`https://pixabay.com/api/?key=${API_KEY}&q=${query}&image_type=photo&orientation=horizontal&per_page=${per_page}&page=${page}`)
    
          
    return response;
};

function renderItems(images) {
  let markup = images
    .map(image => {
      const { id, largeImageURL, webformatURL, tags, likes, views, comments, downloads } = image
      

   return   `<a class="img_card" href='${largeImageURL}'> 
       <div class="photo-card" id= "${id}"> 
      <img class="image" src="${webformatURL}" alt="${tags}" loading="lazy" /> 
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
    gallery.insertAdjacentHTML('beforeend', markup);
}



loadMoreBtn.addEventListener('click', onLoadMoreBtn)

form.addEventListener('submit', searchForm)
//   e.preventDefault();
//   page = 1
  
//   query  = e.currentTarget.searchQuery.value.trim();
//   if (query === '') {
    
//     Notiflix.Notify.failure(`Oops, the search input cannot be empty, {width: "350px", timeout: 1500}`)
//     return;
//   }

//   gallery.innerHTML = '';
//    loadMoreBtn.classList.add('is-hidden')
//     try {
      
//       const photos = await fetchPixabay(query, page)
//       const data = photos.data
//        if (data.totalHits === 0) {
//         Notiflix.Notify.failure("Sorry, there are no images matching your search query. Please try again.")
//        } else {
//         renderitems(data.hits)
//         lightbox.refresh()
//             Notiflix.Notify.success(`Hooray! We found ${data.totalHits} images.`)
//             onSearchNotification(data);
//    }
//   } 
// catch (error) {
 
//     console.log(error);
// }
//   });



 async function searchForm(e) {
  try { 
    e.preventDefault();
    page = 1;
    query = e.currentTarget.searchQuery.value.trim();
    
        if (query === '') {
      
            Notiflix.Notify.failure(`Oops, the search input cannot be empty`)
        return;
        }
            gallery.innerHTML = '';
            loadMoreBtn.classList.add('is-hidden')
    
                  
    const images = await fetchPixabay(query, page)
    const data = images.data
     if (data.totalHits === 0) {
           Notiflix.Notify.failure("Sorry, there are no images matching your search query. Please try again.")
     } else {
          renderItems(data.hits)
          lightbox.refresh()
          Notiflix.Notify.success(`Hooray! We found ${data.totalHits} images.`)
          onSearchNotification(data);
   }
} 
catch (error) {
  gallery.innerHTML = '';
  console.log(error);
};
 }


 

  async function onLoadMoreBtn() {
    page +=1
    try {
      const images = await fetchPixabay(query, page)
      const data = images.data
      renderItems(data.hits)
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
if (data.totalHits === 0) {
Notiflix.Notify.failure('Sorry, there are no images matching your search query. Please try again.')

}
// if (data.totalHits >= per_page) {

//   loadMoreBtn.classList.remove('is-hidden')
// }

  }

