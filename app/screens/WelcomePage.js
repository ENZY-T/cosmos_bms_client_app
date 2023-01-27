import {StyleSheet, Text, View, Image} from 'react-native';
import React from 'react';
import {useFocusEffect} from '@react-navigation/native';
import GlobalStyles from '../services/GlobalStyles';

const WelcomePage = ({navigation}) => {
  useFocusEffect(() => {
    setTimeout(() => {
      navigation.replace('HomeSection');
    }, 1500);
  });

  return (
    <View>
      <Image
        style={styles.image}
        source={require('../img/welcome.jpg')}
        resizeMethod="scale"
        resizeMode="cover"
      />
    </View>
  );
};

export default WelcomePage;

const styles = StyleSheet.create({
  image: [GlobalStyles.fullSize],
});
