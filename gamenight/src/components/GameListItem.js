import React from 'react';
import { Text, View, Image, Linking, TouchableOpacity } from 'react-native';
import { Card, CardSection, Button} from './common'

const GameListItem = ({game, onPress}) => {
    const {gameId, name, releaseYear, selected} = game;

    return(
        <Card>
            <CardSection>
                <TouchableOpacity onPress = {onPress}>
                    <View style = {styles.headerContentStyle}>
                        <Text style={styles.headerTextStyle}>{name}</Text>
                        <Text>{releaseYear}</Text>
                    </View>
                </TouchableOpacity>

            </CardSection>
        </Card>
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
        height: 50,
        width: 50
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

export default GameListItem;
