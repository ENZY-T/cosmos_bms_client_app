import React from 'react';
import {createContext, useState, useEffect} from 'react';
import {AlertAreaCodeGenerator} from './Decoder';
import {appFunctions} from './Functions';

export const AppContext = createContext({});

export const AppContextProvider = props => {
  const [sensorState, setSensorState] = useState('s0000000000');
  const [lampState, setLampState] = useState('b0000000000');
  const [alertArea, setAlertArea] = useState(0);

  useEffect(() => {
    if (sensorState) {
      const areaCode = AlertAreaCodeGenerator(sensorState);
      setAlertArea(areaCode);
    } else {
      setSensorState('s0000000000');
    }
  }, [sensorState]);

  const refreshSensors = () => {
    appFunctions.getStorageSensorState().then(result => {
      console.log('Loaded sensorState: ' + result);
      const newSensorState = result;

      setSensorState(newSensorState);
    });
  };

  let stateValue = {
    alertArea: alertArea,
    setAlertArea: setAlertArea,
    sensorState: sensorState,
    setSensorState: setSensorState,
    lampState: lampState,
    setLampState: setLampState,
    refreshSensors: refreshSensors,
  };
  return (
    <AppContext.Provider value={stateValue}>
      {props.children}
    </AppContext.Provider>
  );
};
