window.onload = function() {
    const iconShopping = document.querySelector('.iconShopping');
    const cartCloseBtn = document.querySelector('.fa-close');
    const cartBox = document.querySelector('.cartBox')
    iconShopping.addEventListener("click", function() {
        cartBox.classList.add('active');
    });
    cartCloseBtn.addEventListener("click", function() {
        cartBox.classList.remove('active');
    });

    const iconShoppingP = document.querySelector('#cartNum');
    this.console.log("iconShoppingP", iconShoppingP);
	let no = 0;
	JSON.parse(localStorage.getItem('items')).map(data=>{
		no = no+data.number
;	});
	iconShoppingP.innerHTML = no;


    const cardBoxTable = cartBox.querySelector('#showItem');
    const totalPrice = cartBox.querySelector('#total');
    let priceData = '';
    let tableData = '';
    let total = 0;
	// tableData += '<tr><th>Item Name</th><th>Item Price</th><th>Item(s)</th><th></th></tr>';
	if(JSON.parse(localStorage.getItem('items'))[0] === null){
		tableData += '<h3>Let/s Go Shopping </h3>'
	}else{
		JSON.parse(localStorage.getItem('items')).map(data=>{
            total = total + data.number * data.price;
            this.console.log(total);
            tableData += 
            `
            <div style="background-color: rgba(181, 186, 228, 0.5)" class="row">
            <div style="display:none" class="col-sm">`
                +data.productId+
            `</div>
            <div class="col-sm">`
                +data.productName+
            `</div>
            <div class="col-sm">`
              +data.price+
            `</div>
            <div class="col-sm">`
             +data.number +
            `</div>
            <div class="col-sm">
            <a href="#" onclick=Delete(this);>Delete</a>
            </div>
          </div>
        </div>
        `
    	// tableData += '<tr><th>'+data.productName+'</th><th>'+data.price+'</th><th>'+data.number+'</th><th><a href="#" onclick=Delete(this);>Delete</a></th></tr>';
        });
        priceData += `Total Price: $ `+total+` `;
	}
    cardBoxTable.innerHTML = tableData;
    totalPrice.innerHTML = priceData;

    const logout = document.querySelector('#logout')
    logout.addEventListener("click", function() {
        console.log("fndknfsd")
        localStorage.removeItem('items');
    });


}