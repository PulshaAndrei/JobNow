import { StyleSheet, Platform, Dimensions } from 'react-native';

//import { WHITE, BRIGHTSKYBLUE, AQUAMARINE, GREENBLUE, DARKSEAGREEN, DUSKBLUE, COLOR_BLUE, COLOR_GREEN, COLOR_ORANGE, COLOR_BLUE_LIGHT_BORDER } from '../../styles/variables';

export default StyleSheet.create({
  loginView: {
    //flex: 1,
    justifyContent: 'space-between',
    height: Dimensions.get('window').height,
  },
  loginViewImage: {
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
    position: 'absolute',
  },
  loginBackgroundView: {
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    position: 'absolute',
    backgroundColor: '#01162b',
    opacity: 0.86,
  },
  brandTitleText: {
    color: 'white',
    textAlign: 'center',
    fontSize: 64,
    fontFamily: 'AvenirNextCyr-Thin',
  },
  loginButton: {
    backgroundColor: '#13bdbf',
    borderRadius: 15,
    height: 50,
    alignSelf: 'stretch',
    marginHorizontal: 70,
    marginBottom: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  loginButtonText: {
    color: 'white',
    fontFamily: 'AvenirNextCyr-Light',
    fontSize: 16,
  },
  signupButton: {
    flexDirection: 'row',
    alignSelf: 'stretch',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 40,
  },
  signupButtonLabel: {
    color: '#a6a9ac',
    marginRight: 10,
    fontFamily: 'AvenirNextCyr-Light',
    fontSize: 14,
  },
  forgotButtonText: {
    color: 'white',
    textAlign: 'center',
    fontFamily: 'AvenirNextCyr-Light',
    fontSize: 14,
  },
  signupButtonRegistration: {
    color: 'white',
    fontFamily: 'AvenirNextCyr-Medium',
    fontSize: 14,
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
});
