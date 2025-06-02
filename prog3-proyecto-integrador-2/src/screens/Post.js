import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet, Alert } from 'react-native';
import { auth, db } from '../firebase/config';
import firebase from 'firebase';
import { useNavigation } from '@react-navigation/native';

export default function Post() {
  const [contenido, setContenido] = useState('');
  const navigation = useNavigation();

  const handlePostear = async () => {
    const email = auth.currentUser?.email;

    if (!contenido.trim()) {
      Alert.alert("El contenido no puede estar vacío");
      return;
    }

    try {
      await db.collection('posts').add({
        contenido: contenido,
        email: email,
        fecha: firebase.firestore.FieldValue.serverTimestamp(),
        likes: []
      });

      setContenido('');
      Alert.alert("Posteo publicado");
      navigation.navigate('Home');
    } catch (error) {
      console.error("Error al publicar posteo:", error);
      Alert.alert("Error al publicar", error.message);
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        placeholder="Escribí tu posteo acá..."
        value={contenido}
        onChangeText={setContenido}
        style={styles.input}
        multiline
      />
      <Button title="Publicar" onPress={handlePostear} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff'
  },
  input: {
    height: 100,
    borderColor: '#ccc',
    borderWidth: 1,
    padding: 10,
    borderRadius: 8,
    marginBottom: 10,
    textAlignVertical: 'top'
  }
});