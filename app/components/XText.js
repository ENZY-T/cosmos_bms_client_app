import {StyleSheet, Text, View} from 'react-native';
import React from 'react';

const XText = props => {
  let styleArr = [];
  styleArr.push(styles.font);
  styleArr.push(props.style);
  return <Text style={styleArr}>{props.children}</Text>;
};

export default XText;

const styles = StyleSheet.create({
  font: {
    color: 'black',
    textAlignVertical: 'center',
  },
});
