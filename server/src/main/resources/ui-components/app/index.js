import Application from './components/application/index.js';

const formContainer = document.querySelector('#app');
const app = new Application(formContainer);
app.render();
