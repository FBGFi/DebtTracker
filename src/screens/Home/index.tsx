import React from 'react';
import { View, Text } from 'react-native';
import { ScreenProps } from '../../constants/types';

interface HomeProps extends ScreenProps {

}

export const Home = (props: HomeProps) => {
    return(
        <View>
            <Text>Home Screen</Text>
        </View>
    );
}