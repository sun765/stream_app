import React from 'react';
import {SignIn, SignOut} from '../actions/index';
import {connect} from 'react-redux';

class GoogleAuth extends React.Component{
    constructor(props){
        super(props);
        this.state = {isSignedIn: null, auth: null};
    }
    componentDidMount(){
        window.gapi.load('client:auth2',()=>{
            window.gapi.client.init({
                clientId:"644862763446-sb24gg851eqiunknin859l0qm17j26qo.apps.googleusercontent.com",
                scope: 'email'
            })
            .then(()=>{
                //console.log("gapi loaded");
                const auth = window.gapi.auth2.getAuthInstance();
                this.setState({auth:auth, isSignedIn:auth.isSignedIn.get()});
                this.onAuthChange(this.state.isSignedIn);
                this.state.auth.isSignedIn.listen(this.onAuthChange);
            })
        });
    }

    onSignInClick=()=>{

        this.state.auth.signIn();
    }

    onSignOutClick=()=>{
        this.state.auth.signOut();
    }

    onAuthChange=(isSignedIn)=>{
        if(isSignedIn){
            const userId = this.state.auth.currentUser.get().getId();
            this.props.SignIn(userId);
        }
        else{
            this.props.SignOut();
        }
    }

    renderAuth=()=>{
        if(this.props.isSignedIn ===null){
            return null;
        }
        else if(this.props.isSignedIn === false){
            
            return (
                <button onClick = {this.onSignInClick} className = "ui red google button">
                    <i className = "google icon"/>
                    Sign In with Google
                </button>
            );
        }
        else{
            
            return (
            <button onClick = {this.onSignOutClick} className = "ui red google button">
                <i className = "google icon"/>
                Sign Out
            </button>
            )
        }
    }

    render(){
        return (
            <div>{this.renderAuth()}</div>
        );
    }
}

const mapStateToProps = state=>{
    return {isSignedIn: state.auth.isSignedIn};
}

export default connect(mapStateToProps,
                      {SignIn, SignOut})(GoogleAuth);