import { StyleSheet, Platform, Dimensions } from 'react-native';

//import { WHITE, BRIGHTSKYBLUE, AQUAMARINE, GREENBLUE, DARKSEAGREEN, DUSKBLUE, COLOR_BLUE, COLOR_GREEN, COLOR_ORANGE, COLOR_BLUE_LIGHT_BORDER } from '../../styles/variables';

export default StyleSheet.create({
  loginView: {
    flex: 1,
    justifyContent: 'space-between',
  },
  loginViewImage: {
    top: -20,
    bottom: 0,
    left: 0,
    right: 0,
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height + 20,
    position: 'absolute',
  },
  loginBackgroundView: {
    top: -20,
    bottom: 0,
    left: 0,
    right: 0,
    position: 'absolute',
    backgroundColor: '#01162b',
    opacity: 0.8,
  },
  brandTitleText: {
    color: 'white',
    backgroundColor: 'transparent', //TODO
    textAlign: 'center',
    fontSize: 64,
    fontWeight: '200',
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
  },
  signupButton: {
    flexDirection: 'row',
    alignSelf: 'stretch',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 40,
  },
  signupButtonLabel: {
    color: 'white',
    marginRight: 10,
    backgroundColor: 'transparent', //TODO
  },
  forgotButtonText: {
    color: 'white',
    textAlign: 'center',
  },
  signupButtonRegistration: {
    color: 'white',
    fontWeight: 'bold',
  },
  textInputView: {
    borderColor: '#364756',
    borderBottomWidth: 1,
    marginBottom: 15,
    paddingHorizontal: 25,
  },
  textInput: {
    height: 40,
    color: 'white',
  },
});
