import axios from 'axios';
import {GlobalData} from '../GlobalData';

export const signalRBroadcast = async dataObj => {
  await axios
    .post(GlobalData.azureFunctions.broadcastUrl, dataObj, {timeout: 3000})
    .then(res => console.log(res.status))
    .catch(err => console.log('Error: \n' + err.message));
};

export const getLampState = () => {
  (async () =>
    await axios
      .get(GlobalData.azureFunctions.getStateUrl)
      .then(res => console.log(res.status))
      .catch(err => console.log('Error: \n' + err.message)))();
};
