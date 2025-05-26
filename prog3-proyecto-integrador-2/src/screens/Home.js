import React, {Component} from "react";
import {View, Text, Image, StyleSheet, FlatList, ActivityIndicator, TouchableOpacity} from 'react-native'

class Home extends Component{
    constructor(props){
        super(props)
    }

    redireccionar(nombrePantalla){
        this.props.navigation.navigate(nombrePantalla)
    }

    render(){
        return(
            <View style={styles.contenedor}>
                <TouchableOpacity
                    onPress={() => this.redireccionar('Pagina2') }
                >
                    <Text>Ir a Pagina 2</Text>
                </TouchableOpacity>
                <ActivityIndicator 
                    color={'red'}
                    size={40}
                />

                <TouchableOpacity
                    onPress={()=> this.redireccionar('Tab')}
                >
                    <Text>
                        Entrar a la aplicacion
                    </Text>
                </TouchableOpacity>

                <Text>Esta es mi home</Text>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    contenedor:{
        flex:1
    },
    imagenPerrito: {
        height: 200,
        width:200
    }
})
export default Home