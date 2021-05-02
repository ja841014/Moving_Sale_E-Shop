"use strict";

window.onload = function () {
  var _this = this;

  var iconShopping = document.querySelector('.iconShopping');
  var cartCloseBtn = document.querySelector('.fa-close');
  var cartBox = document.querySelector('.cartBox');
  iconShopping.addEventListener("click", function () {
    cartBox.classList.add('active');
  });
  cartCloseBtn.addEventListener("click", function () {
    cartBox.classList.remove('active');
  });
  var iconShoppingP = document.querySelector('#cartNum');
  this.console.log("iconShoppingP", iconShoppingP);
  var no = 0;
  JSON.parse(localStorage.getItem('items')).map(function (data) {
    no = no + data.number;
  });
  iconShoppingP.innerHTML = no;
  var cardBoxTable = cartBox.querySelector('#showItem');
  var totalPrice = cartBox.querySelector('#total');
  var priceData = '';
  var tableData = '';
  var total = 0; // tableData += '<tr><th>Item Name</th><th>Item Price</th><th>Item(s)</th><th></th></tr>';

  if (JSON.parse(localStorage.getItem('items'))[0] === null) {
    tableData += '<h3>Let/s Go Shopping </h3>';
  } else {
    JSON.parse(localStorage.getItem('items')).map(function (data) {
      total = total + data.number * data.price;

      _this.console.log(total);

      tableData += "\n            <div style=\"background-color: rgba(181, 186, 228, 0.5)\" class=\"row\">\n            <div style=\"display:none\" class=\"col-sm\">" + data.productId + "</div>\n            <div class=\"col-sm\">" + data.productName + "</div>\n            <div class=\"col-sm\">" + data.price + "</div>\n            <div class=\"col-sm\">" + data.number + "</div>\n            <div class=\"col-sm\">\n            <a href=\"#\" onclick=Delete(this);>Delete</a>\n            </div>\n          </div>\n        </div>\n        "; // tableData += '<tr><th>'+data.productName+'</th><th>'+data.price+'</th><th>'+data.number+'</th><th><a href="#" onclick=Delete(this);>Delete</a></th></tr>';
    });
    priceData += "Total Price: $ " + total + " ";
  }

  cardBoxTable.innerHTML = tableData;
  totalPrice.innerHTML = priceData;
  var logout = document.querySelector('#logout');
  logout.addEventListener("click", function () {
    console.log("fndknfsd");
    localStorage.removeItem('items');
  });
};