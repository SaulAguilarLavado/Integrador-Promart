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
                cargarCarrito();

                async function cargarCarrito() {
                    fetch('/api/carrito')
                        .then(res => res.ok ? res.json() : [])
                        .then(productos => {
                            listaCarrito.innerHTML = "";
                            if (productos.length === 0) {
                                listaCarrito.innerHTML = "<li>No hay productos en el carrito.</li>";
                            } else {
                                productos.forEach(item => {
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
            }
        });
});