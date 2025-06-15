document.addEventListener("DOMContentLoaded", function() {
    fetch('/api/user')
        .then(res => res.json())
        .then(data => {
            window.userId = data.userId;

            document.querySelectorAll(".btn-comprar").forEach(btn => {
                btn.addEventListener("click", async function() {
                    if (!window.userId) {
                        alert("Inicie sesión para poder comprar.");
                        return;
                    }
                    const id_producto = this.dataset.id;
                    if (!id_producto) {
                        alert("Error: id_producto no definido");
                        return;
                    }
                    try {
                        const res = await fetch('/api/carrito', {
                            method: 'POST',
                            headers: { 'Content-Type': 'application/json' },
                            body: JSON.stringify({ id_producto: Number(id_producto) })
                        });
                        if (res.ok) {
                            alert("Producto añadido al carrito");
                        } else {
                            const error = await res.json().catch(() => ({}));
                            alert("Error al añadir al carrito: " + (error.error || res.status));
                        }
                    } catch (err) {
                        alert("Error de conexión");
                    }
                });
            });

            // Mostrar el carrito solo en la página del carrito
            const listaCarrito = document.getElementById("lista-carrito");
            if (listaCarrito) {
                // Agrega los elementos para el total, input y botón comprar si no existen
                let totalContainer = document.getElementById("carrito-total-container");
                if (!totalContainer) {
                    totalContainer = document.createElement("div");
                    totalContainer.id = "carrito-total-container";
                    totalContainer.innerHTML = `
                        <span id="carrito-total"></span>
                        <input type="number" id="monto-pagado" placeholder="Ingrese el monto a pagar" min="0" step="0.01">
                        <button id="btn-comprar">Comprar</button>
                        <div id="mensaje-compra"></div>
                    `;
                    listaCarrito.parentNode.insertBefore(totalContainer, listaCarrito.nextSibling);
                }

                cargarCarrito();

                async function cargarCarrito() {
                    fetch('/api/carrito')
                        .then(res => res.ok ? res.json() : [])
                        .then(productos => {
                            listaCarrito.innerHTML = "";
                            let total = 0;
                            if (productos.length === 0) {
                                listaCarrito.innerHTML = "<li>No hay productos en el carrito.</li>";
                                document.getElementById("carrito-total").textContent = "";
                            } else {
                                productos.forEach(item => {
                                    total += item.precio * item.cantidad;
                                    const li = document.createElement("li");
                                    li.classList.add("carrito-item");
                                    li.innerHTML = `
                                        <img src="/uploads/${item.imagen}" alt="Imagen producto" class="carrito-img">
                                        <span class="carrito-nombre">${item.nombre_producto}</span>
                                        <span class="carrito-precio">S/ ${item.precio}</span>
                                        <button class="btn-cantidad btn-restar" data-id="${item.id}">-</button>
                                        <span class="carrito-cantidad">${item.cantidad}</span>
                                        <button class="btn-cantidad btn-sumar" data-id="${item.id}">+</button>
                                        <button class="btn-eliminar" data-id="${item.id}">🗑️</button>
                                    `;
                                    listaCarrito.appendChild(li);
                                });
                                document.getElementById("carrito-total").textContent = "Total a pagar: S/ " + total.toFixed(2);

                                // Eventos para sumar/restar/eliminar
                                document.querySelectorAll(".btn-sumar").forEach(btn => {
                                    btn.addEventListener("click", async function() {
                                        await actualizarCantidad(this.dataset.id, "sumar");
                                    });
                                });
                                document.querySelectorAll(".btn-restar").forEach(btn => {
                                    btn.addEventListener("click", async function() {
                                        await actualizarCantidad(this.dataset.id, "restar");
                                    });
                                });
                                document.querySelectorAll(".btn-eliminar").forEach(btn => {
                                    btn.addEventListener("click", async function() {
                                        await eliminarProducto(this.dataset.id);
                                    });
                                });
                            }
                        })
                        .catch(() => {
                            listaCarrito.innerHTML = "<li>Debe iniciar sesión para ver su carrito.</li>";
                            document.getElementById("carrito-total").textContent = "";
                        });
                }

                // Todas las acciones usan POST con un campo 'accion'
                async function actualizarCantidad(id_producto, accion) {
                    try {
                        const res = await fetch('/api/carrito', {
                            method: 'POST',
                            headers: { 'Content-Type': 'application/json' },
                            body: JSON.stringify({ id_producto: Number(id_producto), accion })
                        });
                        if (res.ok) {
                            cargarCarrito();
                        } else {
                            alert("No se pudo actualizar la cantidad.");
                        }
                    } catch (err) {
                        alert("Error de conexión");
                    }
                }

                async function eliminarProducto(id_producto) {
                    try {
                        const res = await fetch('/api/carrito', {
                            method: 'POST',
                            headers: { 'Content-Type': 'application/json' },
                            body: JSON.stringify({ id_producto: Number(id_producto), accion: "eliminar" })
                        });
                        if (res.ok) {
                            cargarCarrito();
                        } else {
                            alert("No se pudo eliminar el producto.");
                        }
                    } catch (err) {
                        alert("Error de conexión");
                    }
                }

                // Evento para el botón Comprar
                document.getElementById("btn-comprar").addEventListener("click", async function() {
                    const montoPagado = Number(document.getElementById("monto-pagado").value);
                    const totalTexto = document.getElementById("carrito-total").textContent;
                    const total = Number(totalTexto.replace(/[^\d.]/g, ''));
                    const mensajeCompra = document.getElementById("mensaje-compra");
                    if (montoPagado < total) {
                        mensajeCompra.textContent = "El monto ingresado es insuficiente.";
                        mensajeCompra.style.color = "red";
                        return;
                    }
                    try {
                        const res = await fetch('/api/carrito/comprar', {
                            method: 'POST',
                            headers: { 'Content-Type': 'application/json' },
                            body: JSON.stringify({ montoPagado })
                        });
                        const data = await res.json();
                        if (res.ok) {
                            mensajeCompra.textContent = "¡Compra realizada con éxito!";
                            mensajeCompra.style.color = "green";
                            cargarCarrito();
                        } else {
                            mensajeCompra.textContent = data.error || "Error al procesar la compra.";
                            mensajeCompra.style.color = "red";
                        }
                    } catch (err) {
                        mensajeCompra.textContent = "Error de conexión.";
                        mensajeCompra.style.color = "red";
                    }
                });
            }
        });
});