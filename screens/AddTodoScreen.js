/*import React from 'react';
import { StyleSheet, View, TouchableOpacity, TextInput, Text} from 'react-native';

import { NavigationActions, Navigation, SafeAreaView } from 'react-navigation';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Header from '../components/Header.js'
require("firebase/firestore");



export default class AddContact extends React.Component {


  state={
    "celebId":"",
    "name":"",
    "dob":"",
    "havePic":"",
    "twitter":"",
    "price":0,
    "age":0
  }

  pushData(){
    const data = this.state;

    if (data.name && data.dob && data.age && data.celebId) {
      const ref = firebase.database().ref(`Users/${data.celebId}`);

      ref.set(
        data
      ).then(() => {
        alert('Successfully added!')
      })
    } else {
      alert('Fill out all required fields!')
    }

  }


  render() {
    return(
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.container}>
          <Header title='AddContact' navigation={this.props.navigation}/>
          <View style={styles.body}>
            <TextInput style={styles.input}
              placeholder='Name'
              height={40}
              onChangeText={(text) => this.setState({name: text})}
            />
            <TextInput style={styles.input}
              placeholder='Twitter'
              height={40}

              onChangeText={(text) => this.setState({twitter: text})}
            />
            <TextInput style={styles.input}
              placeholder='Job'
              onChangeText={(text) => this.setState({job: text})}
            />
            <TextInput style={styles.input}
              placeholder='DoB'
              keyboardType='numeric'
              onChangeText={(text) => this.setState({dob: text})}
            />
            <TextInput style={styles.input}
              placeholder='Age'
              keyboardType='numeric'
              onChangeText={(text) => this.setState({age: text})}
            />
            <TextInput style={styles.input}
              placeholder='Celeb ID'
              keyboardType='numeric'
              onChangeText={(text) => this.setState({celebId: text})}
            />
            <TouchableOpacity
              onPress={() => this.pushData()}>
              <Text> Submit </Text>

            </TouchableOpacity>
          </View>
        </View>
      </SafeAreaView>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#EC644B',
  },
  body: {
    flex:1,
    justifyContent: 'center',
    alignItems: 'stretch'
  },
  input: {},
  safeArea:{
    flex:1,
    backgroundColor:'white'
  },
});
*/ 

//import liraries
import React, { Component } from 'react';
import { StyleSheet, View, TouchableOpacity, TextInput, Text, ActivityIndicator} from 'react-native';

import { NavigationActions, Navigation, SafeAreaView } from 'react-navigation';
import { Icon } from 'expo';
const firebase = require("firebase");

// create a component
class AddTodoScreen extends Component {

  /* static navigationOptions = ({ navigation }) => {

    return ({
        
        header: (
            <View style={styles.containerHeader}>
            
    
                 <TouchableOpacity onPress = {() => navigation.navigate("Todo")}>
                    <Icon.Ionicons name= "md-arrow-back" size={30} color= "blue"/>
                </TouchableOpacity>
        
                <Text style={styles.title}>
                    Add Task
                </Text>     
            </View>
        )
      };
  };  */

    constructor(props){ 

      super(props)
      
      
    }

    state={
      "Task": "",
      load: false 
       
    }

    static navigationOptions = ({ navigation }) => {

      return {
          
          header: (
              <View style={styles.containerHeader}>
                 <TouchableOpacity onPress = {() => { 
                      
                      navigation.navigate("Todo")
                     

                      }}
                   >
                    <Icon.Ionicons name= "md-arrow-back" size={30} color= "blue"/>
                </TouchableOpacity>
        
                <Text style={styles.title}>
                    Add Task
                </Text>     
                <Text style={styles.title}>
                   {"      "}
                </Text>
              </View>
          )
      };
    };

  AddTask = () => { 

    const NewTask = { 

      Task: (this.state.Task) 

    }
    const db = firebase.firestore()
    
    this.setState({load: true})

    
    db.collection("Todo").add(
      NewTask
    )
    .then(() => {
        console.log("Document successfully written!");
        this.setState({load: false})
        this.props.navigation.navigate('Todo')
    })
    .catch(function(error) {
        console.error("Error writing document: ", error);
    });
    

  }

  render() {

    const {load} = this.state

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

            <View style = {styles.body}>       
              <TextInput style={styles.input}
                  placeholder='Do the chores'
                  height={40} 
                  onChangeText={(text) => this.setState({Task: text})}
                />
              <TouchableOpacity onPress = {() => this.AddTask()}> 
                <Icon.Ionicons 
                  name = "ios-send"
                  size={60}
                  style={{marginBottom: -20}}
                  color='forestgreen'
                />
              </TouchableOpacity>
            </View>  
          }
        
      </View> 
    </SafeAreaView>
    );
  }
}



// define your styles
const styles = StyleSheet.create({

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
  },
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  body: {
    flex:1,
    justifyContent: 'space-around',
    alignItems: 'center'
  },
  input: {},
  safeArea:{
    flex:1,
    backgroundColor:'white'
  },
});

//make this component available to the app
export default AddTodoScreen;
