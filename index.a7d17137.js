document.querySelector(".form"),document.querySelector(".word").value;button.addEventListener("click",(()=>{console.log("click")}));var e="https://pixabay.com/api/?key="+API_KEY+"&q="+encodeURIComponent("red roses");$.getJSON(e,(function(e){parseInt(e.totalHits)>0?$.each(e.hits,(function(e,o){console.log(o.pageURL)})):console.log("No hits")}));
//# sourceMappingURL=index.a7d17137.js.map
