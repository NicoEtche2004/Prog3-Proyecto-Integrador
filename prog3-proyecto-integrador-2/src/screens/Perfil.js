import React, { Component } from "react";
import { Text, View, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { auth } from "../firebase/config";

class Perfil extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: null,
    };
  }

  componentDidMount() {
    const currentUser = auth.currentUser;
    if (currentUser) {
      this.setState({ user: currentUser });
    }
  }

  logout() {
    auth.signOut()
      .then(() => this.props.navigation.navigate('Register'))
      .catch(err => console.log('Error en signOut:', err));
  }

  render() {
    const { user } = this.state;

    return (
      <View style={styles.container}>
        <Text style={styles.title}>Mi Perfil</Text>

        {user && (
          <>
            <Image
              source={{ uri: 'https://i.pravatar.cc/300' }}
              style={styles.avatar}
            />
            <Text style={styles.username}>{user.displayName || 'Usuario sin nombre'}</Text>
            <Text style={styles.email}>{user.email}</Text>
          </>
        )}

        <TouchableOpacity style={styles.button} onPress={() => this.logout()}>
          <Text style={styles.buttonText}>Cerrar sesión</Text>
        </TouchableOpacity>
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
    marginBottom: 24,
    color: '#1e293b',
  },
  avatar: {
    width: 120,
    height: 120,
    borderRadius: 60,
    marginBottom: 16,
    borderWidth: 2,
    borderColor: '#2563eb',
  },
  username: {
    fontSize: 20,
    fontWeight: '600',
    color: '#1e293b',
    marginBottom: 4,
  },
  email: {
    fontSize: 16,
    color: '#475569',
    marginBottom: 24,
  },
  button: {
    width: '100%',
    backgroundColor: '#ef4444',
    paddingVertical: 16,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 8,
    shadowColor: '#ef4444',
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
});

export default Perfil;
