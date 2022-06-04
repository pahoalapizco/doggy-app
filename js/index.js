const LIMIT = 8;
const API = `https://api.thedogapi.com/v1`;

const randomContainer = document.getElementById("random-doggies-images");
const favoritesContainer =document.getElementById("favorites-doggies-images");

const reloadImages = async () => {
  const apiUrl = `${API}/images/search?limit=${LIMIT}`;
  try {
    const resp = await fetch(apiUrl);
    const data = await resp.json();
    const figuresElements = [];
    randomContainer.innerHTML = "";
    data.forEach(({ id, url }) => {
      const figure = document.createElement("figure");
      figure.classList.add('random-dog');

      figure.innerHTML = `
        <img src="${url}" alt="doggy dog">
        <button class="btn-favorite" onClick="addToFavorites('${id}')">
          <span> <i class="fa-solid fa-heart"></i> </span> 
        </button>
      `;
      figuresElements.push(figure);
    });
    randomContainer.append(...figuresElements);

  } catch (error) {
    console.error("⚠ ~ error", error);
  }
}

const reloadFavorites = async () => {
  const apiUrl = `${API}/favourites?api_key=${API_KEY}`;
  try {
    const resp = await fetch(apiUrl);
    const data = await resp.json();
    favoritesContainer.innerHTML = "";
    
    if(data.length > 0) {
      const figuresElements = [];

      data.forEach(({ id, image }) => {
        const { url } = image;
        const figure = document.createElement("figure");
        figure.classList.add('favorite-dog');
  
        figure.innerHTML = `
          <img src="${url}" alt="doggy dog">
          <button class="btn-favorite remove-favorite" onClick="removeToFavorites('${id}')">
            <span> <i class="fa-solid fa-heart"></i> </span>            
          </button>
        `;
        figuresElements.push(figure);
      });
      favoritesContainer.append(...figuresElements);      
    } else {    
      favoritesContainer.innerHTML = "";
    }
  } catch (error) {
    console.error("⚠ ~ error", error);
  }
}

const addToFavorites = async (id) => {
  try {
    const apiUrl = `${API}/favourites`
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": API_KEY,      
      },
      body: JSON.stringify({
        image_id: id
      }),
    };
  
    await fetch(apiUrl, options);
    await reloadFavorites();
  } catch (error) {
    console.error("⚠ ~ error", error);    
  }
}

const removeToFavorites = async (id) => {
  try {
    const apiUrl = `${API}/favourites/${id}?api_key=${API_KEY}`
    const options = {
      method: "DELETE",
    };
  
    const resp = await fetch(apiUrl, options);
    const data = await resp.json();
    await reloadFavorites();
  } catch (error) {
    console.error("⚠ ~ error", error);    
  }
}

reloadImages();
reloadFavorites();