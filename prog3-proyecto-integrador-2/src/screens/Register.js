import React, {Component} from 'react'
import { Text, View, TouchableOpacity, TextInput, StyleSheet } from 'react-native'
import { auth, db } from '../firebase/config'

//auth.onAuthStateChanged

class Register extends Component {
    constructor(props){
        super(props)
        this.state = {
            email:'',
            password: '',
            username: ''
        }
    }

    componentDidMount(){
        auth.onAuthStateChanged((user) => {
            if(user){
                this.props.navigation.navigate('Tab')
            }
        })
    }

    registrarUsuario(email, password, username){
        if(
            (
                email !== '' &&
                password !== '' &&
                username !== ''
            )
            &&
            password.length >= 6
            &&
            email.includes('@') 
            &&
            username.length > 3
        ){
          auth.createUserWithEmailAndPassword(email, password)
          .then(() => {

            db.collection('users')
            .add({
                owner: email,
                createdAt: Date.now(),
                updatedAt: Date.now(),
                username: username
            })
            .then(()=> {
                this.props.navigation.navigate('Tab')
            })

          })
          .catch(err=> console.log('err:', err))  
        }
    }

    render(){
        return(
            <View>
                <TextInput
                    value={this.state.email}
                    onChangeText={(text) => this.setState({email: text})}
                    keyboardType='default'
                    placeholder='email'
                    style={styles.input}
                />
                <TextInput
                    value={this.state.password}
                    onChangeText={(text) => this.setState({password: text})}
                    keyboardType='default'
                    placeholder='password'
                    style={styles.input}
                />
                <TextInput
                    value={this.state.username}
                    onChangeText={(text) => this.setState({username: text})}
                    keyboardType='default'
                    placeholder='username'
                    style={styles.input}
                />
                <TouchableOpacity onPress={()=> this.registrarUsuario(this.state.email, this.state.password, this.state.username)}>
                    <Text>Registrar usuario</Text>
                </TouchableOpacity>
            </View>
        )
    }
}

const styles= StyleSheet.create({
    input:{
        borderWidth: 1,
        borderColor: 'pink'
    }
})

export default Register

//pregunta de examen
//si el metodo esta defiinido esperando dos parametros. los llamo cuando lo ejecuto

// pregunta de examen:
// el metodo add siempre recibe un objeto literal