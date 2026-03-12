/*(function() {
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
        localStorage.setItem('carritoSeptimaMedalla', JSON.stringify(carrito));
        actualizarInterfaz();
    };

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

            carrito.forEach((prod, index) => {
                total += prod.precio;
                
                lista.innerHTML += `
                    <div style="display:flex; justify-content:space-between; align-items:center; padding:10px; border-bottom:1px solid #444;">
                        <div style="display:flex; flex-direction:column;">
                            <span style="font-size: 0.9rem; color:white;">${prod.nombre}</span>
                            <strong style="color:#ffcb05">${prod.precio.toFixed(2)}€</strong>
                        </div>
                        <button class="btn-borrar-item" 
                                onclick="eliminarDelCarrito(${index})" 
                                style="background:#ff4444; color:white; border:none; border-radius:4px; padding:5px 10px; cursor:pointer; height: fit-content; align-self:center; line-height:1; 
                                display:flex; align-items:center; justify-content:center;">
                            X
                        </button>
                    </div>`;
            });

            if (totalElt) totalElt.innerText = total.toFixed(2) + " €";
        }
    }

    document.addEventListener('DOMContentLoaded', actualizarInterfaz);
})(); */

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
    guardarYActualizar();
};

function agregarAlCarrito(nombre, precio) {
    carrito.push({ nombre, precio });
    guardarYActualizar();

    const sidebar = document.getElementById('carrito-sidebar');
  
    if (sidebar && !sidebar.classList.contains('open')) {
        window.toggleCarrito();
    }
}

function procesarPago() {
    if (carrito.length === 0) {
        alert("El carrito está vacío.");
        return;
    }

    if (typeof adobe !== 'undefined' && adobe.target) {
        adobe.target.trackEvent({
            "mbox": "compra_click",
            "params": {
                "pago_iniciado": "true"
            },
            "success": function() {
                console.log("Señal enviada. Esperando sincronización...");
                finalizarCompra();
            },
            "error": function() {
                console.log("Error en trackEvent, finalizando igual...");
                finalizarCompra(); 
            }
        });
    } else {
        console.log("Adobe Target no detectado, finalizando compra directa...");
        finalizarCompra;
    }
}

/* function finalizarCompra() {

    let contador = parseInt(localStorage.getItem('contador_compras')) || 0;

    contador++;
    localStorage.setItem('contador_compras', contador);

    localStorage.setItem('user_has_purchased', 'true');
    
    alert("¡Compra realizada con éxito! Esta es tu compra número " + contador + "!");

    carrito = [];
    localStorage.setItem('carritoSeptimaMedalla', JSON.stringify(carrito));

    setTimeout(() => {
        location.reload();
    }, 2000);
} */

/* function finalizarCompra () {

    localStorage.setItem('premio_proxima_visita', 'true');

    carrito = [];
    localStorage.setItem('carritoSeptimaMedalla', JSON.stringify(carrito));

    setTimeout(() => {
        location.reload();
    }, 2000);
} */

function finalizarCompra () {

    localStorage.setItem('premio_proxima_visita', 'true');

    localStorage.removeItem('veces_visto');

    localStorage.setItem('carritoSeptimaMedalla', JSON.stringify(carrito));

    setTimeout(() => {
        location.reload();
    }, 2000);
}     

function guardarYActualizar() {
    localStorage.setItem('carritoSeptimaMedalla', JSON.stringify(carrito));
    actualizarInterfaz();
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
            lista.innerHTML = '<p style="padding:20px; color:#888; text-align:center;">El carrito está vacío.</p>';
        } else {
            carrito.forEach((prod, index) => {
                total += prod.precio;
                lista.innerHTML += `
                    <div class="item-fila" style="padding: 15px; border-bottom: 1px solid rgba(255,255,255,0.1); display: flex; justify-content: space-between; align-items: center;">
                        <div style="display: flex; flex-direction: column; text-align: left;">
                            <span style="font-weight: bold; color: var(--blanco-nube);">${prod.nombre}</span>
                            <span style="color: var(--amarillo-pokemon); font-size: 0.9rem;">${prod.precio.toFixed(2)}€</span>
                        </div>
                        <button onclick="eliminarDelCarrito(${index})" 
                                style="background: var(--rojo-pokemon); color: white; border: none; padding: 5px 10px; border-radius: 5px; cursor: pointer; font-weight: bold;">
                            X
                        </button>
                    </div>`;
            });
        }
        if (totalElt) totalElt.innerText = total.toFixed(2) + " €";
    }
}

document.addEventListener('DOMContentLoaded', () => {
    actualizarInterfaz();

    document.addEventListener('click', (e) => {
        if (e.target.classList.contains('btn-comprar')) {
            const nombre = e.target.getAttribute('data-nombre');
            const precio = parseFloat(e.target.getAttribute('data-precio'));
            if (nombre && !isNaN(precio)) {
                agregarAlCarrito(nombre, precio);
            }
        }

        if (e.target.classList.contains('btn-checkout')) {
            procesarPago(); 
        }
    });
});