import { StyleSheet, Platform, Dimensions, StatusBar } from 'react-native';

export default StyleSheet.create({
  mainView: {
    flex: 1,
  },
  header: {
    height: 220,
    backgroundColor: '#0f334c',
  },
  headerBackground: {
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
});
