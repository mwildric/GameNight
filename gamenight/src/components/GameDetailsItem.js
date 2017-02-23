import React from 'react';
import { Text, View, Image, Linking, TouchableOpacity } from 'react-native';
import { Card, CardSection, Button} from './common'

const GameDetailsItem = ({game}) => {
    const {name, minPlayers, maxPlayers, playingTime,thumbnail} = game;

    return(
        <View stye={styles.containerStyle}>
            <CardSection>
                <Text style={styles.detailTextStyle}>{name}</Text>
            </CardSection>
            <CardSection>
                <Image style={styles.thumbnailStyle}
                       source={{uri: thumbnail}}
                />
                <View style = {styles.detailContentStyle}>
                    <Text style={styles.detailTextStyle}>Players: {minPlayers} - {maxPlayers}</Text>
                    <Text style={styles.detailTextStyle}>Playtime: {playingTime}</Text>
                </View>
            </CardSection>
        </View>
    );
};

const styles = {
    headerContentStyle: {
        flexDirection: 'column',
        justifyContent: 'space-around'

    },
    headerTextStyle: {
        fontSize: 18
    },
    thumbnailStyle: {
        height: 150,
        width: 150
    },
    thumbnailContainerStyle: {
        justifyContent: 'center',
        alignItems: 'center',
        marginLeft: 10,
        marginRight: 10
    },
    imageStyle: {
        height: 300,
        flex: 1,
        width: null
    }
}

export default GameDetailsItem;
