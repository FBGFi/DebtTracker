import React from 'react';
import { View, Text } from 'react-native';
import { ScreenProps } from '../../constants/types';

interface HomeScreenProps extends ScreenProps {

}

export const HomeScreen = (props: HomeScreenProps) => {
    return(
        <View>
            <Text>Is this even needed?</Text>
        </View>
    );
}