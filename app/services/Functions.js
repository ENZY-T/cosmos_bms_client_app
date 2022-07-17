import AsyncStorage from '@react-native-async-storage/async-storage';
import messaging from '@react-native-firebase/messaging';
import {GlobalData} from '../GlobalData';

export const NotificationFunctions = {
  activatePushNotifications: () => {
    NotificationFunctions.subscribeToTopic(
      GlobalData.communicationSettings.alertTopic,
    )
      .then(() => {
        console.log('Push Notification Active');
        storageFunctions.notificationsSettings.update({isPushEnabled: true});
      })
      .catch(err => {
        console.log(err.message);
        return err;
      });
  },
  deactivatePushNotifications: () => {
    NotificationFunctions.unsubscribeTopic(
      GlobalData.communicationSettings.alertTopic,
    )
      .then(() => {
        console.log('Push Notification Inactive');
        storageFunctions.notificationsSettings.update({isPushEnabled: false});
      })
      .catch(err => {
        console.log(err.message);
        return err;
      });
  },
  subscribeToTopic: async topic => {
    messaging()
      .subscribeToTopic(topic)
      .then(() => console.log(`Subscribed to topic: ${topic}`));
  },
  unsubscribeTopic: async topic => {
    messaging()
      .unsubscribeFromTopic(topic)
      .then(() => console.log(`Unsubscribed topic: ${topic}`));
  },
};

export const appFunctions = {
  setIsNeedRefresh: isNeedRefresh => {
    const strValue = String(isNeedRefresh);
    AsyncStorage.setItem('isNeedRefresh', strValue)
      .then(() => {
        console.log('Saved to storage, isNeedRefresh: ' + strValue);
      })
      .catch(err => {
        console.log(err.message);
      });
  },
  setStorageSensorState: state => {
    AsyncStorage.setItem('sensorState', state)
      .then(() => console.log('Saved to storage, sensorState: ' + state))
      .catch(err => {
        console.log(err.message);
      });
  },
  getStorageSensorState: async () => {
    const result = await AsyncStorage.getItem('sensorState').catch(err => {
      console.log(err.message);
      return null;
    });
    console.log('sensorState loaded: ' + result);
    return result;
  },
};

export const storageFunctions = {
  notificationsSettings: {
    load: async () => {
      let dataObj;
      const result = await AsyncStorage.getItem('notificationSettings').catch(
        err => console.log('Storage load error: ' + err.message),
      );
      dataObj = JSON.parse(result);
      if (dataObj) {
        return dataObj;
      } else {
        return null;
      }
    },
    update: value => {
      AsyncStorage.mergeItem('notificationSettings', JSON.stringify(value))
        .then(() => {
          console.log(`Storage Updated: ${JSON.stringify(value)}`);
        })
        .catch(err => console.log(`Error: ${err.message}`));
    },
  },
};

export const lampFunctions = {
  processLampState: lampState => {
    let lamps = {
      l1: 'OFF',
      l2: 'OFF',
      l3: 'OFF',
      l4: 'OFF',
      l5: 'OFF',
    };
    if (typeof lampState === 'string') {
      [...lampState].map((char, index) => {
        lamps = {
          ...lamps,
          [`l${index}`]: char === '1' ? 'ON' : 'OFF',
        };
      });
    } else {
      console.log('Error in lampState type');
    }

    return lamps;
  },
};

export const Log = message => {
  console.log('log: ', message);
};
