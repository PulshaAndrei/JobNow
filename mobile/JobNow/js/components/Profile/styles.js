import { StyleSheet, Platform, Dimensions, StatusBar } from 'react-native';

export default StyleSheet.create({
  profileView: {
    flex: 1,
  },
  profileHeader: {
    height: 290,
    backgroundColor: '#0f334c',
  },
  profileHeaderBackground: {
    paddingTop: 20,
    backgroundColor: 'transparent',
    flex: 1,
    resizeMode: 'cover',
    width: Dimensions.get('window').width,
  },
  headerButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  menuButton: {
    margin: 20,
    width: 30,
  },
  headerInfo: {
    alignItems: 'center',
    justifyContent: 'space-around',
    flex: 1,
  },
  profileHeaderAvatar: {
    width: 110,
    height: 110,
    borderRadius: 120,
  },
  headerName: {
    color: 'white',
    fontFamily: 'AvenirNextCyr-Light',
    fontSize: 32,
    marginBottom: 10,
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
