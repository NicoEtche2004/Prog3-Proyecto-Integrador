import React, { Component } from "react";
import { Text, View, TouchableOpacity, StyleSheet, Image, FlatList } from 'react-native';
import { auth, db } from "../firebase/config";
import Post from '../components/Post/Post';

class Perfil extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: null,
      username: '',
      misPosts: []
    };
  }

  componentDidMount() {
    const currentUser = auth.currentUser;

    if (currentUser) {
      this.setState({ user: currentUser });

      db.collection('users')
        .where('owner', '==', currentUser.email)
        .get()
        .then(docs => {
          docs.forEach(doc => {
            this.setState({ username: doc.data().username });
          });
        })
        .catch(err => console.log('Error al obtener username:', err));

      db.collection('posts')
        .where('email', '==', currentUser.email)
        .orderBy('fecha', 'desc')
        .onSnapshot((docs) => {
          let posts = [];

          docs.forEach(doc => {
            posts.push({
              id: doc.id,
              data: doc.data()
            });
          });

          this.setState({ misPosts: posts });
        });
    }
  }

  logout() {
    auth.signOut()
      .then(() => this.props.navigation.navigate('Register'))
      .catch(err => console.log('Error en signOut:', err));
  }

  borrarPosteo(id) {
    db.collection('posts').doc(id).delete()
      .then(() => console.log('Post eliminado:', id))
      .catch(err => console.log('Error al borrar post:', err));
  }

  render() {
    const { user, username, misPosts } = this.state;

    return (
      <View style={styles.container}>
        <Text style={styles.title}>Mi Perfil</Text>

        {user && (
          <>
            <Image
              source={{ uri: 'https://i.pravatar.cc/300' }}
              style={styles.avatar}
            />
            <Text style={styles.username}>{this.state.username || 'Usuario sin nombre'}</Text>
            <Text style={styles.email}>{user.email}</Text>
          </>
        )}

        <Text style={styles.subtitle}>Mis posteos</Text>

        <FlatList
          data={misPosts}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <Post
              post={{ ...item, userEmail: auth.currentUser.email }}
              username={username}
              onDelete={(id) => this.borrarPosteo(id)}
            />
          )}
        />

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
    paddingTop: 40,
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    marginBottom: 24,
    color: '#1e293b',
    textAlign: 'center'
  },
  avatar: {
    width: 120,
    height: 120,
    borderRadius: 60,
    alignSelf: 'center',
    marginBottom: 16,
    borderWidth: 2,
    borderColor: '#2563eb',
  },
  username: {
    fontSize: 20,
    fontWeight: '600',
    color: '#1e293b',
    textAlign: 'center'
  },
  email: {
    fontSize: 16,
    color: '#475569',
    marginBottom: 24,
    textAlign: 'center'
  },
  subtitle: {
    fontSize: 20,
    fontWeight: '600',
    marginBottom: 10
  },
  button: {
    width: '100%',
    backgroundColor: '#ef4444',
    paddingVertical: 16,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 20,
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