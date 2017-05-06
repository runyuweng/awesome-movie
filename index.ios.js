/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import Nav from './src/components/Nav';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  TabBarIOS
} from 'react-native';
import icons from './src/constants/constants';

export default class AwesomeMovie extends Component {

  constructor(props){
    super(props);
    this.state = {
      currentPart:'1'
    }
  }

  _onPressPart1(){
    this.setState({currentPart:'1'});
  }
  _onPressPart2(){
    this.setState({currentPart:'2'});
  }


  render() {
    const {currentPart} = this.state;
    return (
      <TabBarIOS
       unselectedTintColor="grey">
       <TabBarIOS.Item
         title="热映"
         icon={{uri: icons.newest}}
         selected={currentPart=='1'?true:false}
         onPress={()=>this._onPressPart1()}>
         <Nav url="/movie/in_theaters" title="热映电影-北京"></Nav>
       </TabBarIOS.Item>
      <TabBarIOS.Item
        title="最佳"
        icon={{uri: icons.best}}
        selected={currentPart=='2'?true:false}
        onPress={()=>this._onPressPart2()}>
        <Nav url="/movie/coming_soon" title="最佳电影"></Nav>
      </TabBarIOS.Item>

    </TabBarIOS>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F8F8F8',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    marginTop: 30,
    marginBottom: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});

AppRegistry.registerComponent('AwesomeMovie', () => AwesomeMovie);
