const API_KEY = "3350599596e74335924d018b74f0d4b0"
const url = "https://newsapi.org/v2/everything?q=";


window.addEventListener('load' ,()=> fetchNews("india"));

 async function fetchNews(query){
  const re= await fetch(`${url}${query}&apikey=${API_KEY}`)
  const data = await re.json();
  bindData(data.articles)
  console.log(data.articles)
}

function reload(){
   window.location.reload()
}
 
function bindData(articles){
 const cardContainer = document.getElementById("card-container");
 const newsCardTempelate = document.getElementById("card-template")

    cardContainer.innerHTML="";

 articles.map(article => {
   if(!article.urlToImage) return;
   const cardClone = newsCardTempelate.content.cloneNode(true);
   fillDataInCard(cardClone , article)
   cardContainer.appendChild(cardClone);
 });

   function fillDataInCard(cardClone , article){
      const NewsImg = cardClone.querySelector('.NewsImg')
      const Newstitle = cardClone.querySelector('#News-title')
      const newssource = cardClone.querySelector('#news-source')
      const newsdecs = cardClone.querySelector('#news-decs')
      // const publishedat = cardClone.querySelector('#published-at')

      NewsImg.src = article.urlToImage;
      Newstitle.innerHTML = article.title;
      newsdecs.innerHTML=article.description;
      const date = new Date(article.publishedAt).toLocaleString("en-US")
      newssource.innerHTML=`${article.author} . ${date}`;

      cardClone.firstElementChild.addEventListener('click', ()=>{
         window.open(`${article.url}`);
      })

   }
   
}
let cuSelectNav =null;
function onNavItemClick(id){
   fetchNews(id);
   const navItem = document.getElementById(id);
   cuSelectNav?.classList.remove('active');
   cuSelectNav =navItem ;
   cuSelectNav.classList.add('active');
}

const searchButton = document.getElementById("search-Button")
const searchText = document.getElementById('search-text')


searchButton.addEventListener("click",()=>{
   const query = searchText.value;
   if(!query) return;
   fetchNews(query);
   cuSelectNav?.classList.remove("active")
   cuSelectNav=null;
})