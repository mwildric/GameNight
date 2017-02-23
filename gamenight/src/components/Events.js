import React, {Component} from 'react';
import { Text } from 'react-native';
import {Button, Card, CardSection, Input, Spinner} from './common';
import { NavigationActions } from 'react-navigation'

class Events extends Component {
    static navigationOptions = {
        title: 'Events',
    };



    render(){
        const { navigate } = this.props.navigation;

        return(
            <Card>
                <CardSection>
                    <Button onPress={()=>navigate('CreateEvent')}>Create Event</Button>
                </CardSection>
                <CardSection>
                    <Button onPress={() => navigate('EventList')}>Show Events</Button>
                </CardSection>
            </Card>
        )
    }
}

export default Events;