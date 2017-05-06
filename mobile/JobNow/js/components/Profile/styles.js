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
    alignItems: 'center',
    justifyContent: 'space-around',
    flex: 1,
  },
  profileHeaderAvatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
  },
  headerName: {
    color: 'white',
    fontFamily: 'AvenirNextCyr-Light',
    fontSize: 32,
    marginBottom: 10,
  },
  inputItem: {
    borderBottomWidth: 1,
    borderColor: "#e8e8e9",
    paddingVertical: 18,
    paddingHorizontal: 20,
  },
  inputItemInfoView: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  itemButtonsView: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: -10,
  },
  itemButton: {
    flex: 1,
    height: 40,
    borderRadius: 20,
    marginHorizontal: 10,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fcab53',
  },
  itemButtonText: {
    color: 'white',
    fontSize: 15,
    fontFamily: 'AvenirNextCyr-Regular',
  },
  inputItemTitleText: {
    color: '#8e8e92',
    fontFamily: 'AvenirNextCyr-Regular',
    fontSize: 16,
  },
  jobItemTextTitle: {
    color: 'black',
    fontSize: 20,
    fontFamily: 'AvenirNextCyr-Regular',
    marginBottom: 5,
    flex: 8,
    alignSelf: 'stretch',
  },
  starRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  starText: {
    color: '#8e8e92',
    fontSize: 14,
    fontFamily: 'AvenirNextCyr-Light',
    marginLeft: 10,
    marginTop: 2,
  },
  reviewsTitle: {
    color: 'black',
    fontFamily: 'AvenirNextCyr-Regular',
    fontSize: 20,
    marginBottom: 5,
  },
  reviewsInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  infoAvatars: {
    flexDirection: 'row',
  },
  jobItemAvatar: {
    width: 30,
    height: 30,
    borderRadius:15,
    marginRight: 5,
  },
  reviewAvatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 15,
  },
  reviewHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
  },
  createReviewButton: {
    position: 'absolute',
    top: 55,
    right: 25,
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#13bdbf',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 1,
  },
  rateView: {
    marginTop: 15,
  },
});
