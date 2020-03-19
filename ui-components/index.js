import LoginForm from "./components/login-form";

const formContainer = document.querySelector('.login-form');
const form = new LoginForm(formContainer);
form.render();