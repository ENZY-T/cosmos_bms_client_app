import {StyleSheet, View} from 'react-native';
import {Switch} from 'react-native-paper';

import React, {useState, useEffect} from 'react';
import GlobalStyles from '../services/GlobalStyles';
import {NotificationFunctions, storageFunctions} from '../services/Functions';
import XText from '../components/XText';

const Settings = () => {
  const [isEnabled, setIsEnabled] = useState(false);
  const toggleSwitch = () => setIsEnabled(previousState => !previousState);

  useEffect(() => {
    storageFunctions.notificationsSettings.load().then(result => {
      if (result?.isPushEnabled) {
        setIsEnabled(true);
      } else {
        setIsEnabled(false);
      }
    });
  }, []);

  useEffect(() => {
    if (isEnabled) {
      if (NotificationFunctions.activatePushNotifications()) {
        setIsEnabled(false);
      }
    } else {
      if (NotificationFunctions.deactivatePushNotifications()) {
        setIsEnabled(false);
      }
    }
  }, [isEnabled]);

  return (
    <View style={styles.container}>
      <View style={styles.switchContainer}>
        <XText style={styles.text}>
          {isEnabled ? 'Enabled' : 'Disabled'} push notifications
        </XText>
        <Switch
          trackColor={{false: '#767577', true: '#81b0ff99'}}
          thumbColor={isEnabled ? '#81b0ffff' : '#f4f3f4'}
          ios_backgroundColor="#3e3e3e"
          onValueChange={toggleSwitch}
          value={isEnabled}
        />
      </View>
    </View>
  );
};

export default Settings;

const styles = StyleSheet.create({
  container: {padding: '5%'},
  text: [
    GlobalStyles.margin_y(10),
    {
      flex: 1,
      fontSize: 18,
    },
  ],
  switchContainer: {
    flexDirection: 'row',
  },
});
