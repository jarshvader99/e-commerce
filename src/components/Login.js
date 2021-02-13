import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import withContext from "../withContext";

class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: "",
            password: ""
        };
    }

    handleChange = e => this.setState({ [e.target.name]: e.target.value, error: "" });

    login = (e) => {
        e.preventDefault();

        const { username, password } = this.state;
        if (!username || !password) {
            return this.setState({ error: "Fill all fields!" });
        }
        this.props.context.login(username, password)
            .then((loggedIn) => {
                if (!loggedIn) {
                    this.setState({ error: "Invalid Credentails" });
                }
            })
    };

    render() {
        return !this.props.context.user ? (
            <>
                <div className="hero is-link ">
                    <div className="hero-body container">
                        <h4 className="title">Login</h4>
                    </div>
                </div>
                <br />
                <br />
                <form onSubmit={this.login}>
                    <div className="columns is-mobile is-centered">
                        <div className="column is-one-third">
                            <div className="field">
                                <p class="control has-icons-left has-icons-right">
                                    <input
                                        className="input"
                                        type="email"
                                        name="username"
                                        placeholder="Email"
                                        onChange={this.handleChange}
                                    />
                                    <span class="icon is-small is-left">
                                        <i class="fas fa-envelope"></i>
                                    </span>
                                    <span class="icon is-small is-right">
                                        <i class="fas fa-check"></i>
                                    </span>
                                </p>
                            </div>
                            <div className="field">
                                <p class="control has-icons-left has-icons-right">
                                    <input
                                        className="input"
                                        type="password"
                                        name="password"
                                        placeholder="Password"
                                        onChange={this.handleChange}
                                    />
                                    <span class="icon is-small is-left">
                                        <i class="fas fa-lock"></i>
                                    </span>
                                </p>
                            </div>
                            {this.state.error && (
                                <div className="has-text-danger">{this.state.error}</div>
                            )}
                            <div className="field is-clearfix">
                                <button
                                    className="button is-link is-outlined is-pulled-right"
                                >
                                    Submit
                </button>
                            </div>
                        </div>
                    </div>
                </form>
            </>
        ) : (
                <Redirect to="/products" />
            );
    }
}

export default withContext(Login);