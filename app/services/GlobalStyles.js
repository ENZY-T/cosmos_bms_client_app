import {StyleSheet} from 'react-native';

const GlobalStyles = StyleSheet.create({
  fullSize: {
    height: '100%',
    width: '100%',
  },
  fullHeight: {
    height: '100%',
    width: undefined,
  },
  fullWidth: {
    width: '100%',
    height: undefined,
  },
  padding_y: y => ({paddingVertical: y}),
  margin_y: y => ({marginVertical: y}),
});

export default GlobalStyles;
