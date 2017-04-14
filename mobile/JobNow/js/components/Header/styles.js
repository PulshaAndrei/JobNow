import { StyleSheet, Platform, Dimensions, StatusBar } from 'react-native';

//import { WHITE, BRIGHTSKYBLUE, AQUAMARINE, GREENBLUE, DARKSEAGREEN, DUSKBLUE, COLOR_BLUE, COLOR_GREEN, COLOR_ORANGE, COLOR_BLUE_LIGHT_BORDER } from '../../styles/variables';

export default StyleSheet.create({
  header: {
    backgroundColor: 'transparent',
    top: 20,
    left: 0,
    right: 0,
    height: 80,
    position: 'absolute',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 15,
  },
  headerTitle: {
    color: 'white',
    fontFamily: 'AvenirNextCyr-Thin',
    fontSize: 32,
  },
  leftButton: {
    width: 45,
    height: 45,
    marginLeft: 5,
  },
});