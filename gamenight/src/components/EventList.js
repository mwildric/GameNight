import React, {Component} from 'react';
import { Text, ScrollView } from 'react-native';
import {Button, Card, CardSection, Input, Spinner} from './common';
import firebase from 'firebase';
import EventListItem from './EventListItem';
import { NavigationActions } from 'react-navigation'


class EventList extends Component {
    static navigationOptions = {
        title: 'Event List',
    };

    state = {
        events: []
    }

    componentWillMount(){

        var eventRef = firebase.database().ref('event');

        eventRef.once('value', function(snapshot) {
            snapshot.forEach(function(childSnapshot){
                this.setState({events: this.state.events.concat(childSnapshot.val())});
            }.bind(this))
        }.bind(this))

    }

    onPress(userId){
        const navigationAction = NavigationActions.navigate({
            routeName: 'Profile',
            params: {userId: userId},

            action: NavigationActions.navigate({ routeName: 'SubProfileRoute'},{userId: userId})
        })
        this.props.navigation.dispatch(navigationAction)
    }


    renderEventList(){
        return this.state.events.map(event => <EventListItem key={event.key} event={event} onPress={this.onPress.bind(this,event.userId)}/>);
    }


    render(){
        return(
            <Card>
                <ScrollView>
                    {this.renderEventList()}
                </ScrollView>
            </Card>
        )
    }
}

export default EventList;

