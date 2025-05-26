import { View, Text } from 'react-native'
import React, { Component } from 'react'
import {auth} from '../firebase/config'
import { TouchableOpacity } from 'react-native'

class Perfil extends Component {
  constructor(props){
    super(props)
  }

  logout(){
    auth.signOut()
    .then(()=> this.props.navigation.navigate('register'))
    .catch(err => console.log('err en signouth', err))
  }

//dentro de la flatlist, la propiedad 'data' siempre recibe un array

  render(){
    return (
      <View>
        <Text>Perfil</Text>
        <TouchableOpacity onPress={() => this.logout()}>
          <text>Cerrar Sesion</text>
        </TouchableOpacity>
      </View>
    )
  }
}

export default Perfil