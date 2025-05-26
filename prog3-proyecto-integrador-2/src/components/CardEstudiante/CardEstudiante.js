import { Text, View, Image, StyleSheet } from 'react-native'
import React, { Component } from 'react'

export default class CardEstudiante extends Component {
    constructor(props){
        super(props)
    }
  render() {
    return (
      <View>
        <Text>{this.props.dataEstudiante.nombre}</Text>
        <Image
            style={styles.imgEstudiante}
            source={{uri: this.props.dataEstudiante.imagen}}
            resizeMode='contain'
        />
      </View>
    )
  }
}

const styles = StyleSheet.create({
    imgEstudiante:{
        height: 200,
        width: 200
    }
})