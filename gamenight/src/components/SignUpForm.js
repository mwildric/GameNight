import React, {Component} from 'react';
import { Text } from 'react-native';
import {Button, Card, CardSection, Input, Spinner} from './common';
import firebase from 'firebase';
import { NavigationActions } from 'react-navigation'

class SignUpFrom extends Component {
    state = {email: '', password: '',name: '', error: '', loading: false};
    static navigationOptions = {
        title: 'Sign up'
    };

    onButtonPress(){

        const{email,password} = this.state;

        this.setState({error: '', loading: true});

        firebase.auth().createUserWithEmailAndPassword(email, password)
                    .then(this.onLoginSuccess.bind(this))
                    .catch(() => {
                        this.setState({error: 'Authentication Failed', loading: false});
                    });
    }

    onLoginSuccess(){
        var userId = firebase.auth().currentUser.uid;

        var collectionRef = firebase.database().ref('User/'+ userId );

        collectionRef.child('name').set(this.state.name)

        const {goBack} = this.props.navigation;

        goBack(null);

    }

    renderButton(){
        if (this.state.loading){
            return <Spinner size='small'/>
        }
        return(
            <Button onPress={this.onButtonPress.bind(this)}>
                Sign Up
            </Button>
        )
    }

    render(){
        return (
            <Card>
                <CardSection>
                    <Input
                        onChangeText={ name => this.setState({ name })}
                        value={this.state.name}
                        label = 'Name'
                        placeholder = 'Jane Doe'
                    />
                </CardSection>
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
            </Card>
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

export default SignUpFrom;