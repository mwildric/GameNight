// Import libraries
import React from 'react';
import { Text, View } from 'react-native'


// Make a component
const Header = (props) => {
    const {textStyle, viewStyle} = styles;

    return (
        <View style={viewStyle}>
            <Text style={textStyle}>{props.headerText}</Text>
        </View>
    );
};

const styles = {
    viewStyle: {
        backgroundColor: '#F8F8F8',
        justifyContent: 'center',
        alignItems: 'center',
        height: 60,
        paddingTop: 15,
        elevation: 5,
        position: 'relative'

    },
    textStyle: {
        fontSize: 20
    }
};


// Make the component available
export { Header };
