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
    borderRadius: 55,
  },
  headerName: {
    color: 'white',
    fontFamily: 'AvenirNextCyr-Light',
    fontSize: 32,
    marginBottom: 10,
  },
});
