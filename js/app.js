
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
            <a class="nav-link" href="#">${category.category_name}</a>
        `;
        categoriesContainer.appendChild(categoryDiv);
        
    })
        
    }
loadCategories();


// News show

const loadNews = async() =>{
    const url = `https://openapi.programming-hero.com/api/news/{news_id}`
    const res = await fetch(url);
    const data = await res.json();
    console.log(data.data); 
}

const displayNews = news =>{
    const newsContainer = document.getElementById('news-container');
    news.forEach(newsItem =>{
        const newsDiv = document.createElement('div');
        newsDiv.classList.add('row');
        newsDiv.innerHTML =`
        <div class="col-md-4">
        <img src="${newsItem.thumbnail_url}" class="img-fluid rounded-start m-1" alt="...">
      </div>
      <div class="col-md-8">
        <div class="card-body">
          <h5 class="card-title">Card title</h5>
          <p class="card-text">This is a wider card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.</p>
          <p class="card-text"><small class="text-muted">Last updated 3 mins ago</small></p>
        </div>
      </div>
        `;
        newsContainer.appendChild(newsDiv);
        
    })
        
    }
loadNews();