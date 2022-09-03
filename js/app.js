
// Category show
const loadCategories = async() =>{
    const url = `https://openapi.programming-hero.com/api/news/categories`
    const res = await fetch(url);
    const data = await res.json();
    displayCategories(data.data.news_category); 
}

const displayCategories = categories =>{
    const categoriesContainer = document.getElementById('categories-container');
    categories.forEach(category =>{
        const categoryDiv = document.createElement('li');
        categoryDiv.classList.add('nav-item');
        categoryDiv.innerHTML =`
            <a onclick= "loadCatDetails('${category.category_id}')" class="nav-link" href="#">${category.category_name}</a>
        `;
        categoriesContainer.appendChild(categoryDiv);
        
    })
        
    }
loadCategories();





// News show
const loadCatDetails = async(category_id) =>{
    const url = `https://openapi.programming-hero.com/api/news/${category_id}`;
    const res = await fetch(url);
    const data = await res.json();
    displayNews(data.data);
    // console.log(data.data);

    }
// const loadNews = async() =>{
//     const url = `https://openapi.programming-hero.com/api/news/'${category_id}'`
//     const res = await fetch(url);
//     const data = await res.json();
//     displayNews(data.data);
// }

const displayNews = async(news) =>{
    const newsContainer = document.getElementById('news-container');
    newsContainer.textContent= '';
    news.forEach(newsItem =>{
        const newsDiv = document.createElement('div');
        newsDiv.classList.add('row');
        newsDiv.innerHTML =`
        <div class="col-md-4">
        <img src="${newsItem.thumbnail_url}" class="img-fluid rounded-start m-1" alt="...">
      </div>
      <div class="col-md-8">
        <div class="card-body">
          <h5 class="card-title">${newsItem.title}</h5>
          <p class="card-text">${newsItem.details}</p>
          <div>
          <img src="${newsItem.author.img}" alt="" srcset="" class:"img-fluid w-25 img-thumbnail">
          </div>
      </div>
        `;
        newsContainer.appendChild(newsDiv);
        
    })
        
    }
loadCatDetails();