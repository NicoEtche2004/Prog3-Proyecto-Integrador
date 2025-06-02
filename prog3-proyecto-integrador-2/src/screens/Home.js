import React, { Component } from "react";
import { View, Text, FlatList, StyleSheet, ActivityIndicator } from 'react-native';
import { db, auth } from "../firebase/config";
import firebase from 'firebase';
import Post from '../components/Post/Post';

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      posts: [],
      cargando: true,
      users: []
    };
  }

  componentDidMount() {

    db.collection('users').onSnapshot(docs => {
      let users = [];
      docs.forEach(doc => {
        users.push(doc.data());
      });
      this.setState({ users });
    });

    db.collection('posts')
      .orderBy('fecha', 'desc')
      .onSnapshot((docs) => {
        let postsAMostrar = [];

        docs.forEach(doc => {
          postsAMostrar.push({
            id: doc.id,
            data: doc.data()
          });
        });

        this.setState({
          posts: postsAMostrar,
          cargando: false
        });
      });
  }

  getUsername(email) {
    const user = this.state.users.find(user => user.owner === email);
    return user ? user.username : '';
  }

  like(id, likes) {
    let user = auth.currentUser.email;

    if (likes.includes(user)) {
      db.collection('posts').doc(id).update({
        likes: firebase.firestore.FieldValue.arrayRemove(user)
      });
    } else {
      db.collection('posts').doc(id).update({
        likes: firebase.firestore.FieldValue.arrayUnion(user)
      });
    }
  }

  render() {
    return (
      <View style={styles.contenedor}>
        <Text style={styles.titulo}>Feed general</Text>

        {this.state.cargando ? (
          <ActivityIndicator size="large" color="red" />
        ) : (
          <FlatList
            data={this.state.posts}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <Post
                post={{ ...item, userEmail: auth.currentUser.email }}
                username={this.getUsername(item.data.email)}
                onLike={(id, likes) => this.like(id, likes)}
              />
            )}
          />
        )}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  contenedor: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff'
  },
  titulo: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10
  }
});

export default Home;