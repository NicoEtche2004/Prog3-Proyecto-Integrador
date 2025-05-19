import React, {Component} from "react";
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native'

class MiPrimerComponente extends Component{
    constructor(props){
        super(props)
    }

    hizoTouchElUsuario(){
        console.log('El usuario hizo touch')
    }

    hizoUnLongElUsuario(){
        console.log('Hizo un LOONG')
    }

    render(){
        return(
            <View
                style={{...styles.contenedor, ...styles.subcontenedor1}}
            >
                <View style={styles.subcontenedor1}>
                    <TouchableOpacity
                        onPress={() => this.hizoTouchElUsuario() }
                        onLongPress={() => this.hizoUnLongElUsuario()}
                        delayLongPress={10}
                    >
                        <Text
                            style={styles.texto}
                        >SOY TU PRIMER BTN EN RN</Text>
                    </TouchableOpacity>
                </View>
                <View style={styles.subcontenedor2}>
                    <Text>Soy otro text</Text>
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    contenedor: {
        backgroundColor: 'green',
        flex: 1
    },
    subcontenedor1: {
        backgroundColor: 'yellow',
        flex:2
    },
    subcontenedor2: {
        backgroundColor: 'blue',
        flex:1
    },
    texto:{
        fontSize: 36,
        color:'red'
    }
})

export default MiPrimerComponente