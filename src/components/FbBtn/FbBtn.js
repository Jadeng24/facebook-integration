import React, { Component } from 'react';

export default class FbBtn extends Component {

    componentDidMount() {
        document.addEventListener('FBObjectReady', this.initializeFacebookLogin);
    }

    componentWillUnmount() {
        document.removeEventListener('FBObjectReady', this.initializeFacebookLogin);
    }

    /**
     * Init FB object and check Facebook Login status
     */
    initializeFacebookLogin = () => {
        this.FB = window.FB;
        this.checkLoginStatus();
    }

    /**
     * Check login status
     */
    checkLoginStatus = () => {
        this.FB.getLoginStatus(this.facebookLoginHandler);
    }

    /**
     * Check login status and call login api is user is not logged in
     */
    facebookLogin = () => {
        if (!this.FB) return;
        console.log('clicked')
        this.FB.getLoginStatus(response => {
            if (response.status === 'connected') {
                console.log('connected')
                this.facebookLoginHandler(response);
            } else {
                this.FB.login(this.facebookLoginHandler, { scope: 'public_profile' });
                console.log(' not connected')
            }
        }, );
    }

    /**
     * Handle login response
     */
    facebookLoginHandler = response => {
        console.log('connected22')
        if (response.status === 'connected') {
            this.FB.api('/me', userData => {
                let result = {
                    ...response,
                    user: userData
                };
                this.props.onLogin(true, result);
            });
        } else {
            this.props.onLogin(false);
        }
    }

    render() {
        let { children } = this.props;
        return (
            <div onClick={this.facebookLogin}>
                {children}
            </div>
        );
    }
}