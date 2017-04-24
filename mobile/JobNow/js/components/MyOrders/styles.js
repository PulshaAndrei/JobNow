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
  jobItemView: {
    borderLeftWidth: 3,
    borderBottomWidth: 1,
    borderBottomColor: '#e8e8e9',
    paddingHorizontal: 10,
    paddingVertical: 10,
    flexDirection: 'row',
  },
  jobItemAvatar: {
    flex: 0.2,
    aspectRatio: 1,
    borderRadius: (Dimensions.get('window').width - 100) * 0.1,
    marginRight: 10,
  },
  jobItemInfo: {
    flex: 1,
    paddingVertical: 5,
  },
  jobItemTextTitle: {
    color: 'black',
    fontSize: 16,
    fontFamily: 'AvenirNextCyr-Medium',
    marginBottom: 5,
    flex: 8,
    alignSelf: 'stretch',
  },
  jobItemPriceTitle: {
    textAlign: 'right',
    flex: 4,
    color: 'black',
    fontSize: 16,
    fontFamily: 'AvenirNextCyr-Bold',
  },
  jobItemTextAddress: {
    color: '#a8a8aa',
    fontSize: 14,
    fontFamily: 'AvenirNextCyr-Regular',
  },
  jobItemTextDistance: {
    color: '#8e8e92',
    fontSize: 14,
    fontFamily: 'AvenirNextCyr-Regular',
  },
  jobItemTextRow: {
    justifyContent: 'space-between',
    flexDirection: 'row',
    flex: 1,
  },
  createButton: {
    position: 'absolute',
    top: 195,
    right: 25,
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#13bdbf',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 1,
  },
});
