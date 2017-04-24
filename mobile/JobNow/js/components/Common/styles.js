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
  inputItem: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderColor: "#e8e8e9",
    height: 60,
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  inputItemTitleText: {
    color: '#8e8e92',
    fontFamily: 'AvenirNextCyr-Regular',
    fontSize: 16,
  },
  inputItemTextInputView: {
    flex: 3,
  },
  inputItemTextInput: {
    alignSelf: 'stretch',
    textAlign: 'right',
    color: 'black',
    fontFamily: 'AvenirNextCyr-Regular',
    fontSize: 16,
    paddingBottom: (Platform.OS === 'ios') ? 0 : 5,
  },
  inputItemSwitchView: {
    alignItems: 'flex-end',
    flex: 1,
  },
});
