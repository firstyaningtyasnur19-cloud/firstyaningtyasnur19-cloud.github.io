
let cart = [];
function addToCart(name, price) {
    cart.push({ name, price });
    document.getElementById('cart-count').textContent = cart.length;
    alert(name + ' ditambahkan ke keranjang!');
}
document.getElementById('cart-icon').addEventListener('click', function() {
    let checkoutSection = document.getElementById('checkout');
    let checkoutList = document.getElementById('checkout-list');
    let totalPrice = 0;
    checkoutList.innerHTML = '';
    cart.forEach(item => {
        let li = document.createElement('li');
        li.textContent = item.name + ' - Rp ' + item.price.toLocaleString();
        checkoutList.appendChild(li);
        totalPrice += item.price;
    });
    document.getElementById('total-price').textContent = totalPrice.toLocaleString();
    checkoutSection.style.display = 'block';
    window.scrollTo({ top: checkoutSection.offsetTop, behavior: 'smooth' });
});
