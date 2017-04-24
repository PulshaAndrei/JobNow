import { StyleSheet, Platform, Dimensions, StatusBar } from 'react-native';

//import { WHITE, BRIGHTSKYBLUE, AQUAMARINE, GREENBLUE, DARKSEAGREEN, DUSKBLUE, COLOR_BLUE, COLOR_GREEN, COLOR_ORANGE, COLOR_BLUE_LIGHT_BORDER } from '../../styles/variables';

export default StyleSheet.create({
  header: {
    backgroundColor: 'transparent',
    top: 20,
    left: 0,
    right: 0,
    height: 80,
    position: 'absolute',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 15,
  },
  headerTitle: {
    color: 'white',
    fontFamily: 'AvenirNextCyr-Thin',
    fontSize: 32,
  },
  leftButton: {
    width: 45,
    height: 45,
    marginLeft: 5,
  },
  headerWithMenu: {
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
