sexport const EncodeLampState = lampsStateObject => {
  let lampState = 'b';
  for (let i = 0; i < 10; i++) {
    Object.keys(lampsStateObject).map((lamp, index) => {
      if (lamp.includes(i.toString())) {
        lampState += lampsStateObject[lamp] === 'checked' ? 1 : 0;
      }
    });
  }
  return lampState + '00000';
};
