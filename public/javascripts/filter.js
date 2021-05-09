window.onload = function() {

    const btns = document.querySelectorAll('.btn');
    console.log(btns);
    
    // const search = document.getElementById(search);
    // console.log(storeProducts);

    for (i = 0; i < btns.length; i++) {
        
        btns[i].addEventListener('click', (e) => {
            const storeProducts = document.querySelectorAll('.store-product');
            e.preventDefault()
            console.log("click")
            const filter = e.target.dataset.filter;
            console.log(filter);
            console.log(storeProducts);
            
            storeProducts.forEach((product)=> {
                this.console.log("classlist", product.classList)
                
                if (filter === 'all'){
                    product.style.display = 'block'
                    this.console.log("1")
                } else {
                    if (product.classList.contains(filter)){
                        product.style.display = 'block'
                        this.console.log("2")
                    } else {
                        product.style.display = 'none'
                        this.console.log("3")
                    }
                }
            });
        });
    };
}

// SEARCH FILTER
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
