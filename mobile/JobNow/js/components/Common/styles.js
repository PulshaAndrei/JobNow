import { StyleSheet, Platform, Dimensions } from 'react-native';

//import { WHITE, BRIGHTSKYBLUE, AQUAMARINE, GREENBLUE, DARKSEAGREEN, DUSKBLUE, COLOR_BLUE, COLOR_GREEN, COLOR_ORANGE, COLOR_BLUE_LIGHT_BORDER } from '../../styles/variables';

export default StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'flex-start',
    backgroundColor: 'transparent',
  },
  descriptionTitle: {
    color: 'white',
    fontFamily: 'AvenirNextCyr-Regular',
    fontSize: 16,
    paddingTop: 10,
    paddingBottom: 20,
    paddingHorizontal: 20,
  },
  inputItem: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderColor: "#e8e8e9",
    height: 60,
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  inputDescriptionItem: {
    borderBottomWidth: 1,
    borderColor: "#e8e8e9",
    //height: 120,
    paddingHorizontal: 20,
    paddingVertical: 15,
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
  selectDateText: {
    color: 'black',
    fontFamily: 'AvenirNextCyr-Regular',
    fontSize: 16,
    textAlign: 'right',
  },
  jobItemAvatar: {
    width: 50,
    height: 50,
    borderRadius:25,
    marginRight: 15,
  },
  jobItemTextTitle: {
    color: 'black',
    fontSize: 20,
    fontFamily: 'AvenirNextCyr-Regular',
    marginBottom: 5,
    flex: 8,
    alignSelf: 'stretch',
  },
  profileItem: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderColor: "#e8e8e9",
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 15,
  },
  starRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  starText: {
    color: '#c1c1c1',
    fontSize: 14,
    fontFamily: 'AvenirNextCyr-Light',
    marginLeft: 10,
    marginTop: 2,
  },
  applyButton: {
    position: 'absolute',
    top: 190,
    right: 25,
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#13bdbf',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 1,
  },
});
