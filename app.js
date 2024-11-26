let temProduct ={};

function addToCart(productName,productPrice,productImg){
    temProduct = {
        name : productName,
        price : productPrice,
        image : productImg
    };

    document.getElementById("box").classList.add("d-block");
    document.getElementById("box").classList.remove("d-none");

}
function cancel(){
    document.getElementById("box").classList.add("d-none");
    document.getElementById("box").classList.remove("d-block");
}
function add(){
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    let existingProuduct = cart.find(item=>item.name === temProduct.name);

    if(existingProuduct){
        existingProuduct.quantity += 1;
    }else{
        let prduct = {
            id : cart.length + 1,
            name : temProduct.name,
            price : temProduct.price,
            image : temProduct.image,
            quantity : 1
        }
        cart.push(prduct);
    }
    localStorage.setItem("cart",JSON.stringify(cart));
    temProduct = {};

    document.getElementById("box").classList.add("d-none");

}

function clearAll(){
    localStorage.removeItem('cart');
    onload();

    let price = document.querySelector('#total');
    price.textContent = 0;
}

function onload(){
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    let cartItem = document.querySelector(".carts");

    let total = 0;
    cartItem.innerHTML='';

    if(cart.length === 0){
        cartItem.innerHTML = `<h4 class="text-center py-4">Your Shopping cart is empty </h4>`;
    }
    else{
        cart.forEach((item,index)=>{
            cartItem
            cartItem.innerHTML +=`
            <div class="cart d-flex justify-content-between">
                <img class="rounded-5  " src="${item.image}" alt="" style="width: 150px;">
                <div class="info text-end">
                    <h4 class="m-0">${item.name}</h4>
                    <p class="m-0 fs-4">Price: $ ${item.price}</p>
                    <div class="btns">
                        <button onclick="changeQuantity(${index}, 'decrease')" class="btn mx-2 fs-4">-</button>
                        <span>${item.quantity}</span>
                        <button onclick="changeQuantity(${index}, 'increase')" class="btn mx-2 fs-4">+</button>
                    </div>
                </div>
            </div> <hr>
            `;

            // total count
            total += item.price * item.quantity;
            let price = document.querySelector('#total');
            price.textContent = total.toFixed(2);

        });
    }
}
function changeQuantity(index, action){
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    if(action == 'increase'){
        cart[index].quantity += 1;
    }else if(action == 'decrease'){
        cart[index].quantity -= 1;
    }
    if(cart[index].quantity == 0){
        cart.splice(index, 1);
    }

    localStorage.setItem('cart', JSON.stringify(cart));
    onload();
}