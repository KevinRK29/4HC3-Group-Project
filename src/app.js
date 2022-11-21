let menu = document.querySelector('#menu-bars');
let navbar = document.querySelector('.navbar');

menu.onclick = () => {
  menu.classList.toggle('fa-times');
  navbar.classList.toggle('active');
}

let section = document.querySelectorAll('section');
let navLinks = document.querySelectorAll('header .navbar a');

window.onscroll = () => {

  menu.classList.remove('fa-times');
  navbar.classList.remove('active');

  section.forEach(sec => {

    let top = window.scrollY;
    let height = sec.offsetHeight;
    let offset = sec.offsetTop - 150;
    let id = sec.getAttribute('id');

    if (top >= offset && top < offset + height) {
      navLinks.forEach(links => {
        links.classList.remove('active');
        document.querySelector('header .navbar a[href*=' + id + ']').classList.add('active');
      });
    };

  });

}

window.onload = fadeOut;

function toggleLogin() {
  main = document.getElementById("myForm")
  main.style.display === "block" ? main.style.display = "none" : main.style.display = "block";
}

function toggleCart() {
  main = document.getElementById("myCart")
  main.style.display === "block" ? main.style.display = "none" : main.style.display = "block";
}

function editCart(item, quantity) {
  if (sessionStorage.hasOwnProperty(item)) {
    if (parseFloat(sessionStorage[item]) + parseFloat(quantity) < 1) {
      sessionStorage.removeItem(item);
      removeCartItem(item);
    }
    else {
      sessionStorage[item] = parseFloat(sessionStorage[item]) + parseFloat(quantity);
      updateCartItem(item, quantity);
    }
  }
  else {
    if (quantity > 0) {
      sessionStorage[item] = parseFloat(quantity);
      addCartItem(item, quantity);
    }
  }
}

function addCartItem(item, quantity) {
  const cartRow = document.createElement('div');
      cartRow.innerHTML = 
      `<div class="cart-item" id = "` + item + `">
        <i class="fas fa-plus" onClick="editCart('` + item + `', 1)"></i>
        <i class="fas fa-minus" onClick="editCart('` + item + `', -1)"></i>
        <i class="fas fa-trash" onClick="removeCartItem('` + item + `')"></i>
        <img src="images/menu-4.jpg" alt="" />
        <div class="cart-content">
          <h3>` + item + `</h3>
          <span class="price">$4.99</span>
          <span class="quantity" id="` + item + `-amount">qty: ` + quantity + `</span>
        </div>
      </div>`
      document.getElementById("myCart").prepend(cartRow);
}

function removeCartItem(item) {
  var itemToRemove = document.getElementById(item);
  itemToRemove.parentNode.removeChild(itemToRemove);
  sessionStorage.removeItem(item);
}

function updateCartItem(item) {
  document.getElementById(item + '-amount').innerHTML =
    `<span class="quantity" id="qty">qty: ` + sessionStorage[item] + `</span>`
}

function populateCart() {
  console.log(sessionStorage)
  for (var i = 0; i < sessionStorage.length; i++) {
    addCartItem(sessionStorage.key(i), sessionStorage[sessionStorage.key(i)])
  }
}

function togglePayment() {
  main = document.getElementById("credit-form");
  creditCardBtn = document.getElementById("credit-button");
  main.style.display !== "block" ? main.style.display = "block" : main.style.display = "none";
  creditCardBtn.style.borderColor === "red" ? main.style.borderColor = "black" : main.style.borderColor = "red";
  // creditCardBtn.style.borderColor = "red";
}
// let payAmountBtn = document.querySelector('#payAmount');
// let decrementBtn = document.querySelector('#decrement');
// let quantityElem = document.querySelector('#quantity');
// let incrementBtn = document.querySelector('#increment');
// let priceElem = document.querySelector('#price');
// let subtotalElem = document.querySelector('#subtotal');
// let taxElem = document.querySelector('#tax');
// let totalElem = document.querySelector('#total');

// console.log(incrementBtn.length);

// for (let i = 0; i < incrementBtn.length; i++) {
//   incrementBtn[i].addEventListener('click', function () {
//     let increment = Number(this.previousElementSibling.textContent);
//     increment++;
//     this.previousElementSibling.textContent = increment;
//     //totalCalc();
//     console.log(increment);
//   })

//   decrementBtn[i].addEventListener('click', function () {
//     let decrement = Number(this.previousElementSibling.textContent);
//     decrement <= 1 ? 1 : decrement--;
//     this.previousElementSibling.textContent = decrement;
//     //totalCalc();
//   })
// }

// const totalCalc = function () {
//   const tax = 0.13;
//   let subtotal = 0;
//   let totalTax = 0;
//   let total = 0;

//   for (let i = 0; i < quantityElem.length; i++) {
//     subtotal += Number(quantityElem[i].textContent) = Number(priceElem[i].textContent);
//   }

//   subtotalElem.textContent = subtotal.toFixed(2);

//   totalTax = subtotal * tax;

//   taxElem.textContent = totalTax.toFixed(2);

//   total = subtotal + totalTax;

//   totalElem.textContent = total.toFixed(2);
//   payAmountBtn.textContent = total.toFixed(2);
// }
