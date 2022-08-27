// import Notiflix from 'notiflix';
// import debounce from 'lodash.debounce'
// // Opisany w dokumentacji
// import SimpleLightbox from 'simplelightbox';
// // Dodatkowy import stylów
// import 'simplelightbox/dist/simple-lightbox.min.css';

const form = document.querySelector(".form")
const word = document.querySelector('.word').value
const page = "1"
const per_page = "20"
const  q = "submit.textContent"
const image_type =  "photo"
const orientation = "horizontal"
const safesearch = "true"
const KEY = '29532345-deb84d68428e9d4fffb51e10d'
// const URL = 'https://pixabay.com/api/'

button.addEventListener('click', () => {
    console.log('click');
  });

const fetchPixabay = async (word, page, pageNr) => {
   
    return await fetch(`https://pixabay.com/api//?key=${KEY}&q=${word}&image_type=photo&pretty=true&orientation=horizontal&safesearch=true&page=${page}&per_page=${per_page}`)
      .then((response) => {
          if (!response.ok) {
              throw new Error(response.status)
  
          }
          else {
          return response.json().then((data => {
                console.log(data)

          }));
        }
      });
          
    }        
  





 var URL = "https://pixabay.com/api/?key="+API_KEY+"&q="+encodeURIComponent('red roses');
 $.getJSON(URL, function(data){
 if (parseInt(data.totalHits) > 0)
     $.each(data.hits, function(i, hit){ console.log(hit.pageURL); });
 else
     console.log('No hits');
 });


 


//  <div class="photo-card">
//  <img src="" alt="" loading="lazy" />
//  <div class="info">
//    <p class="info-item">
//      <b>Likes</b>
//    </p>
//    <p class="info-item">
//      <b>Views</b>
//    </p>
//    <p class="info-item">
//      <b>Comments</b>
//    </p>
//    <p class="info-item">
//      <b>Downloads</b>
//    </p>
//  </div>
// </div>