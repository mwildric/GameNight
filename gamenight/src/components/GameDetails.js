const DOMParser = require('xmldom').DOMParser;

import React, {Component} from 'react';
import { View, ScrollView, Text, Image, WebView } from 'react-native';
import axios from 'axios';
import GameDetailsItem from './GameDetailsItem';
import { Button, Card, CardSection, SearchBar, Spinner } from './common';
import firebase from 'firebase';

class GameDetails extends Component{

    state = {loaded: false, game: {}, owned: null};
    static navigationOptions = {
        title: 'Game Details'
    };

    addGameToCollection(){

        gameId = this.state.game.gameId;

        var userId = firebase.auth().currentUser.uid;
        var collectionRef = firebase.database().ref('Collection/'+ userId );


        collectionRef.child(gameId).set(true)
            .then(
                this.setState({owned:true})
            );

        var gameRef = firebase.database().ref('games/'+ gameId );
        gameRef.once('value', function(snapshot) {
            var exists = (snapshot.val() !== null);

            if(!exists){
                gameRef.set(this.state.game);
            }
        }.bind(this));
    }

    gameOwnedCheck(gameId){
        var userId = firebase.auth().currentUser.uid;
        var collectionRef = firebase.database().ref('Collection/'+ userId + '/' + gameId);

        collectionRef.once('value', function(snapshot) {
            var owned = (snapshot.val() !== null);

            this.setState({owned});
        }.bind(this));


        this.setState({owned:false});

    }

    componentWillMount(){

        const gameId = this.props.navigation.state.params.gameId;

        this.gameOwnedCheck(gameId);
        this.retrieveGameDetails(gameId);
    }


    retrieveGameDetails(gameId){
        const URL = 'https://www.boardgamegeek.com/xmlapi/boardgame/' + gameId;

        axios.get(URL)
            .then(response =>{

                let doc = new DOMParser().parseFromString(response.data, 'text/xml');

                // Retrieve Game Image from response
                let xmlThumbnail = doc.getElementsByTagName('image');
                thumbnail = 'http:' + xmlThumbnail[0].firstChild.nodeValue;

                let xmlDescription = doc.getElementsByTagName('description');
                description= xmlDescription[0].firstChild.nodeValue;

                let xmlName = doc.getElementsByTagName('name');
                let name = '';

                for(var i = 0; i < xmlName.length; i++){
                    primary = xmlName[i].getAttribute('primary');
                    if(primary){
                        name = xmlName[i].firstChild.nodeValue;
                    }
                }

                let xmlMinPlayers = doc.getElementsByTagName('minplayers');
                minPlayers = xmlMinPlayers[0].firstChild.nodeValue;

                let xmlMaxPlayers = doc.getElementsByTagName('maxplayers');
                maxPlayers = xmlMaxPlayers[0].firstChild.nodeValue;

                let xmlPlayingTime = doc.getElementsByTagName('playingtime');
                playingTime = xmlPlayingTime[0].firstChild.nodeValue;



                game = {thumbnail, description, gameId, name, minPlayers, maxPlayers, playingTime};
                this.setState({game, loaded: true});

                }


            )
            .catch({

            });
    }

    renderButton(){
        switch(this.state.owned){
            case false:
                return(
                    <Button onPress={this.addGameToCollection.bind(this)}>Add to Collection</Button>
                );
            case true:
                return(
                    <Text>This game is in your Collection</Text>
                );
            default:
                return(<Spinner/>);

        }
    }

    renderGameDetails(){
        if(this.state.loaded){
            const game = this.state.game;
            return(
                <Card>
                    <GameDetailsItem game={this.state.game}/>
                    <CardSection>
                        {this.renderButton()}
                    </CardSection>
                    <View style={styles.descriptionStyle}>
                        <WebView source ={{html: game.description}}/>
                    </View>

                </Card>

            );
        }

        return(
            <Card>
                <CardSection>
                    <Spinner/>
                </CardSection>
            </Card>
        )

    }

    render(){
        return(
            <View >
                {this.renderGameDetails()}
            </View>
        );
    }
}

const styles = {
    containerStyle:{
        flex:1
    },
    detailContentStyle: {
        flexDirection: 'column',
        justifyContent: 'space-around',
        flex: 1

    },
    detailTextStyle: {
        fontSize: 18
    },
    thumbnailStyle: {
        width: null,
        height: 200,
        flex: 2
    },
    descriptionStyle:{
        height: 200
    }
};


export default GameDetails;