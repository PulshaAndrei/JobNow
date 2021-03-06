import { StyleSheet, Platform, Dimensions } from 'react-native';

//import { WHITE, BRIGHTSKYBLUE, AQUAMARINE, GREENBLUE, DARKSEAGREEN, DUSKBLUE, COLOR_BLUE, COLOR_GREEN, COLOR_ORANGE, COLOR_BLUE_LIGHT_BORDER } from '../../styles/variables';

export default StyleSheet.create({
  signupView: {
    paddingTop: (Platform.OS === 'ios') ? 80 : 100,
    flex: 1,
  },
  signupScrollView: {
    marginTop: (Platform.OS === 'ios') ? 80 : 100,
  },
  signupBackgroundView: {
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    position: 'absolute',
    backgroundColor: '#01162b',
    opacity: 0.86,
  },
  signupViewImage: {
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
    position: 'absolute',
  },
  nextButton: {
    backgroundColor: '#13bdbf',
    borderRadius: 15,
    height: 50,
    alignSelf: 'stretch',
    marginHorizontal: 70,
    marginTop: 30,
    //marginBottom: 15,
    alignItems: 'center',
    justifyContent: 'center',
  },
  nextButtonText: {
    color: 'white',
    fontFamily: 'AvenirNextCyr-Light',
    fontSize: 16,
  },
  input: {
    flexDirection: 'row',
    marginBottom: 15,
    paddingHorizontal: 25,
    borderColor: '#364756',
    borderBottomWidth: 1,
  },
  textInputView: {
    paddingLeft: 15,
    flex: 1,
  },
  textInput: {
    height: 40,
    alignSelf: 'stretch',
    color: 'white',
    fontFamily: 'AvenirNextCyr-Regular',
    fontSize: 18,
    paddingBottom: (Platform.OS === 'ios') ? 7 : 12,
  },
  textInputDisabled: {
    height: 40,
    alignSelf: 'stretch',
    color: 'white',
    fontFamily: 'AvenirNextCyr-Regular',
    fontSize: 18,
    paddingTop: 5,
  },
});
