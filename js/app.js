// loadCategories function call
const loadCategories = async() => {
    const url = `https://openapi.programming-hero.com/api/news/categories`;
    try {
    const res = await fetch(url);
    const data = await res.json();
    displayCategories(data.data.news_category);
    }
    catch (error) {
        console.log(error);
    }
}

// displayCategories
const displayCategories = categories => {
    const categoryContainer = document.getElementById('category-container');
    categories.forEach(category => {
        const div = document.createElement('div');
        div.innerHTML = `
        <button onclick="newsLoad('${category.category_id}')" type="button" class="btn btn-outline-info">${category.category_name}</button>
    
        `;
        categoryContainer.appendChild(div);
    })
}


// newsLoad function call
const newsLoad = category_id => {
    toggleSpinner(true);
    const url = `https://openapi.programming-hero.com/api/news/category/${category_id}`;
    try {
    fetch(url)
    .then(res => res.json())
    .then(data => displayNews(data.data))
    }
    catch (error) {
        console.log(error);
    }
}

const displayNews=categories=>{
    const newsContainer = document.getElementById('news-container');
     newsContainer.innerHTML = '';
     // item count 
    const foundedMessege = document.getElementById('items-count');
    foundedMessege.classList.remove('hidden')
    // item-count-msg
    const fountText = document.getElementById('item-count-msg')
    fountText.innerText = categories.length;

    // sort by view
    categories.sort((a, b) => {
        if (a.total_view < b.total_view) {
            return 1;
        }
        else {
            return -1;
        }
    })

    categories.forEach(category => {
        const createSingleNews = document.createElement('div');
        createSingleNews.classList.add('single-news');
        createSingleNews.innerHTML = `
              <div class="row g-0 m-3 rounded">
                 <div class="col-md-3">
                    <img src="${category.image_url}" class="img-fluid rounded" alt="...">
                 </div>
                 <div class="col-md-9 news-item ">
                     <div class="card-body">
                        <h3 class="card-title fw-bold mb-3">${category ? category.title : 'No Data Found'}</h3>
                        <p class="card-text mb-3 paragraph text-dark">${category.details.slice(0, 1000)}</p>
         
                      </div>
                  <div class="card-bottom d-flex align-items-center justify-content-between">
                          <div class="d-flex ">
                                  <img class="author-image" src="${category.author.img}" alt="">
                                  <div class="author">
                                      <h6>${category.author ? category.author.name : 'No Data Found'}</h6>
                                      <p class="text-white" >${category.author ? category.author.published_date : 'No Data Found'} </p>
                                  </div>
                          </div>
         
                          <div>
                                  <h5><i class="fa-regular fa-eye"></i> ${category.total_view}</h5>
                          </div>
                          <div>
                                   <i class="fa-solid fa-star-half-stroke"></i>
                                   <i class="fa-regular fa-star"></i>
                                   <i class="fa-regular fa-star"></i>
                                   <i class="fa-regular fa-star"></i>
                                   <i class="fa-regular fa-star"></i>
                                   
                          </div>
         
                         <div>
                          <button onclick="loadDetails('${category._id}')" data-bs-toggle="modal" data-bs-target="#newsDetailModal"><i class="fa-solid fa-arrow-right"></i></button>
                          
                         </div>
         
                  </div>
              </div>
         
              `;
        newsContainer.appendChild(createSingleNews);
    })
    toggleSpinner(false);
}

 // spinner 
 const toggleSpinner = isLoading => {
    try {
        const spinnerSection = document.getElementById('spinner');
        if (isLoading) {
            spinnerSection.classList.remove('d-none');
        }
        else {
            spinnerSection.classList.add('d-none');

        }
    } catch (error) {
        console.log('Missing Something');
        console.log(error);
    }
}




const loadDetails = async _id => {

    const url = `https://openapi.programming-hero.com/api/news/${_id}`;
    //console.log(url);
    const res = await fetch(url);
    const data = await res.json();
    displayNewsDetails(data.data);
}


const displayNewsDetails = categories => {

    categories.forEach(category => {

        
        const newsTitle = document.getElementById('newsDetailModalLabel');
        newsTitle.innerText = category.title;
        const newsDetails = document.getElementById('news-details');
        newsDetails.innerHTML = `
        <img src=${category.image_url} class="mb-3 w-100"/>
        <h3>${category.title}</h3>
        <p>${category.details}</p>
       

        <div class="card-bottom d-flex align-items-center justify-content-between">
                  <div class="d-flex ">
                          <img class="author-image" src="${category.author.img}" alt="">
                          <div class="author">
                              <h6>${category.author ? category.author.name : 'No Data Found'}</h6>
                              <p>${category.author ? category.author.published_date : 'No Data Found'} </p>
                          </div>
                  </div>
 
                  <div>
                          <h5><i class="fa-regular fa-eye"></i> ${category.total_view}</h5>
                  </div>
                  <div>
                           <i class="fa-solid fa-star-half-stroke"></i>
                           <i class="fa-regular fa-star"></i>
                           <i class="fa-regular fa-star"></i>
                           <i class="fa-regular fa-star"></i>
                           <i class="fa-regular fa-star"></i>
                           
                  </div>
          </div>   
    `;
    })
}
loadCategories();
