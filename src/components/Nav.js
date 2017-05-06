import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  NavigatorIOS
} from 'react-native';
import MovieList from './MovieList';

export default class Nav extends Component {
  constructor(props){
    super(props);
  }
  render(){
    return (
      <NavigatorIOS
        barTintColor='#23527C'
        titleTextColor='white'
        initialRoute={{
          component: MovieList,
          title: this.props.title,
          url: this.props.url
        }}
        style={{flex: 1}}
      />
    )
  }
}
