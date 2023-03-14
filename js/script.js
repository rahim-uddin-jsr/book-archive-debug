//handle spinner
function loadingSpinner(isLoading) {
  if (isLoading) {
    document.getElementById("loader").classList.remove("d-none");
  } else {
    document.getElementById("loader").classList.add("d-none");
  }
}

//------------- handle search button-----------
const searchResult = document.getElementById("search-data");
const resultFound = document.getElementById("found-result-filed");
const emptySearchError = document.getElementById("empty-search-error");
const searchField = document.getElementById("search-input");
const searchBook = () => {
  loadingSpinner(true);
  searchResult.textContent = "";
  const searchText = searchField.value;
  if (searchText == "") {
    resultFound.classList.add("d-none");
    emptySearchError.classList.remove("d-none");
    loadingSpinner(false);
    return;
  }
  emptySearchError.classList.add("d-none");
  // ----------load data----------
  const url = `https://openlibrary.org/search.json?q=${searchText}`;
  fetch(url)
    .then((res) => res.json())
    .then((data) => {
      console.log(data);
      displaySearchResult(data.docs);
    })
    .catch((err) => {
      loadingSpinner(false);
      alert("something went wrong");
    });
};
// searchBook();
// ----------display search result data----------
const displaySearchResult = (myBooks) => {
  document.getElementById("result-count").innerText = myBooks.length;
  resultFound.classList.remove("d-none");
  // searchResult.textContent = "";

  const books = myBooks.slice(0, 15);
  books.forEach((book) => {
    console.log(book);
    const div = document.createElement("div");
    div.classList.add("col");
    div.innerHTML = `
        <div class="card">
            <img src="https://covers.openlibrary.org/b/id/${book?.cover_i}-M.jpg" class="card-img-top card-image w-50 mx-auto img-thumbnail" alt="...">
            <div class="card-body text-center">
              <h5 class="card-title"> Name: ${book?.title}</h5>
              <h6> Author: ${book?.author_name}</h6>
              <p>Publisher: <small> ${book?.publisher[0]} </small></p>
              <small> First Published Year: ${book?.first_publish_year}</small>
            </div>
        </div>
        `;
    loadingSpinner(false);
    searchField.value = "";
    searchResult.appendChild(div);
  });
};
