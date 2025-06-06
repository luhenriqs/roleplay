import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';

export default function EventoCard({ titulo, descricao, data, imagem }) {
  return (
    <View style={styles.card}>
      <Image source={{ uri: imagem }} style={styles.imagem} />
      <Text style={styles.titulo}>{titulo}</Text>
      <Text style={styles.descricao}>{descricao}</Text>
      <Text style={styles.data}>{data}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    margin: 8,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  imagem: {
    width: '100%',
    height: 150,
    borderRadius: 8,
    marginBottom: 8,
  },
  titulo: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  descricao: {
    fontSize: 14,
    marginBottom: 4,
  },
  data: {
    fontSize: 12,
    color: 'gray',
  },
});
