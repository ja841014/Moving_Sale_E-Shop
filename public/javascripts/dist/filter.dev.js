"use strict";

var btns = document.querySelectorAll('.btn');
console.log(btns);
var storeProducts = document.querySelectorAll('div.store-product'); // const search = document.getElementById(search);

console.log(storeProducts);

for (i = 0; i < btns.length; i++) {
  btns[i].addEventListener('click', function (e) {
    e.preventDefault();
    var filter = e.target.dataset.filter;
    console.log(filter);
    storeProducts.forEach(function (product) {
      if (filter === 'all') {
        product.style.display = 'block';
      } else {
        if (product.classList.contains(filter)) {
          product.style.display = 'block';
        } else {
          product.style.display = 'none';
        }
      }
    });
  });
}

; // SEARCH FILTER
// const search = document.getElementById("search");
// const productName = document.querySelectorAll(".product-details h2");
// // A BETTER WAY TO FILTER THROUGH THE PRODUCTS
// search.addEventListener("keyup", filterProducts);
// function filterProducts(e) {
//     const text = e.target.value.toLowerCase();
//     // console.log(productName[0]);
//     productName.forEach(function(product) {
//         const item = product.firstChild.textContent;
//         if (item.toLowerCase().indexOf(text) != -1) {
//             product.parentElement.parentElement.style.display = "block"
//         } else {
//             product.parentElement.parentElement.style.display = "none"
//         }
//     })
// }