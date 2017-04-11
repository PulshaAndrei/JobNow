import { StyleSheet, Platform, Dimensions } from 'react-native';

//import { WHITE, BRIGHTSKYBLUE, AQUAMARINE, GREENBLUE, DARKSEAGREEN, DUSKBLUE, COLOR_BLUE, COLOR_GREEN, COLOR_ORANGE, COLOR_BLUE_LIGHT_BORDER } from '../../styles/variables';

export default StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'flex-start',
    backgroundColor: 'transparent',
  },
  descriptionTitle: {
    color: 'white',
    fontFamily: 'AvenirNextCyr-Regular',
    fontSize: 16,
    paddingTop: 10,
    paddingBottom: 20,
    paddingHorizontal: 20,
  },
});
