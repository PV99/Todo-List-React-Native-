//import liraries
import React, { Component } from 'react';
import { View, Text, StyleSheet, FlatList, ActivityIndicator, TouchableOpacity } from 'react-native';
const uuidv1 = require('uuid/v1');
const firebase = require("firebase");
// Required for side-effects

import {ListItem} from 'react-native-elements';
import {SafeAreaView} from 'react-navigation';
import { Icon } from 'expo';
import Header from "../components/Header";


class Todo extends Component {

    constructor(props){ 

        super(props)
      
        
    }

    checkPlatform(){
        if (Platform.OS == 'ios'){
          alert('IOS')
        } else {
          alert('And')
        }
      }

    state = { 

        Todo: [

            {
                Task: "Do your chores"
              },
              {
                Task: "Say hi" 
              },
        
        ],  

        load : true,  
        refresh: false
    }

    _keyExtractor = (item, index) => uuidv1(); 

    _renderItem = ({item}) => {
        const news = [item, "Todo"]
        return (
        <ListItem
            onPress={() => this.props.navigation.navigate('Info', {news})}
            title={item.object.Task}
            style = {styles.container}
          //onPress={() => this.props.navigation.navigate('Screen2', {item})}
          
          //subtitle={`Age: ${item.age}`}
          //subtitleStyle={{fontStyle:'italic', fontWeight:'300'}}
          //leftIcon = {item.havePic == 0 && <Icon name='person' size = {30} color='red'/>}
          
          //avatar = {item.havePic == 1 && <Image style={{width:30, height:30, borderRadius: 15}} source={{uri: 'https://images.vice.com/vice/images/articles/meta/2016/11/03/kazakhstan-borat-1478184247.jpg?crop=1xw%3A0.8562062937062938xh%3Bcenter%2Ccenter&resize=1050%3A*&output-quality=55'}}/>}
        />
    )} 

   

    componentWillMount = () => {

        
        const db = firebase.firestore()
        
        
         db.collection("Todo").get().then(querySnapshot => {
            var TodoList = [] 
            
            querySnapshot.forEach(function(doc) {

                TodoList.push({object: doc.data(), objectId: doc.id})
                
            })
            
            return TodoList

        }).then((TodoList) => { 
            const TodoList2 = TodoList.map(item => {
                item.key = uuidv1()
                return item 
            })
            this.setState({Todo: TodoList2, load: false})
            
        }).catch(error => { 

            console.log(error); 
        })    

    }

    changeRefresh = () => this.setState({refresh: !(this.state.refresh)})
    Refresh = () => { 

        const db = firebase.firestore()

        this.setState({load: true})
        
        db.collection("Todo").get().then(querySnapshot => {
           var TodoList = [] 
           
           querySnapshot.forEach(function(doc) {
               TodoList.push({object: doc.data(), objectId: doc.id}) 
                
           })
           
           return TodoList

       }).then((TodoList) => { 
           const TodoList2 = TodoList.map(item => {
               item.key = uuidv1()
               return item
           })
           this.setState({Todo: TodoList2, load: false})
           
           console.log(this.state.refresh)

        }).catch(error => { 

            console.log(error); 
        })    

         

    }

    static navigationOptions = ({ navigation }) => {
  
         

        return {
            
            header: (
                <View style={styles.containerHeader}>
                
        
                     <TouchableOpacity>
                        <Icon.Ionicons name= "ios-menu" size={30} color= "blue"/>
                    </TouchableOpacity>
            
                    <Text style={styles.title}>
                        To Do
                    </Text>
            
            
                    <TouchableOpacity onPress={() => {navigation.navigate('Add')}}>
                        <Icon.Ionicons name= "ios-add" size= {30} color= "blue"/>
                    </TouchableOpacity>

                   
        
                </View>
            )
        };
      };

    

    render() {
 
        const {Todo, load, refresh} = this.state 
        

        
    
        return (
        <SafeAreaView style={styles.safeArea}>
            <View style={styles.container}>   

                {load ? 
                    <ActivityIndicator 
                        style = {styles.container}
                        animating = {load} 
                        load size="large" 
                        color="#0000ff"
                    />
                
                : 

                    <FlatList
                        data={Todo}
                        renderItem= {this._renderItem}
                        keyExtractor={this._keyExtractor}
                        navigation={this.props.navigation}
                        refreshing = {refresh}
                        onRefresh = {this.Refresh}
                        
                    />
                
                }   
            </View>
        </SafeAreaView>
        );
    }
}

// define your styles
const styles = StyleSheet.create({

   

    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'flex-start',
        backgroundColor: '#fff',
        flexDirection: 'row',
    },

     

    safeArea:{
        flex:1,
        backgroundColor:'white'
    }, 

    containerHeader:{
        // flex:1,
        height:80,
        paddingTop:16,
        paddingBottom: 0,
        paddingHorizontal:12,
        flexDirection:'row',
        justifyContent:'space-between',
        alignItems:'center',
        backgroundColor:'white'
      },
      title:{
        color:'blue',
        fontSize:20,
        
      }
});

//make this component available to the app
export default Todo;
