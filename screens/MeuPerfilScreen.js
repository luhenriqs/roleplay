import React, { useState } from 'react';
import {
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Image,
  ScrollView,
  View,
  Alert,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import * as ImagePicker from 'expo-image-picker';

export default function MeuPerfilScreen() {
  const [fotoUri, setFotoUri] = useState(null);
  const [nome, setNome] = useState('');
  const [endereco, setEndereco] = useState('');
  const [preferencias, setPreferencias] = useState('');
  const [bio, setBio] = useState('');

  const escolherFoto = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert(
        'Permissão necessária',
        'Precisamos de acesso à galeria para alterar a foto.'
      );
      return;
    }
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      quality: 1,
    });
    if (!result.canceled && result.assets && result.assets.length > 0) {
      setFotoUri(result.assets[0].uri);
    }
  };

  const salvarPerfil = () => {
    Alert.alert('Perfil salvo', 'Suas alterações foram salvas com sucesso!');
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.titulo}>Meu Perfil</Text>

        <TouchableOpacity style={styles.fotoContainer} onPress={escolherFoto}>
          {fotoUri ? (
            <Image source={{ uri: fotoUri }} style={styles.foto} />
          ) : (
            <View style={styles.fotoPlaceholder}>
              <Text style={styles.fotoPlaceholderText}>
                Toque para alterar foto
              </Text>
            </View>
          )}
        </TouchableOpacity>

        <TextInput
          style={styles.input}
          placeholder="Nome"
          value={nome}
          onChangeText={setNome}
          placeholderTextColor="#999"
        />

        <TextInput
          style={styles.input}
          placeholder="Endereço"
          value={endereco}
          onChangeText={setEndereco}
          placeholderTextColor="#999"
        />

        <TextInput
          style={styles.input}
          placeholder="Preferências"
          value={preferencias}
          onChangeText={setPreferencias}
          placeholderTextColor="#999"
        />

        <TextInput
          style={[styles.input, styles.bioInput]}
          placeholder="Bio"
          value={bio}
          onChangeText={setBio}
          placeholderTextColor="#999"
          multiline
          numberOfLines={4}
        />

        <TouchableOpacity style={styles.botaoSalvar} onPress={salvarPerfil}>
          <Text style={styles.textoBotao}>Salvar alterações</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#fff',
  },
  container: {
    padding: 16,
    paddingBottom: 40,
  },
  titulo: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 20,
  },
  fotoContainer: {
    alignSelf: 'center',
    marginBottom: 20,
    borderRadius: 75,
    width: 150,
    height: 150,
    overflow: 'hidden',
    backgroundColor: '#ddd',
    justifyContent: 'center',
    alignItems: 'center',
  },
  foto: {
    width: '100%',
    height: '100%',
  },
  fotoPlaceholder: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  fotoPlaceholderText: {
    color: '#666',
    textAlign: 'center',
  },
  input: {
    backgroundColor: '#f9f9f9',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#e0e0e0',
    paddingHorizontal: 12,
    paddingVertical: 10,
    fontSize: 16,
    color: '#333',
    marginBottom: 16,
  },
  bioInput: {
    height: 100,
    textAlignVertical: 'top',
  },
  botaoSalvar: {
    backgroundColor: '#7D4EF3',
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: 'center',
  },
  textoBotao: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
});
