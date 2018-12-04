//import liraries
import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ActivityIndicator} from 'react-native';
import { Icon } from 'expo';
import { NavigationActions, Navigation, SafeAreaView} from 'react-navigation';
const firebase = require("firebase");

// create a component
 
class MyClass extends Component  {

    constructor(props){ 

        super(props) 

    }
    state = {
        load: false
    }
    static navigationOptions = ({ navigation }) => {

        const [ATask, done] = navigation.state.params.news

        var nav; 

        if (done !== "Finished") { 
            nav = "Todo"
        } 
        else { 
            nav = "Finished" 
        }

        return {
            
            header: (
                <View style={styles.containerHeader}>
                   <TouchableOpacity onPress = {() => { 
                        
                            navigation.navigate(nav)
                        
                        }}
                     >
                      <Icon.Ionicons name= "md-arrow-back" size={30} color= "blue"/>
                  </TouchableOpacity>
          
                  <Text style={styles.title}>
                      Task Info
                  </Text>     
                  <Text style={styles.title}>
                     {"      "}
                  </Text>
                </View>
            )
        };
      };

    PutinFinish = (Task) => { 

        const db = firebase.firestore()

        db.collection("Finished").add(Task.object)
        .then(() => {
            console.log("Document successfully written!");
            this.setState({load: false})
            this.props.navigation.navigate('Todo')
        })
        .catch(function(error) {
            console.error("Error writing document: ", error);
        });
        this.setState({load:false})
    }

    FinishTask = (Task) => { 



        const db = firebase.firestore()
        this.setState({load: true})

        db.collection("Todo").doc(Task.objectId).delete()
        .then(() => {
            console.log("Document successfully deleted!");
            
            
        })
        .catch(function(error) {
            console.error("Error writing document: ", error);
        });

        this.PutinFinish(Task)
    }

    FinishForever = (Task) => { 


        const db = firebase.firestore()
        this.setState({load: true})

        db.collection("Finished").doc(Task.objectId).delete()
        .then(() => {
            console.log("Document successfully deleted!");
            
            this.setState({load: false})
            this.props.navigation.navigate('Finished')
        })
        .catch(function(error) {
            console.error("Error writing document: ", error);
        });

    }


    render() {

        const [ATask, done] = this.props.navigation.state.params.news
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
                        <Text style={styles.title}>
                            {ATask.object.Task}
                        </Text>
                        <TouchableOpacity onPress = {() => {done !== "Finished" ? this.FinishTask(ATask) : this.FinishForever(ATask)}}> 
                            <Icon.Ionicons 
                            name = {done !== "Finished" ? "ios-checkmark-circle-outline" : "ios-close-circle-outline"}
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
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#2c3e50',
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
      containerHeader:{
        flex:1,
        height:80,
        paddingTop:16,
        paddingBottom: 0,
        paddingHorizontal:12,
        flexDirection:'row',
        justifyContent:'space-between',
        alignItems:'center',
        backgroundColor:'white'
      }
});

//make this component available to the app
export default MyClass;
