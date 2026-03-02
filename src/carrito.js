let carrito = JSON.parse(localStorage.getItem('carritoSeptimaMedalla')) || [];

function toggleCarrito() {
    document.getElementById('carrito-sidebar').classList.toggle('open');
    document.getElementById('cart-overlay').classList.toggle('active');
}

document.addEventListener('click', (e) => {
    if (e.target.classList.contains('btn-comprar')) {
        const nombre = e.target.getAttribute('data-nombre');
        const precio = parseFloat(e.target.getAttribute('data-precio'));
        agregarAlCarrito(nombre, precio);
    }
});

function agregarAlCarrito(nombre, precio) {
    carrito.push({ nombre, precio });
    localStorage.setItem('carritoSeptimaMedalla', JSON.stringify(carrito));
    actualizarInterfaz();
    if (!document.getElementById('carrito-sidebar').classList.contains('open')) {
        toggleCarrito();
    }
}

function actualizarInterfaz() {
    const lista = document.getElementById('carrito-items-list');
    const contador = document.getElementById('cart-count');
    const totalElt = document.getElementById('total-amount');
    
    if(contador) contador.innerText = carrito.length;
    
    if(lista) {
        lista.innerHTML = "";
        let total = 0;
        if (carrito.length === 0) {
            lista.innerHTML = '<p class="empty-msg">El carrito está vacío.</p>';
        } else {
            carrito.forEach((prod) => {
                total += prod.precio;
                lista.innerHTML += `<div class="item-fila"><span>${prod.nombre}</span><strong>${prod.precio.toFixed(2)}€</strong></div>`;
            });
        }
        totalElt.innerText = total.toFixed(2) + " €";
    }
}

document.addEventListener('DOMContentLoaded', actualizarInterfaz);