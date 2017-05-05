import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  ListView,
  Image
} from 'react-native';

export default class RecommendMovie extends Component {
  constructor(props) {
    super(props);
    var ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    this.state = {
      dataSource: ds.cloneWithRows(
        [
          {
            id:1,
            title:'haha',
            year:'a film',
            images:{
              large:''
            }
          },
          {
            id:2,
            title:'asd',
            year:'a !!',
            images:{
              large:''
            }
          },
          {
            id:3,
            title:'hah123a',
            year:'a - -',
            images:{
              large:''
            }
          }
        ]
      ),
    };
  }

  componentDidMount(){
    console.log(123123123);
    fetch("https://api.douban.com/v2/movie/in_theaters", {
        method: "GET"
    })
    .then((res)=>res.json())
    .then((data)=>{
      console.log(data);
      var ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
      this.setState({
        dataSource: ds.cloneWithRows(data.subjects)
      })
    })
  }
  render() {
    return (
      <ListView
      style={styles.list}
      dataSource={this.state.dataSource}
      renderRow={(rowData) => <View style={styles.item}>
        <View style={styles.img}>
          <Image
            style={styles.icon}
            source={{uri:rowData.images.large}}
          />
        </View>
        <View style={styles.word}>
          <Text>{rowData.title}</Text>
          <Text>{rowData.year}</Text>
        </View>
      </View>}
    />
    );
  }
}

const styles = StyleSheet.create({
  list:{
    backgroundColor:'#fff',
    padding:6,
    width:'100%',
  },
  item:{
    borderRadius: 5,
    overflow:'hidden',
    height:180,
    flex:1,
    flexDirection: 'row',
    marginBottom:6,
    borderColor:'#05A5D1',
    borderWidth:2,
    backgroundColor:'#E9F8FD',
  },
  img: {
    flex: 1,
    backgroundColor:'#fff',
  },
  icon:{
    width:'100%',
    height:'100%'
  },
  word: {
    flex: 2,
    alignItems:'center',
  }
});
