import React, {Component} from 'react';
import { Text, View } from 'react-native';
import {Button, Card, CardSection, Input, Spinner} from './common';
import firebase from 'firebase';

class LoginForm extends Component {
    state = {email: '', password: '', error: '', loading: false};

    onButtonPress(){

        const{email,password} = this.state;

        this.setState({error: '', loading: true});

        firebase.auth().signInWithEmailAndPassword(email, password)
            .then(this.onLoginSuccess.bind(this))
            .catch(() => {
                this.setState({error: 'Authentication Failed', loading: false});
            });
    }

    onLoginSuccess(){
        this.setState({
            email: '',
            password: '',
            loading: false,
            error: ''
        })
    }

    renderButton(){
        if (this.state.loading){
            return <Spinner size='small'/>
        }
        return(
            <Button onPress={this.onButtonPress.bind(this)}>
                Log in
            </Button>
        )
    }

    render(){
        return (
            <View>
                <CardSection>
                    <Input onChangeText={ email => this.setState({ email })}
                           value={this.state.email}
                           label = 'Email'
                           placeholder = 'user@example.com'
                    />
                </CardSection>
                <CardSection>
                    <Input
                        secureTextEntry
                        onChangeText={ password => this.setState({ password })}
                        value={this.state.password}
                        label = 'Password'
                        placeholder = 'password'
                    />
                </CardSection>

                <Text style = {styles.errorTextStyle}>
                    {this.state.error}
                </Text>

                <CardSection>
                    {this.renderButton()}
                </CardSection>
            </View>
        );
    }
}

const styles = {
    errorTextStyle: {
        fontSize: 20,
        alignSelf: 'center',
        color: 'red'
    }
};

export default LoginForm;