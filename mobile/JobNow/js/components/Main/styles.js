import { StyleSheet, Platform, Dimensions, StatusBar } from 'react-native';

export default StyleSheet.create({
  mainView: {
    flex: 1,
  },
  mainHeader: {
    height: 200,
    paddingTop: StatusBar.currentHeight,
    backgroundColor: '#0f334c',
  },
  mainHeaderBackground: {
    flex: 1,
    resizeMode: 'cover',
    width: Dimensions.get('window').width,
    //height: 200,
  },
  headerButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  menuButton: {
    margin: 20,
    width: 30,
  },
  headerTitles: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerTitle: {
    color: 'white',
    fontSize: 18,
    marginBottom: 10,
  },
  headerSubTitle: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 30,
  },
});
