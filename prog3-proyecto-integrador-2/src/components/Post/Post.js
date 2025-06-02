import { Text, View, StyleSheet, TouchableOpacity } from 'react-native';
import React from 'react';
import { FontAwesome } from '@expo/vector-icons';

export default function Post({ post, username, onLike, onDelete }) {
  const likedByUser = post.data.likes?.includes(post.userEmail);

  return (
    <View style={styles.post}>
      <Text style={styles.email}>
        @{username} ({post.data.email})
      </Text>
      <Text style={styles.contenido}>{post.data.contenido}</Text>
      <Text style={styles.fecha}>
        {post.data.fecha?.toDate().toLocaleString()}
      </Text>

      {onLike && (
        <TouchableOpacity onPress={() => onLike(post.id, post.data.likes || [])}>
          <Text style={styles.like}>
            <FontAwesome
              name={likedByUser ? 'heart' : 'heart-o'}
              size={16}
              color="red"
            />{' '}
            {likedByUser ? 'No me gusta' : 'Me gusta'} ({post.data.likes?.length || 0})
          </Text>
        </TouchableOpacity>
      )}

      {onDelete && (
        <TouchableOpacity onPress={() => onDelete(post.id)}>
          <Text style={styles.delete}>
            <FontAwesome name="trash" size={16} color="gray" /> Borrar
          </Text>
        </TouchableOpacity>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  post: {
    backgroundColor: '#eee',
    padding: 15,
    marginBottom: 10,
    borderRadius: 8
  },
  email: {
    fontWeight: 'bold',
    marginBottom: 5
  },
  contenido: {
    fontSize: 16,
    marginBottom: 5
  },
  fecha: {
    fontSize: 12,
    color: '#666'
  },
  like: {
    color: 'red',
    marginTop: 5
  },
  delete: {
    color: 'gray',
    marginTop: 5
  }
});