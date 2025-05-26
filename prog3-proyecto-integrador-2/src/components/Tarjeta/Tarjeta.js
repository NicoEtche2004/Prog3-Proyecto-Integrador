import { Text, View, Image, StyleSheet } from 'react-native'
import React, { Component } from 'react'

export default class Tarjeta extends Component {
    constructor(props){
        super(props)
        this.state ={
            dataUsuario: acaTieneQueLlegarLaData
        }
    }
  render() {
    //propiedades de la tarjeta, minimo 4: owner, descripcion, created at, likes.
    //(esto lo dijo TEXTUALMENTE nelson)
    return (
      <View>
        <Text>{this.props.dataUsuario.owner}</Text>
        <Text>{this.props.dataUsuario.descripcion}</Text>
        <Text>{this.props.dataUsuario.createdAt}</Text>
        <Text>{this.props.dataUsuario.likes}</Text>

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