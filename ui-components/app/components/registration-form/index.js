import Component from "../component.js";

export default class RegistrationForm extends Component {
    constructor(container) {
        super(container);
        this.render();
    }


    markup() {
        return `
            <form class="application-box form-dialog">
                <img src="app/images/logo.png" class="logo" alt="logo">
            
                <header class="header form-header">
                    <h1>Registration</h1>
                    <span class="glyphicon glyphicon-user"></span>
                </header>
            
                <main>
                    <div class="row">
                        <label for="input-username" class="input-label">Username</label>
            
                        <div class="input-block">
                            <input type="text" id="input-username" name="username" class="input" placeholder="Email">
                            <span class="error-message">Username can't be empty</span>
                        </div>
                    </div>
            
                    <div class="row">
                        <label for="input-password" class="input-label">Password</label>
            
                        <div class="input-block">
                            <input type="password" id="input-password" name="password" class="input" placeholder="Password">
                            <span class="error-message">Password can't be empty and should contain letters and numbers</span>
                        </div>
                    </div>
            
                    <div class="row">
                        <label for="input-confirm-password" class="input-label">Confirm Password</label>
            
                        <div class="input-block">
                            <input type="password" id="input-confirm-password" name="confirm-password" class="input" placeholder="Confirm password">
                            <span class="error-message">Passwords do not match</span>
                        </div>
                    </div>
            
                    <div class="row">
                        <div class="form-footer">
                            <button type="submit" class="button">Register</button>
                            <a href="#/authentication" class="form-link">Already have an account?</a>
                        </div>
                    </div>
                </main>
            </form>
        `;
    }
}
