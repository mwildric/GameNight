import React, {Component} from 'react';
import {View,Text} from 'react-native';
import { Header, Button, Card, CardSection,Spinner } from './components/common';
import GameList from './components/GameList';
import Events from './components/Events';
import Profile from './components/Profile';
import LoginForm from './components/LoginForm';
import GameDetails from './components/GameDetails';
import { StackNavigator } from 'react-navigation';
import firebase from 'firebase';
import SignUpForm from './components/SignUpForm';
import EventList from './components/EventList';
import CreateEvent from './components/CreateEvent';

class HomeScreen extends Component {
    state = { loggedIn: null };
    static navigationOptions = {
        title: 'Welcome',
    };

    componentWillMount(){
        firebase.initializeApp({
            apiKey: "AIzaSyDcgpy1sIO_Z63RHSlrfxP4o7JCiz57sIU",
            authDomain: "gamenight-fa26e.firebaseapp.com",
            databaseURL: "https://gamenight-fa26e.firebaseio.com",
            storageBucket: "gamenight-fa26e.appspot.com",
            messagingSenderId: "421780405518"
        });
        firebase.auth().onAuthStateChanged((user) => {
            if(user){
                const userId = firebase.auth().currentUser.uid;
                this.setState({ loggedIn: true, userId});
            } else {
                this.setState({loggedIn: false});
            }
        });

    }

    renderContent() {
        const { navigate } = this.props.navigation;
        switch(this.state.loggedIn){
            case true:
                return(

                <Card>
                    <CardSection>
                        <Button onPress={ () => navigate('GameSearch', {navigate: navigate})}>Game Search</Button>
                    </CardSection>
                    <CardSection>
                        <Button onPress={ () => navigate('Profile',{userId: this.state.userId})}>My Collection</Button>
                    </CardSection>
                    <CardSection>
                        <Button onPress={ () => navigate('Events')}>Events</Button>
                    </CardSection>
                    <CardSection>
                        <Button onPress={() => firebase.auth().signOut()}>
                            Log Out
                        </Button>
                    </CardSection>
                </Card>

                );

            case false:

                return(
                        <Card>
                            <LoginForm/>
                            <CardSection>
                                <Button onPress={ () => navigate('SignUp')}>Sign up</Button>
                            </CardSection>
                        </Card>
                );

            default:
                return(
                    <CardSection>
                        <Spinner size='large'/>
                    </CardSection>
                );
        }
    }


    render(){
        return(
            <View>
                {this.renderContent()}
            </View>
        );
    }
}

const App = StackNavigator({
    Home: { screen: HomeScreen },
    GameSearch: {screen: GameList},
    Profile: {screen: Profile},
    Events: {screen: Events},
    GameDetails: {screen: GameDetails},
    SignUp: {screen: SignUpForm},
    EventList: {screen: EventList},
    CreateEvent: {screen: CreateEvent}
});

export default App;
