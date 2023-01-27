import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';

import Lamps from './Lamps';
import Cams from './Cams';
import Settings from './Settings';
import Icon from 'react-native-vector-icons/FontAwesome';
import XText from '../components/XText';

const Tab = createBottomTabNavigator();

const HomeSection = props => {
  return (
    <Tab.Navigator
      initialRouteName="Sensors"
      screenOptions={({route}) => ({
        tabBarIcon: ({focused, color, size}) => {
          let iconName;
          let type;

          if (route.name === 'Sensors') {
            iconName = 'video';
            type = focused ? 'solid' : 'light';
          } else if (route.name === 'Lamps') {
            iconName = 'lightbulb';
            type = focused ? 'solid' : 'light';
          } else if (route.name === 'Settings') {
            iconName = 'cogs';
            type = focused ? 'solid' : 'Settings';
          }

          // You can return any component that you like here!
          return (
            <FontAwesome5
              name={iconName}
              size={size}
              color={color}
              solid={type === 'solid'}
            />
          );
        },
        tabBarActiveTintColor: 'tomato',
        tabBarInactiveTintColor: 'gray',
      })}>
      <Tab.Screen
        name="Sensors"
        component={Cams}
        options={{
          headerTitle: headerProps => (
            <View style={styles.headerTitle}>
              <Icon name="video-camera" size={30} color="grey" />
              <XText style={styles.headerTitleText}>
                {headerProps.children}
              </XText>
            </View>
          ),
        }}
      />
      <Tab.Screen
        name="Lamps"
        component={Lamps}
        options={{
          headerTitle: headerProps => (
            <View style={styles.headerTitle}>
              <Icon name="lightbulb-o" size={30} color="grey" />
              <XText style={styles.headerTitleText}>
                {headerProps.children}
              </XText>
            </View>
          ),
        }}
      />
      <Tab.Screen
        name="Settings"
        component={Settings}
        options={{
          headerTitle: headerProps => (
            <View style={styles.headerTitle}>
              <Icon name="gear" size={30} color="grey" />
              <XText style={styles.headerTitleText}>
                {headerProps.children}
              </XText>
            </View>
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default HomeSection;

const styles = StyleSheet.create({
  headerTitle: {
    flexDirection: 'row',
    alignContent: 'center',
  },
  headerTitleText: {
    marginHorizontal: 10,
    fontSize: 20,
    fontWeight: 'bold',
  },
});
