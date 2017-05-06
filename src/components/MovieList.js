import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  ListView,
  Image,
  TouchableHighlight
} from 'react-native';
import MovieDetail from './MovieDetail';

export default class MovieList extends Component {
  constructor(props) {
    super(props);
    var ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    this.state = {
      dataSource: ds.cloneWithRows(
        []
      ),
    };
  }

  componentDidMount(){
    fetch(`https://api.douban.com/v2/${this.props.route.url}`, {
        method: "GET"
    })
    .then((res)=>res.json())
    .then((data)=>{
      var ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
      this.setState({
        dataSource: ds.cloneWithRows(data.subjects)
      })
    })
  }
  render() {
    return (
      <ListView
      enableEmptySections={true}
      style={styles.list}
      dataSource={this.state.dataSource}
      renderRow={(rowData) => <TouchableHighlight
        underlayColor='#E9EAED'
        activeOpacity={0.9}
        onPress={()=>{
          this.props.navigator.push({
            component: MovieDetail,
            title: rowData.title,
            id: rowData.id
          })
        }}>
        <View style={styles.item}>
          <Text style={styles.title}>{rowData.title?rowData.title:''}</Text>
          <View style={styles.content}>
            <View style={styles.img}>
              <Image
                style={styles.icon}
                source={{uri:rowData.images.large?rowData.images.large:''}}
              />
            </View>
            <View style={styles.word}>
              <Text style={styles.wordItem}>导演：{rowData.directors?rowData.directors.map((value)=>{return value.name+'  '}):''}</Text>
              <Text style={styles.wordItem}>演员：{rowData.casts?rowData.casts.map((value)=>{return value.name+'  '}):''}</Text>
              <Text style={styles.wordItem}>评分：{rowData.rating?rowData.rating.average+'分':''}</Text>
              <Text style={styles.wordItem}>分类：{rowData.genres?rowData.genres.map((value)=>{return value+'  '}):''}</Text>
            </View>
          </View>
        </View>
      </TouchableHighlight>}
    />
    );
  }
}

const styles = StyleSheet.create({
  list:{
    backgroundColor:'#E9EAED',
    padding:10,
    width:'100%',
  },
  item:{
    borderRadius: 5,
    overflow:'hidden',
    flex:1,
    flexDirection: 'column',
    alignItems:'center',
    marginBottom:10,
    backgroundColor:'#FFF',
  },
  title:{
    fontWeight: '900',
    width:'100%',
    textAlign:'center',
    backgroundColor:'#F6F7F8',
    height:30,
    lineHeight:30,
  },
  content:{
    padding:10,
    flexDirection: 'row',
  },
  img: {
    flex: 1,
    backgroundColor:'#fff',
  },
  icon:{
    width:'100%',
    height:160,
  },
  word: {
    flex: 2,
    paddingLeft:10,
    alignItems:'flex-start',
  },
  wordItem: {
    fontFamily:'苹方-简',
    fontSize:12,
    marginBottom:5,
  }
});
