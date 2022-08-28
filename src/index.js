//  import Notiflix from 'notiflix';
//  import debounce from 'lodash.debounce'
// // Opisany w dokumentacji
// import SimpleLightbox from 'simplelightbox';
// // // Dodatkowy import stylów
// import 'simplelightbox/dist/simple-lightbox.min.css';

const form = document.querySelector(".form")
const word = document.querySelector('.word').value
const gallery = document.querySelector(".gallery")
const searchButton = document.querySelector(".searchButton")
const page = "1"
const per_page = "20"
const  q = "submit.textContent"
const image_type =  "photo"
const orientation = "horizontal"
const safesearch = "true"
const API_KEY = '29532345-deb84d68428e9d4fffb51e10d'
// const URL = 'https://pixabay.com/api/'

function searchItems(items) {
  const markup = items
    .map(item=>{
       `<div class="photo-card">
      <img src="${item.largeImageURL}" alt="item.tags" loading="lazy" />
      <div class="info">
        <p class="info-item">
          <b>Likes</b>:${item.likes}
        </p>
        <p class="info-item">
          <b>Views</b>:${item.views}
        </p>
        <p class="info-item">
          <b>Comments</b>:${item.comments}
        </p>
        <p class="info-item">
          <b>Downloads</b>:${item.downloads}
        </p>
      </div>
    </div>`
})
    .join("");
    gallery.innerHTML = markup;
}



const fetchPixabay = async (word, page) => {
    
    const response = await fetch(`https://pixabay.com/api/?key=${API_KEY}&q=${word}&image_type=photo&pretty=true&orientation=horizontal&safesearch=true&page=${page}&per_page=${per_page}`)
      
            const result = await response.json() 
      return result;
}

searchButton.addEventListener('click', async e => {
    
    try {
        e.preventDefault();
        const { searchButton, word } = e.currentTarget;
        page = 1
        let trimmed = word.value.trim()
        if (trimmed === '')  {
            
            return;
    }
   localStorage.setItem('word', `${trimmed}`)
   gallery.innerHTML = '';
    const photos = await fetchPixabay(trimmed, page)
    const find = photos.hits
    const parseInt = photos.totalHits
    if (parseInt > 0) {
     console.log(`Horaay ${parseInt}`);; 
    }
if (find.length === 0) {
    console.log("Sorry, there are no images matching your search query. Please try again.");
  }
    //  .then(searchItems(items))
     
    
    searchItems(find)}
catch (error) {
    console.log('nie działa!');
}
  });






function renderItems(items) {
    const markup = items
      .map(item=>{
         `<div class="photo-card">
        <img src="" alt="" loading="lazy" />
        <div class="info">
          <p class="info-item">
            <b>Likes</b>
          </p>
          <p class="info-item">
            <b>Views</b>
          </p>
          <p class="info-item">
            <b>Comments</b>
          </p>
          <p class="info-item">
            <b>Downloads</b>
          </p>
        </div>
      </div>`
})
      .join("");
      gallery.innerHTML = markup;
  }