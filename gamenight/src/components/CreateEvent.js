import React, {Component} from 'react';
import { Text } from 'react-native';
import {Button, Card, CardSection, Input, Spinner} from './common';
import firebase from 'firebase';
import { NavigationActions } from 'react-navigation'

class CreateEvent extends Component {
    state = {address: '', date: '',name: '', error: ''};
    static navigationOptions = {
        title: 'Create Event'
    };

    onButtonPress(){

        const{address,date,name} = this.state;
        var userId = firebase.auth().currentUser.uid;

        let event = {address, date, name, userId};

        this.setState({error: '', loading: true});

        firebase.database().ref('event').push(event)
            .then(this.onSuccess.bind(this))
            .catch(() => {
                this.setState({error: 'Event Creation Failed', loading: false});
            });
    }

    onSuccess(){
        const {goBack} = this.props.navigation;
        goBack(null);

    }


    render(){
        return (
            <Card>
                <CardSection>
                    <Input
                        onChangeText={ name => this.setState({ name })}
                        value={this.state.name}
                        label = 'Event Name'
                    />
                </CardSection>

                <CardSection>
                    <Input
                        onChangeText={ address => this.setState({ address })}
                        value={this.state.address}
                        label = 'Address'
                    />
                </CardSection>
                <CardSection>
                    <Input onChangeText={ date => this.setState({ date })}
                           value={this.state.email}
                           label = 'Date'
                    />
                </CardSection>

                <Text style = {styles.errorTextStyle}>
                    {this.state.error}
                </Text>

                <CardSection>
                    <Button onPress={this.onButtonPress.bind(this)}>
                        Create Event
                    </Button>
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

export default CreateEvent;