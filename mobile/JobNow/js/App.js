import React, { Component } from 'react';
import { View, StatusBar, Text } from 'react-native';
import { Scene, Router, Actions } from 'react-native-router-flux';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render = () => {
    return (
      <View style={{ flex: 1 }}>
        <Text>JobNow - start page</Text>
      </View>
    );
  }
}

export default App;
