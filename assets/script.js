
var authorEl = document.getElementById("author-name");
var isbnEl = document.getElementById("isbn");
var submitEl = document.getElementById('submit');
var authorBtnEl = document.getElementById('author-button'); 
var authorBtnEl = document.getElementById('author-button');
var isbnBtnEl = document.getElementById('isbn-button');
//var aResEl = document.getElementById('aRes');
var displayListEl = document.getElementById('display-list');
var displayResultEl = document.getElementById('display-result');
var recentIsbnEl = document.getElementById('recent-isbn');

submitEl.addEventListener("click", select);
authorBtnEl.addEventListener("click", author_det);
isbnBtnEl.addEventListener("click", isbn_det);
var bookTitle1El = document.getElementById('book-title1');
var review1El = document.getElementById('review1');
var isbn1El = document.getElementById('isbn1');
var bookTitle2El = document.getElementById('book-title2');
var review2El = document.getElementById('review2');
var isbn2El = document.getElementById('isbn2');
var bookTitle3El = document.getElementById('book-title3');
var review3El = document.getElementById('review3');
var isbn3El = document.getElementById('isbn3');
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
      for (var i=0; i<1; i=i+1) {
       
        console.log(data.results[0].book_title);
        console.log(data.results[0].url);
        console.log(data.results[0].isbn13[0]);
        bookTitle1El.append(data.results[0].book_title);
        review1El.setAttribute('href',data.results[0].url);
        review1El.append(data.results[0].url);
        isbn1El.append(data.results[0].isbn13[0]);

        console.log(data.results[1].book_title);
        console.log(data.results[1].url);
        console.log(data.results[1].isbn13[0]);
        bookTitle2El.append(data.results[1].book_title);
        review2El.setAttribute('href',data.results[1].url);
        review2El.append(data.results[1].url);
        isbn2El.append(data.results[1].isbn13[0]);

        console.log(data.results[2].book_title);
        console.log(data.results[2].url);
        console.log(data.results[2].isbn13[0]);
        bookTitle3El.append(data.results[2].book_title);
        review3El.setAttribute('href',data.results[2].url);
        review3El.append(data.results[2].url);
        isbn3El.append(data.results[2].isbn13[0]);
      
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
