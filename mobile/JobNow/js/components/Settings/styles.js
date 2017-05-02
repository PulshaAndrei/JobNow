import { StyleSheet, Platform, Dimensions, StatusBar } from 'react-native';

export default StyleSheet.create({
  settingsView: {
    flex: 1,
  },
  settingsHeader: {
    height: 220,
    backgroundColor: '#0f334c',
  },
  settingsHeaderBackground: {
    paddingTop: Platform.Version < 21 ? 0 : 20,
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
    alignItems: 'flex-start',
    justifyContent: 'space-around',
    flex: 1,
  },
  headerName: {
    color: 'white',
    fontFamily: 'AvenirNextCyr-Light',
    fontSize: 32,
    marginBottom: 10,
    marginHorizontal: 30,
  },
  settingsButton: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    height: 60,
    borderBottomWidth: 1,
    borderColor: '#f3f3f4',
  },
  settingsButtonTitle: {
    color: '#1d1d26',
    fontFamily: 'AvenirNextCyr-Light',
    fontSize: 16,
  },
});
