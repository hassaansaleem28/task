const productList = document.getElementById("product-list");
const search = document.getElementById("search");
const message = document.getElementById("message");
const favouritesCount = document.getElementById("favourites-count");

let products = [];
const favourites = new Set();

function showProducts(items) {
  productList.innerHTML = "";

  if (items.length === 0) {
    message.textContent = "No products found.";
    return;
  }

  message.textContent = "";

  items.forEach((product) => {
    const card = document.createElement("article");
    card.className = "card";

    const image = document.createElement("img");
    image.className = "img";
    image.src = product.thumbnail;
    image.alt = product.title;

    const title = document.createElement("p");
    title.className = "title";
    title.textContent = product.title;

    const price = document.createElement("p");
    price.className = "price";
    price.textContent = `$${product.price.toFixed(2)}`;

    const button = document.createElement("button");
    button.className = "favourite-button";
    button.type = "button";
    button.textContent = favourites.has(product.id)
      ? "Remove favourite"
      : "Add favourite";

    if (favourites.has(product.id)) {
      button.classList.add("active");
    }

    button.addEventListener("click", () => toggleFavourite(product.id));

    card.append(image, title, price, button);
    productList.append(card);
  });
}

function toggleFavourite(productId) {
  if (favourites.has(productId)) {
    favourites.delete(productId);
  } else {
    favourites.add(productId);
  }

  favouritesCount.textContent = favourites.size;
  filterProducts();
}

function filterProducts() {
  const searchText = search.value.toLowerCase().trim();
  const filteredProducts = products.filter((product) =>
    product.title.toLowerCase().includes(searchText),
  );

  showProducts(filteredProducts);
}

async function loadProducts() {
  try {
    const response = await fetch("https://dummyjson.com/products");
    console.log(response);

    if (!response.ok) {
      throw new Error("could not load products");
    }

    const data = await response.json();
    console.log(data);

    products = data.products;
    showProducts(products);
  } catch (error) {
    message.textContent =
      "Sorry, we could not load the products. Please try again.";
  }
}

search.addEventListener("input", filterProducts);
loadProducts();
