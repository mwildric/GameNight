const DOMParser = require('xmldom').DOMParser;

import React, {Component} from 'react';
import { View, ScrollView } from 'react-native';
import axios from 'axios';
import GameListItem from './GameListItem';
import { Button, Card, CardSection, SearchBar, Spinner } from './common';
import { NavigationActions } from 'react-navigation'

class GameList extends Component{
    state = {gameList: [], query: '', selectedGame: {}};
    static navigationOptions = {
        title: 'Game Search',
    };


    onGameSelect(gameId){
        const navigationAction = NavigationActions.navigate({
            routeName: 'GameDetails',
            params: {gameId: gameId},

            action: NavigationActions.navigate({ routeName: 'SubProfileRoute'},{id:gameId})
        })
        this.props.navigation.dispatch(navigationAction)
    }

    onButtonPress(){


        axios.get('https://www.boardgamegeek.com/xmlapi/search?search=' + this.state.query)
            .then(response =>{

                let doc = new DOMParser().parseFromString(response.data, 'text/xml');
                let xmlGames = doc.getElementsByTagName('boardgame');

                let gameList = [];

                for(var i = 0; i < xmlGames.length; i++){
                    gameList.push({
                        gameId: xmlGames[i].getAttribute('objectid'),
                        name: xmlGames[i].childNodes[1].firstChild.nodeValue,
                        releaseYear: xmlGames[i].childNodes[3].firstChild.nodeValue
                    })

                }

                this.setState({gameList});
            }


    );
    }

    renderGames(){
        return this.state.gameList.map(game => <GameListItem key={game.gameId} game= {game} onPress={this.onGameSelect.bind(this,game.gameId)}/>);
    }



    renderButton(){
        if (this.state.loading){
            return <Spinner size='small'/>
        }
        return(
            <Button onPress={this.onButtonPress.bind(this)}>
                Search
            </Button>
        )
    }


    render(){
        return (
          <Card>
              <CardSection>
                  <SearchBar onChangeText={ query => this.setState({ query })}
                         value={this.state.query}
                         placeholder = 'Search for game'
                  />
              </CardSection>

              <CardSection>
                  {this.renderButton()}
              </CardSection>

                <ScrollView>
                    {this.renderGames()}
                </ScrollView>
            </Card>
        );
    }
}


export default GameList;
