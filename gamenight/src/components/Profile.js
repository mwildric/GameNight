import React, {Component} from 'react';
import { Text, ScrollView } from 'react-native';
import {Button, Card, CardSection, Input, Spinner} from './common';
import firebase from 'firebase';
import GameDetailsItem from './GameDetailsItem';
class Profile extends Component {
    static navigationOptions = {
        title: 'Game Collection',
    };

    state = {
        gameIds: [],
        games: []
    }

    componentWillMount(){

        var userId = this.props.navigation.state.params.userId;
        var collectionRef = firebase.database().ref('Collection/'+ userId );

        collectionRef.once('value', function(snapshot) {

            snapshot.forEach(function(childSnapshot){
                this.setState({gameIds: this.state.gameIds.concat([childSnapshot.key])});
            }.bind(this))

            this.retrieveGames();
        }.bind(this));

    }

    retrieveGames(){
        this.state.gameIds.map( gameId => {

            var gameRef = firebase.database().ref('games/'+ gameId );

            gameRef.once('value', function(snapshot) {
                this.setState({games: this.state.games.concat(snapshot.val())});
            }.bind(this))



        })


    }

    renderCollection(){
        return this.state.games.map(game => <GameDetailsItem key={game.gameId} game={game}/>);
    }


    render(){
        return(
            <Card>
                <ScrollView>
                {this.renderCollection()}
                </ScrollView>
            </Card>
        )
    }
}

export default Profile;

