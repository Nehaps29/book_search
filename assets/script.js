
var authorEl = document.getElementById("author-name");
var isbnEl = document.getElementById("isbn");
var submitEl = document.getElementById('submit');
var authorBtnEl = document.getElementById('author-button'); 
var authorBtnEl = document.getElementById('author-button');
var isbnBtnEl = document.getElementById('isbn-button');
var aResEl = document.getElementById('aRes');
var displayListEl = document.getElementById('display-list');
var displayResultEl = document.getElementById('display-result');
var recentIsbnEl = document.getElementById('recent-isbn');
submitEl.addEventListener("click", select);
authorBtnEl.addEventListener("click", author_det);
isbnBtnEl.addEventListener("click", isbn_det);
//var imageEl = document.getElementById('image');
var isbnFooterEl = document.getElementById('isbn-footer');
var selectObj = [] || JSON.parse(localStorage.getItem('isbn-local'));

function select (){
  var selected = document.querySelector('input[name=criteria]:checked').value;
  console.log(selected);
  if (selected === "isbn"){
    document.getElementById("author-name").disabled = true;
    document.getElementById("isbn").disabled = false;
    console.log(authorEl);
  }
  if (selected === "author"){
    document.getElementById("isbn").disabled = true;
    document.getElementById("author-name").disabled = false;
    console.log(authorEl.value);
  }
}

function author_det() {
     console.log(authorEl.value);
     var authorURL = `https://api.nytimes.com/svc/books/v3/reviews.json?author=${authorEl.value}&api-key=lOcvPik3JyP8fGFQLOa6ZMb5qa0buQUQ`
      const encodedAuthorURL = encodeURI(authorURL);
      fetch(encodedAuthorURL)
      .then(function (response) {
       if (!response.ok) {
         throw response.json();
      }

      return response.json();
    })
    .then(function (data) {
      for (var i=0; i<3; i=i+1) {
        var authorBookTitle = document.createElement('div');
        var authorBookReview = document.createElement('a');
        var authorBookIsbn = document.createElement('div');
        //console.log(data.results[i].book_title);
        //console.log(data.results[i].url);
        //console.log(data.results[i].isbn13[0]);
        authorBookTitle.setAttribute('id', data.results[i].book_title);
        authorBookReview.setAttribute('href',data.results[i].url);
        authorBookIsbn.setAttribute('id',data.results[i].isbn13[0]);
        console.log(authorBookTitle);
        displayResultEl.append(data.results[i].book_title);
        displayResultEl.append(authorBookReview);
        displayResultEl.append(authorBookIsbn);
        
      } 
    })
    .catch(function (error) {
      console.error(error);
    });
}

function isbn_det(){
  console.log(isbnEl.value);
  var isbnValue =  isbnEl.value;
  var isbnURL = `https://openlibrary.org/search.json?q=${isbnEl.value}`
  const encodedisbnURL = encodeURI(isbnURL);
  fetch(encodedisbnURL)
  .then(function (response) {
   if (!response.ok) {
     throw response.json();
  }

  return response.json();
})
.then(function (data) {
  var nISBN = Number (isbnEl.value);
  var coverURL = `https://covers.openlibrary.org/b/isbn/${nISBN}-L.jpg`;
  console.log(coverURL);
  let img = document.createElement('img');
  img.src = coverURL;
  displayResultEl.append(img);
})
.catch(function (error) {
  console.error(error);
});
var intIsbn = parseInt(isbnEl.value);
console.log(intIsbn);
console.log(typeof(intIsbn));
var localResultUrl = `https://api.nytimes.com/svc/books/v3/reviews.json?isbn=${intIsbn}&api-key=lOcvPik3JyP8fGFQLOa6ZMb5qa0buQUQ`
fetch(localResultUrl)
  .then(function (response) {
   if (!response.ok) {
     throw response.json();
  }

  return response.json();
})
.then(function (data) {
 console.log(data); 
 console.log(data.results[0].book_author); 
 console.log(data.results[0].book_title); 
 
selectObj = {isbn: isbnValue, BookTitle: data.results[0].book_title, Author: data.results[0].book_author}
localStorage.setItem("isbn-local", JSON.stringify(selectObj));
var displaySelectedISBN =  JSON.parse(localStorage.getItem('isbn-local'));
console.log(displaySelectedISBN);
var isbnBtn = document.createElement("div")
isbnBtn.setAttribute("id", selectObj[isbn]);
console.log(Object.values(selectObj)[0]);
var buttonValue = Object.values(selectObj)[0];
isbnBtn.innerHTML = buttonValue;
var bookTitle = document.createElement("p");
bookTitle.textContent = Object.values(selectObj)[1];
isbnBtn.append(bookTitle);
isbnFooterEl.append(isbnBtn);
})
}

//recentIsbnEl.append("ISBN: "+ displaySelectedISBN.isbn);
//recentIsbnEl.append("Book Title: "+ displaySelectedISBN.BookTitle);
//recentIsbnEl.append("Author: "+ displaySelectedISBN.Author);
