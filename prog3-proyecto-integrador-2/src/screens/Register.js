import { Text, View, TextInput, StyleSheet,TouchableOpacity} from 'react-native'
import React, { Component } from 'react'
import {auth} from '../firebase/config'

//(creo q esto hay que importatrlo) auth.onAuthStateChange
//mantiene la sesion sin necesidad de loguearse todo el tiempo.
//hay que hardcodear igual pero esto lo hahce posible.

class Register extends Component {
    constructor(props){
        super(props)
        this.state = {
            email: '',
            password: '',
            error: false
        }
    }

    componentDidMount(){
        auth.onAuthStateChanged((user) => {
            if(user){
                this.props.navigation.navigate('tab')
            }
        })
    }

    registrarUsuario(){
        if(
            this.state.email === 'Nelson' &&
            this.state.password === '12345'
        ){
            this.props.navigation.navigate('Tab')
        } else {
            this.setState({email:'', password: '', error: true})
        }
    }

//pregunta de examen
//si el metodo esta defiinido esperando dos parametros. los llamo cuando lo ejecuto

    registrarUsuario(email, password){
        if(
            (email !== '' && password !== '')
                && password.length >= 6 && email.includes('@')
        ){
            auth.createUserWithEmailAndPassword(email, password)
            .then(() => {
                this.props.navigation.navigate('tab')
            })
            .catch(err => console.log('err:', err))
        }
    }

  render() {
    return (
      <View>
        <Text>Register</Text>
            <TextInput
                style={
                    styles.input
                }
                keyboardType='default'
                value={this.state.email}
                onChangeText={(texto) => this.setState({email: texto, error: false }) }
                placeholder='Ingresa tu email'
            />
            <TextInput
                style={
                    styles.input
                }
                keyboardType='default'
                value={this.state.password}
                onChangeText={(texto) => this.setState({password: texto, error: false }) }
                placeholder='Ingresa tu password'
                secureTextEntry={true}
            />
            <TouchableOpacity onPress={()=> this.registrarUsuario()}>
                <Text>Registrarme</Text>
            </TouchableOpacity>
            {
                this.state.error ? <Text>Credenciales invalidas</Text> : null
            }
      </View>
    )
  }
}

// pregunta de examen:
// el metodo add siempre recibe un objeto literal

const styles = StyleSheet.create({
    input: {
        borderWidth: 2,
        borderColor: 'red'
    }
})

export default Register