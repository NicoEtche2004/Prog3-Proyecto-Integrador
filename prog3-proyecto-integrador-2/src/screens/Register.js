import { Text, View, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import React, { Component } from 'react';
import { auth, db } from '../firebase/config'

export default class Register extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: '',
            username: '',
            error: false
        };
    }
    componentDidMount() {
        auth.onAuthStateChanged((user) => {
            if (user) {
                this.props.navigation.navigate('Tab')
            }
        })
    }

    registrar(email, password, username) {
        if (
            email !== '' &&
            password !== '' &&
            username !== '' &&
            password.length >= 6 &&
            email.includes('@') &&
            username.length > 3
        ) {
            auth.createUserWithEmailAndPassword(email, password)
                .then(() => {
                    db.collection('users')
                        .add({
                            owner: email,
                            createdAt: Date.now(),
                            updatedAt: Date.now(),
                            username: username
                        })
                        .then(() => { this.props.navigation.navigate('Tab', { screen: 'Home' }); })

                })
                .catch(err => console.log('Error: ', err))
        } else {
            this.setState({ error: true });
        }
    }

    irALogin() {
        this.props.navigation.navigate('Login');
    }

    render() {
        return (
            <View style={styles.container}>
                <Text style={styles.title}>Registro</Text>

                <TextInput
                    style={styles.input}
                    placeholder="Nombre de usuario"
                    placeholderTextColor="#999"
                    value={this.state.username}
                    onChangeText={(texto) => this.setState({ username: texto, error: false })}
                />

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

                <TouchableOpacity
                    style={styles.button}
                    onPress={() =>
                        this.registrar(this.state.email, this.state.password, this.state.username)
                    }
                >
                    <Text style={styles.buttonText}>Registrarme</Text>
                </TouchableOpacity>

                <View style={styles.loginContainer}>
                    <Text style={styles.loginText}>¿Ya tenés una cuenta?</Text>
                    <TouchableOpacity onPress={() => this.irALogin()}>
                        <Text style={styles.loginLink}> Iniciá sesión</Text>
                    </TouchableOpacity>
                </View>

                {this.state.error && (
                    <Text style={{ color: 'red', marginTop: 12 }}>Completa correctamente todos los campos</Text>
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
    loginContainer: {
        flexDirection: 'row',
        marginTop: 24,
    },
    loginText: {
        fontSize: 14,
        color: '#64748b',
    },
    loginLink: {
        fontSize: 14,
        color: '#2563eb',
        fontWeight: '600',
    },
});
