import React, {Component} from 'react';
import {View, Text, TouchableOpacity, StyleSheet, Image} from 'react-native';

class Home extends Component{
    constructor(props){
        super(props)
    }

    render(){
        return(
            <View style= {styles.contenedor}>
                <Text> Hola mundo </Text>
            </View>
        );
    }

    functionCard(){
        return <Image
            style= {styles.image} 
            source= {require('../images/jpg')}
            //source= {uri: ('https://data de una url)} recurso no local
            resizeMode= 'contain' />
    }

}

//styles es una prop local
//tiene q ir afuera del component
const styles = StyleSheet.create({
    image: {
        width: '',
        height: ''
    },
    contenedor:{
        width: '',
        height: ''
    }
})

export default Home
