const LIMIT = 10;
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
        <button class="btn-favorite">
          <span> <i class="fa-solid fa-heart"></i> </span> 
        </button>
      `;
      figuresElements.push(figure);
    });
    randomContainer.append(...figuresElements);

  } catch (error) {
    console.error(error);
  }
}


reloadImages();