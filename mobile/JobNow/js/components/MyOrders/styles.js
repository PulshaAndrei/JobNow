import { StyleSheet, Platform, Dimensions, StatusBar } from 'react-native';

export default StyleSheet.create({
  mainView: {
    flex: 1,
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
    width: 60,
    height: 60,
    //flex: 0.2,
    //aspectRatio: 1,
    borderRadius: 30,
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
    textAlignVertical: 'center',
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
  selectDateTime: {
    paddingHorizontal: 20,
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderColor: "#e8e8e9",
  },
  inputItemTitleText: {
    color: '#8e8e92',
    fontFamily: 'AvenirNextCyr-Regular',
    fontSize: 16,
  },
  allDay: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  dataRangeView: {
    marginTop: 15,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  dateRange: {
    flexDirection: 'row',
  },
  selectDateText: {
    color: 'black',
    fontFamily: 'AvenirNextCyr-Regular',
    fontSize: 16,
  },
  selectDateButton: {
    marginLeft: 25,
  },
  inputItem: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderColor: "#e8e8e9",
    height: 60,
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  inputItemTextInputView: {
    flex: 3,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  inputItemTextInput: {
    flex: 1,
    alignSelf: 'stretch',
    textAlign: 'right',
    color: 'black',
    fontFamily: 'AvenirNextCyr-Regular',
    fontSize: 16,
    paddingBottom: (Platform.OS === 'ios') ? 0 : 0,
  },
  myProposalView: {
    backgroundColor: '#13bcbf',
    borderRadius: 25,
    padding: 5,
    paddingHorizontal: 10,
    marginBottom: 5,
    //width: 30,
    height: 25,
    alignItems: 'center',
    justifyContent: 'center',
  },
  proposalAvatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 15,
  },
  proposalInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    flex: 1,
  },
});
