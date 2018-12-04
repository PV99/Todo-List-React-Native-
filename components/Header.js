import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import {Icon} from 'react-native-vector-icons/MaterialIcons'


export default class Header extends Component {

    constructor(props){
        super(props)
        this.setState({}) 
    } 

    render() {
    return (
        <View style={styles.container}>
        {/*     
        {this.props.title != 'Home' ? <TouchableOpacity onPress={() => this.props.navigation.goBack()}>
            <Icon name='arrow-back' size={30} color='blue'/>
        </TouchableOpacity>
        :
        <TouchableOpacity>
            <Icon name='menu' size={30} color='blue'/>
        </TouchableOpacity>}

        <Text style={styles.title}>
            {this.props.title}
        </Text>
        {this.props.title != 'Home' ?
        <Icon name='menu' size={30} color='transparent'/>
        :
        <TouchableOpacity onPress={() => this.props.navigation.navigate('AddContact')}>
            <Icon name='add' size={30} color='blue'/>
        </TouchableOpacity>}
        */} 

        <TouchableOpacity>
            <Icon name='menu' size={30} color='blue'/>
        </TouchableOpacity>}

        <Text style={styles.title}>
            {this.props.title}
        </Text>


        <TouchableOpacity onPress={() => console.log("heppy")}>
            <Icon name='add' size={30} color='blue'/>
        </TouchableOpacity>}


        </View>
    );
  }
}

const styles = StyleSheet.create({
  container:{
    // flex:1,
    height:40,
    padding:8,
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