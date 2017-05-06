import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  ListView,
  NavigatorIOS
} from 'react-native';

export default class MovieDetail extends Component {
  constructor(props){
    super(props);
    this.state = {
      data:{}
    }
  }
  componentDidMount(){
    fetch(`https://api.douban.com/v2/movie/subject/${this.props.route.id}`, {
        method: "GET"
    })
    .then((res)=>res.json())
    .then((data)=>{
      this.setState({data: data})
      console.log(data);
    })
  }
  render(){
    const {data} = this.state;

    const castsList = (data.casts?data.casts:[]).map((value,i)=><View style={styles.castItem} key={i}>
        <Image style={styles.castImage} source={{uri:value.avatars?value.avatars.large:''}}/>
        <Text style={styles.castName}>{value.name?value.name:''}</Text>
      </View>)
    console.log('castsList',castsList);

    return (
      <View style={styles.content}>
        <View style={styles.banner}>
          <Image style={styles.bg} source={require('../assets/img/banner.png')}>
          <Image
            style={styles.img}
            source={{uri:data.images?data.images.large:''}}
          />
          </Image>
        </View>

        <View style={styles.castsList}>
          {castsList}
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  content:{
    marginTop:65,
    flexDirection:'column',
    alignItems:'center',
    backgroundColor:'#EEEEEE',
  },
  banner:{
    width:'100%',
    height:220,
    backgroundColor:'rgba(0, 0, 0, 0.9)',
    alignItems:'center',
    justifyContent:'center'
  },
  castsList:{
    marginTop:10,
    width:'100%',
    backgroundColor:'white',
    flexDirection:'row',
  },
  castItem:{
    margin:10
  },
  castName:{
    color:'grey',
    marginTop:10,
    width:70,
    textAlign:'center',
    fontSize:10,
    fontWeight:'bold',
    fontFamily:'苹方-简',
  },
  castImage:{
    width:70,
    height:80
  },
  bg:{
    height:220,
    width:'100%',
    alignItems:'center',
    justifyContent:'center',
  },
  img:{
    width:138,
    height:192,
  }
})
