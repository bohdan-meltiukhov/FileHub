import LoginForm from "./components/login-form";
import Application from "./components/application";

const formContainer = document.querySelector('#app');
const app = new Application(formContainer);
app.render();
