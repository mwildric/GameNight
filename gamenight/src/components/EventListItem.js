import React from 'react';
import { Text, View, Image, Linking, TouchableOpacity } from 'react-native';
import { Card, CardSection, Button} from './common'

const EventListItem = ({event, onPress}) => {
    const {address, name, date, userName} = event;

    return(
        <Card>
            <CardSection>
                    <View style = {styles.headerContentStyle}>
                        <Text style={styles.headerTextStyle}>{name}</Text>
                    </View>
            </CardSection>
            <CardSection>
                <Text>Where:{address}</Text>
            </CardSection>
            <CardSection>
                <Text>When: {date}</Text>
            </CardSection>
            <CardSection>
                <Button onPress={onPress}>Host's Game Collection</Button>
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

export default EventListItem;
