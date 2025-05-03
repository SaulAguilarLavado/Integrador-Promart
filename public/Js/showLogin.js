document.addEventListener("DOMContentLoaded", function() {
    const showFormsButton = document.getElementById('showForms');
    const loginSection = document.getElementById('loginSection');
    const registerSection = document.getElementById('registerSection');
    const showRegisterForm = document.getElementById('showRegisterForm');
    const showLoginForm = document.getElementById('showLoginForm');
    const overlay = document.createElement('div');
    overlay.classList.add('overlay');

    // Agregar el fondo oscuro al DOM
    document.body.appendChild(overlay);

    // Mostrar login
    const showLogin = () => {
        loginSection.classList.add('visible');
        overlay.classList.add('visible');
        registerSection.classList.remove('visible');
    };

    // Mostrar registro
    const showRegister = () => {
        registerSection.classList.add('visible');
        overlay.classList.add('visible');
        loginSection.classList.remove('visible');
    };

    // Cerrar formularios cuando se haga clic en el overlay
    overlay.addEventListener('click', () => {
        loginSection.classList.remove('visible');
        registerSection.classList.remove('visible');
        overlay.classList.remove('visible');
    });

    // Mostrar login cuando se hace clic en "Mi Cuenta"
    showFormsButton.addEventListener('click', showLogin);

    // Mostrar el formulario de registro al hacer clic en "Registrarse"
    showRegisterForm.addEventListener('click', showRegister);

    // Mostrar el formulario de login al hacer clic en "Iniciar Sesión"
    showLoginForm.addEventListener('click', showLogin);
});



