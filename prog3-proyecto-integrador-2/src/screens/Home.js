import React, {Component} from "react";
import {
    View, 
    Text, 
    Image, 
    StyleSheet,
    FlatList,
    ActivityIndicator,
    TouchableOpacity
} from 'react-native'
import { estudiantes } from "../utils/array";
import CardEstudiante from "../components/CardEstudiante";

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
                <Image
                    style={styles.imagenPerrito}
                    source={require('../../assets/perrito.jpeg')}
                    resizeMode="contain"
                />
                <Image
                    style={styles.imagenPerrito}
                    source={{uri: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS0i8VVq0qJbkEQ83vKUq7mxv555YuKoCc5MQ&s'}}
                    resizeMode="cover"
                />
                <FlatList
                    data={estudiantes}
                    keyExtractor={(item) => item.id.toString() }
                    renderItem={({item}) => <CardEstudiante dataEstudiante={item} /> }
                />
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