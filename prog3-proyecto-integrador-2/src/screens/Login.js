import { Text, View, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import React, { Component } from 'react';
import { auth } from '../firebase/config';

export default class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: '',
            error: false
        };
    }

    iniciarSesion() {
        const { email, password } = this.state;

        if (email !== '' && password !== '') {
            auth.signInWithEmailAndPassword(email, password)
                .then(() => {
                    this.setState({ error: false });
                    this.props.navigation.navigate('Tab', { screen: 'Home' });
                })
                .catch(err => {
                    console.log('Error al iniciar sesión:', err);
                    this.setState({ error: true });
                });
        } else {
            this.setState({ error: true });
        }
    }

    irARegistro() {
        this.props.navigation.navigate('Register');
    }

    render() {
        return (
            <View style={styles.container}>
                <Text style={styles.title}>Iniciar Sesión</Text>

                <TextInput
                    style={styles.input}
                    keyboardType="email-address"
                    autoCapitalize="none"
                    value={this.state.email}
                    onChangeText={(texto) => this.setState({ email: texto, error: false })}
                    placeholder="Ingresa tu email"
                    placeholderTextColor="#999"
                />

                <TextInput
                    style={styles.input}
                    secureTextEntry
                    value={this.state.password}
                    onChangeText={(texto) => this.setState({ password: texto, error: false })}
                    placeholder="Ingresa tu clave"
                    placeholderTextColor="#999"
                />

                <TouchableOpacity style={styles.button} onPress={() => this.iniciarSesion()}>
                    <Text style={styles.buttonText}>Ingresar</Text>
                </TouchableOpacity>

                <View style={styles.registerContainer}>
                    <Text style={styles.registerText}>¿No tenés cuenta?</Text>
                    <TouchableOpacity onPress={() => this.irARegistro()}>
                        <Text style={styles.registerLink}> Registrate</Text>
                    </TouchableOpacity>
                </View>

                {this.state.error && (
                    <Text style={{ color: 'red', marginTop: 16 }}>
                        Credenciales inválidas o campos incompletos
                    </Text>
                )}
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f0f4f8',
        paddingHorizontal: 24,
        justifyContent: 'center',
        alignItems: 'center',
    },
    title: {
        fontSize: 28,
        fontWeight: '700',
        marginBottom: 32,
        color: '#1e293b',
    },
    input: {
        width: '100%',
        maxWidth: 400,
        height: 50,
        borderWidth: 1,
        borderColor: '#cbd5e1',
        borderRadius: 10,
        paddingHorizontal: 16,
        marginBottom: 16,
        backgroundColor: '#ffffff',
        fontSize: 16,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.05,
        shadowRadius: 2,
        elevation: 1,
    },
    button: {
        width: '100%',
        maxWidth: 400,
        backgroundColor: '#2563eb',
        paddingVertical: 16,
        borderRadius: 10,
        alignItems: 'center',
        marginTop: 8,
        shadowColor: '#2563eb',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 6,
        elevation: 4,
    },
    buttonText: {
        color: '#fff',
        fontSize: 17,
        fontWeight: '600',
    },
    registerContainer: {
        flexDirection: 'row',
        marginTop: 24,
    },
    registerText: {
        fontSize: 14,
        color: '#64748b',
    },
    registerLink: {
        fontSize: 14,
        color: '#2563eb',
        fontWeight: '600',
    },
});
