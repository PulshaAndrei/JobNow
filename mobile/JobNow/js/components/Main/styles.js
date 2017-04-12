import { StyleSheet, Platform, Dimensions, StatusBar } from 'react-native';

export default StyleSheet.create({
  mainView: {
    flex: 1,
  },
  mainHeader: {
    height: 240,
    backgroundColor: '#0f334c',
  },
  mainHeaderBackground: {
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
  headerTitles: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerTitle: {
    color: 'white',
    fontFamily: 'AvenirNextCyr-Light',
    fontSize: 32,
    marginBottom: 10,
  },
  headerSubTitle: {
    color: 'white',
    fontSize: 24,
    fontFamily: 'AvenirNextCyr-Medium',
    marginBottom: 10,
  },
  monthControl: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: 20,
    marginVertical: 10,
    alignItems: 'center',
  },
  monthControlButton: {
    width: 30,
    alignItems: 'center',
  },
  monthControlText: {
    color: 'white',
    fontFamily: 'AvenirNextCyr-Light',
    fontSize: 16,
  },
  mainFilterHeaderBackground: {
    paddingTop: 20,
    backgroundColor: 'transparent',
    flex: 1,
    resizeMode: 'cover',
    width: Dimensions.get('window').width,
  },
  mainFilterHeader: {
    height: 220,
  },
  headerFilterTitle: {
    color: 'white',
    fontFamily: 'AvenirNextCyr-Light',
    fontSize: 32,
    marginBottom: 20,
    marginHorizontal: 30,
  },
  categoryRow: {
    flex: 1,
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderColor: '#f4f4f4',
  },
  category: {
    flex: 1,
    aspectRatio: 1,
    paddingHorizontal: 15,
    alignItems: 'center',
    justifyContent: 'center',
  },
  categoryLeft: {
    borderRightWidth: 1,
    borderColor: '#f4f4f4',
  },
  categoryTitle: {
    color: 'black',
    fontSize: 16,
    fontFamily: 'AvenirNextCyr-Regular',
    textAlign: 'center',
  },
  categoriesScrollView: {
    flex: 1,
  },
  categoryIcon: {
    color: '#a8a8aa',
  },
  categoryIconView: {
    marginBottom: 15,
    backgroundColor: '#f4f4f4',
    padding: 20,
    borderRadius: 200,
  },
});
