import React from "react";
import loginImg from "../../dog-304206.svg";

export class Login extends React.Component {
    constructor(props) {
        super(props);
    }
    state = {
        email: '',
        password: '',
    };
    handleInputEmail = (event) => {
        this.setState({
            email: event.target.value,

        })
    };
    handleInputPass = (event) => {
        this.setState({
            password: event.target.value,

        });
    };
    handleLogin = (event) => {
        event.preventDefault();
        //fetch API login

        fetch('http://10.1.10.243:3001/api/auth/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            credentials: 'include',
            body: JSON.stringify({
                email: this.state.email,
                password: this.state.password
            })
        })
            .then((res) => {
                return res.json();
            })
            .then((data) => {
                if (!data.success) {
                    this.setState({
                        errorMessage: data.message,
                        loading: false,
                    });
                } else {
                    window.location.href = '/';
                }
            })
            .catch((error) => {
                console.log(error)
            })
    }

    render() {

        return (
            <div className="base-container">
                <div className="header">Login</div>
                <div className="content">
                    <div className="row">
                        <div className="col-4">
                            <div className="image">
                                <img src={loginImg} />
                            </div>
                        </div>
                        <div className="col-8 ">
                            <div className="form">
                                <div className="form-group">
                                    <label htmlFor="username">Username</label>
                                    <input type="text" name="username" placeholder="username" onChange={this.handleInputEmail} value={this.state.email} />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="password">Password</label>
                                    <input type="password" name="password" placeholder="password" onChange={this.handleInputPass} value={this.state.password} />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="footer">
                    <button type="button" className="btn" onClick={this.handleLogin}>
                        Login
                    </button>
                </div>
            </div>
        );
    }
}