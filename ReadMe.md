### A Small task for Refreshing Full Stack Foundations

Main things that's worth focusing is how the fetch and search works here.

## How the fetch works

So there is already a url present there serving some data on a server and we are fetching it using JS fetch function

Fetch takes some time to get the data so we made the function async and used await with fetch. await simply waits until the server sends a response back.

After getting the response we first check if the response is okay. If it is not okay we throw an error and show a friendly error message on the page.

The data we get from the server is in JSON format so we use response.json() to turn it into something JS can use. Then we save the products in our products array and pass them to showProducts function which creates and shows all the product cards.

While all of this is happening the page shows Loading... because it is already written in the message element inside HTML.

## How the search field works

First we get the search input from HTML using its id. Then we add an input event on it which means the filterProducts function runs every time the user types or removes something from the search field.

Inside filterProducts we get what the user typed and change it to lowercase. We also change every product title to lowercase so the search can work even if user types with capital or small letters.

Then filter checks every product title using includes(). If the title includes the text user typed that product stays in the new filteredProducts array.

At the end we pass filteredProducts to showProducts and only those matching products are shown. If nothing matches then it shows No products found.
