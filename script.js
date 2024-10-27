const myForm = document.getElementById("searchbar");
const input = document.getElementById("searchinput");
const newscontainer = document.getElementById("container");
const select = document.getElementById("select");

const language = select.innerText;

let sname = '';

let data = [];

const fetchData = async (text, sname) => {
    try{
        const response = await fetch(`https://newsapi.org/v2/everything?q=${text?text:'bitcoin'}&apiKey=b79bb9c907ba4f78984a1ed608087901`)
        if(!response.ok) {
            throw new Error('something went wrong');
        }
        data = await response.json();
        loadNews(data);
    }
    catch(error) {
        console.log(error);
    }
} 

myForm.addEventListener('submit', (e) => {
    e.preventDefault();
    newscontainer.innerHTML='';
    fetchData(input.value)
})

fetchData('bitcoin')


select.addEventListener('change', (e) => {
    sname = e.target.value;
    console.log(sname)
    const newData = data.articles.filter(post => post.author == sname);
    newscontainer.innerHTML = '';
    loadNews({articles: newData});
})

// loadNews(response);

function loadNews(data){
    console.log(data)
    
    let newscontainer = document.getElementById("container")
  
    function showcard(data){
        data.forEach(news => {
            
            if(news.urlToImage){
                const newcard = document.createElement("div");
                newcard.classList.add("card");
                const cardimage = document.createElement("img")
                const cardtitle = document.createElement("h2")
                const cardauthor = document.createElement("h6")
                const description = document.createElement("p")
    
                cardimage.src = news.urlToImage;
                cardtitle.textContent = news.title;
                cardauthor.textContent = news.author;
                description.textContent = news.description
    
                newcard.append( cardimage, cardtitle, cardauthor, description)
    
                newscontainer.append(newcard)
            }

          
        });
      
    }

    showcard(data.articles)

}