import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  fullSize: {
    height: '100%',
    width: '100%',
  },
  fullHeight: {
    height: '100%',
  },
  fullWidth: {
    width: '100%',
  },
});

export const GlobalData = {
  styles: styles,
  communicationSettings: {
    alertTopic: 'bms-state-alert-dev',
    dataTopic: 'bms-state-data-dev',
    confirmationTopic: 'bms-operation-confirmation-dev',
    lampStateTopic: 'bms-lamp-state-dev',
  },
  credentials: {},
  groundFloorSensors: [
    require('./img/GroundFloorSensors/floorGroundSensorMap-0.jpg'),
    require('./img/GroundFloorSensors/floorGroundSensorMap-1.jpg'),
    require('./img/GroundFloorSensors/floorGroundSensorMap-2.jpg'),
    require('./img/GroundFloorSensors/floorGroundSensorMap-3.jpg'),
    require('./img/GroundFloorSensors/floorGroundSensorMap-4.jpg'),
    require('./img/GroundFloorSensors/floorGroundSensorMap-5.jpg'),
    require('./img/GroundFloorSensors/floorGroundSensorMap-6.jpg'),
    require('./img/GroundFloorSensors/floorGroundSensorMap-7.jpg'),
    require('./img/GroundFloorSensors/floorGroundSensorMap-8.jpg'),
    require('./img/GroundFloorSensors/floorGroundSensorMap-9.jpg'),
    require('./img/GroundFloorSensors/floorGroundSensorMap-10.jpg'),
  ],
  groundFloorLamps: require('./img/Lamps/GroundFloor-cropped4.png'),
  firstFloorLamps: require('./img/Lamps/FirstFloor-cropped.png'),
  azureFunctions: {
    broadcastUrl: 'https://cosmos-bms.azurewebsites.net/api/broadcast',
    // broadcastUrl: 'http://192.168.8.100:7163/api/broadcast',
    getStateUrl: 'https://cosmos-bms.azurewebsites.net/api/getstate',
  },
};
