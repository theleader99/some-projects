import React from "react";
import loginImg from "../../dog-304206.svg";

export class Register extends React.Component {
    constructor(props) {
        super(props);
    }
    state = {
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        confirmPass: '',
        phoneNumber: '',
        loading: false,
    };

    handleInputEmail = (event) => {
        this.setState({
            email: event.target.value,
        })
    };

    handleInputfirstName = (event) => {
        this.setState({
            firstName: event.target.value,
        })
    };
    handleInputlastName = (event) => {
        this.setState({
            lastName: event.target.value,
        })
    };

    handleInputPassword = (event) => {
        this.setState({
            password: event.target.value,
        })
    };
    handleInputconfirmPass = (event) => {
        this.setState({
            confirmPass: event.target.value,
        })
    };
    handleInputphoneNumber = (event) => {
        this.setState({
            phoneNumber: event.target.value,
        })
    };
    handleRegister = (event) => {
        this.setState({
            loading: true,
        })
        event.preventDefault();
        //fetch API login

        fetch('http://10.1.10.243:3001/api/auth/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            credentials: 'include',
            body: JSON.stringify({
                name: {
                    firstName: this.state.firstName,
                    lastName: this.state.lastName,
                },
                email: this.state.email,
                password: this.state.password,
                confirmPass: this.state.confirmPass,
                phoneNumber: this.state.phoneNumber,
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
    };
    render() {
        return (
            <div className="base-container">
                <div className="header">Register</div>
                <div className="content">
                    <div className="row">
                        <div className="col-4">
                            <div className="image">
                                <img src={loginImg} />
                            </div>
                        </div>
                        <div className="col-8">
                            <div className="form">
                                <div className="form-group">
                                    <label htmlFor="username">FirstName</label>
                                    <input type="text" name="FirstName" placeholder="Your FirstName..." onChange={this.handleInputfirstName} value={this.state.firstName} />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="username">LastName</label>
                                    <input type="text" name="LastName" placeholder="Your LastName..." onChange={this.handleInputlastName} value={this.state.lastName} />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="email">Email</label>
                                    <input type="email" name="email" placeholder="Your email..." onChange={this.handleInputEmail} value={this.state.email} />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="PhoneNumber">Phone Number</label>
                                    <input type="text" name="PhoneNumber" placeholder="Your Phone Number..." onChange={this.handleInputphoneNumber} value={this.state.phoneNumber} />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="password">Password</label>
                                    <input type="password" name="password" placeholder="Your password..." onChange={this.handleInputPassword} value={this.state.password} />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="Confirm Password">Confirm Password</label>
                                    <input type="password" name="Confirm Password" placeholder="Confirm Password..." onChange={this.handleInputconfirmPass} value={this.state.confirmPass} />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                {this.state.loading ? (
                    <div className="spinner-border" role="status">
                        <span className="sr-only">Loading...</span>
                    </div>
                ) : (
                        <div className="footer">
                            <button type="button" className="btn" onClick={this.handleRegister}>
                                Register
                            </button>
                        </div>
                    )}
            </div>
        );
    }
}