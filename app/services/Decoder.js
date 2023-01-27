export const AlertAreaCodeGenerator = sensorState => {
  if (typeof sensorState === 'string') {
    const index = sensorState.substring(1).indexOf('1') + 1;
    return index > 10 ? 0 : index;
  } else {
    return null;
  }
};
