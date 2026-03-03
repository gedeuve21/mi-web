(function() {
    let carrito = JSON.parse(localStorage.getItem('carritoSeptimaMedalla')) || [];

    window.toggleCarrito = function() {
        const sidebar = document.getElementById('carrito-sidebar');
        const overlay = document.getElementById('cart-overlay');
        if (sidebar && overlay) {
            sidebar.classList.toggle('open');
            overlay.classList.toggle('active');
        }
    };

    window.eliminarDelCarrito = function(index) {
        carrito.splice(index, 1);
        localStorage.setItem('carritoSeptimaMedadlla', JSON.stringify(carrito));
        actualizarInterfaz();
    }

    document.addEventListener('click', (e) => {
        if (e.target.classList.contains('btn-comprar')) {
            const nombre = e.target.getAttribute('data-nombre');
            const precio = parseFloat(e.target.getAttribute('data-precio'));
            
            if (nombre && !isNaN(precio)) {
                agregarAlCarrito(nombre, precio);
            }
        }
    });

    function agregarAlCarrito(nombre, precio) {
        carrito.push({ nombre, precio });
        localStorage.setItem('carritoSeptimaMedalla', JSON.stringify(carrito));
        actualizarInterfaz();
        
        const sidebar = document.getElementById('carrito-sidebar');
        if (sidebar && !sidebar.classList.contains('open')) {
            window.toggleCarrito();
        }
    }

    function actualizarInterfaz() {
        const lista = document.getElementById('carrito-items-list');
        const contador = document.getElementById('cart-count');
        const totalElt = document.getElementById('total-amount');

        if (contador) contador.innerText = carrito.length;
        
        if (lista) {
            lista.innerHTML = "";
            let total = 0;
            
            if (carrito.length === 0) {
                lista.innerHTML = '<p style="padding:20px; color:#888;">El carrito está vacío.</p>';
            } else {
                carrito.forEach((prod) => {
                    total += prod.precio;
                    lista.innerHTML += `
                        <div style="display:flex; justify-content:space-between; padding:10px; border-bottom:1px solid #444;">
                            <span>${prod.nombre}</span>
                            <strong style="color:#ffcb05">${prod.precio.toFixed(2)}€</strong>
                        </div>`;
                });
            }
            if (totalElt) totalElt.innerText = total.toFixed(2) + " €";
        }
    }

    document.addEventListener('DOMContentLoaded', actualizarInterfaz);
})();