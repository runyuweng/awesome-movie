import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  ListView,
  NavigatorIOS,
  ActivityIndicator,
  ScrollView
} from 'react-native';

export default class MovieDetail extends Component {
  constructor(props){
    super(props);
    this.state = {
      loading:true,
      data:{}
    }
  }
  componentDidMount(){
    fetch(`https://api.douban.com/v2/movie/subject/${this.props.route.id}`, {
        method: "GET"
    })
    .then((res)=>res.json())
    .then((data)=>{
      this.setState({
        loading:false,
        data: data
      })
      console.log(data);
    })
  }
  render(){
    const {loading, data} = this.state;

    const castsList = (data.casts?data.casts:[]).map((value,i)=><View style={styles.castItem} key={i}>
        <Image style={styles.castImage} source={{uri:value.avatars?value.avatars.large:''}}/>
        <Text style={styles.castName}>{value.name?value.name:''}</Text>
      </View>)
    console.log('castsList',castsList);

    return (
      <View>
        {loading?
          <View style={styles.loading}>
            <ActivityIndicator/>
          </View>:
          <ScrollView style={{backgroundColor:'#E9EAED'}}>
            <View style={styles.content}>
              <View style={styles.banner}>
              <Image style={styles.bg} source={require('../assets/img/banner.png')}>
                <View style={styles.opacity}>
                  <Image
                    style={styles.img}
                    source={{uri:data.images?data.images.large:''}}
                  />
                </View>
              </Image>
            </View>

            <View style={styles.section}>
              <Text style={styles.sectionName}>基本信息</Text>
              <Text style={styles.sectionItem}>原名：{data.original_title?data.original_title:''}</Text>
              <Text style={styles.sectionItem}>国家：{data.countries?data.countries.map((value)=>value+' '):''}</Text>
              <Text style={styles.sectionItem}>导演：{data.directors?data.directors.map((value)=>value.name+' '):''}</Text>
              <Text style={styles.sectionItem}>评分：{data.rating?data.rating.average:''}</Text>
              <Text style={styles.sectionItem}>年份：{data.year?data.year:''}</Text>

            </View>

            <View style={styles.section}>
              <Text style={styles.sectionName}>主演</Text>
              <ScrollView horizontal={true}>
                <View style={styles.castsList}>
                {castsList}
              </View>
              </ScrollView>
            </View>

            <View style={styles.section}>
              <Text style={styles.sectionName}>内容简介</Text>
              <Text style={styles.sectionBlock}>{data.summary}</Text>
            </View>

          </View>
        </ScrollView>}
      </View>


    )
  }
}

const styles = StyleSheet.create({
  loading:{
    height:'100%',
    alignItems:'center',
    justifyContent:'center',
    backgroundColor:'#E9EAED',
  },
  content:{
    height:'100%',
    paddingTop:65,
    paddingBottom:65,
    flexDirection:'column',
    alignItems:'center',
    backgroundColor:'#E9EAED',
  },
  banner:{
    width:'100%',
    height:220,
    backgroundColor:'rgba(0, 0, 0, 0.9)',
    alignItems:'center',
    justifyContent:'center'
  },
  section:{
    overflow:'hidden',
    borderRadius:10,
    marginTop:10,
    width:'100%',
    backgroundColor:'white',
    flexDirection:'column',
  },
  sectionName:{
    padding:10,
    fontWeight:'900',
    backgroundColor:'#F6F7F8',
  },
  sectionItem:{
    fontSize:12,
    color:'grey',
    paddingLeft:20,
    paddingRight:20,
    paddingTop:2,
    paddingBottom:2,
    fontWeight:'bold',
    fontFamily:'苹方-简',
  },
  sectionBlock:{
    fontSize:12,
    color:'grey',
    paddingLeft:20,
    paddingRight:20,
    paddingTop:10,
    paddingBottom:10,
    fontWeight:'bold',
    fontFamily:'苹方-简',
  },
  castsList:{
    flexDirection:'row'
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
  opacity:{
    width:'100%',
    height:'100%',
    backgroundColor:'rgba(0, 0, 0, 0.2)',
    justifyContent:'center',
    alignItems:'center'
  },
  img:{
    width:138,
    height:192,
  }
})
