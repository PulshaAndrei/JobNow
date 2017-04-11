import { StyleSheet, Platform, Dimensions } from 'react-native';

export default StyleSheet.create({
  sideMenu: {
    paddingTop: 20,
    flex: 1,
    backgroundColor: 'white',
  },
  closeButton: {
    marginTop: 20,
    marginLeft: 10,
    padding: 10,
    width: 50,
  },
  sideMenuButtons: {
    borderBottomWidth: 1,
    borderColor: "#f3f3f4",
  },
  sideMenuButton: {
    height: 60,
    borderTopWidth: 1,
    borderColor: "#f3f3f4",
    justifyContent: 'center',
    paddingLeft: 20,
  },
  sideMenuButtonSelected: {
    backgroundColor: "#f8f8f8",
  },
  menuButtonText: {
    fontSize: 20,
    fontFamily: 'AvenirNextCyr-Light',
    color: "#1d1d26",
  }
});
