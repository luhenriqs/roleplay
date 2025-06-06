import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  StyleSheet,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

export default function LoginScreen({ navigation }) {
  const [isLogin, setIsLogin] = useState(true);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');
  const [error, setError] = useState('');

  const handleAction = () => {
    if (username === '' || password === '' || (!isLogin && confirm === '')) {
      setError('Por favor, preencha todos os campos.');
      return;
    }
    if (!isLogin && password !== confirm) {
      setError('As senhas não coincidem.');
      return;
    }

    setError('');
   

    if (isLogin) {
      navigation.replace('Home');
    } else {
      setIsLogin(true);
    }
  };

  return (
    <View style={styles.container}>
      <Image
        source={require('../assets/logo-login.webp')}
        style={styles.logo}
        resizeMode="contain"
      />
      <TextInput
        style={styles.input}
        placeholder="Usuário"
        value={username}
        onChangeText={setUsername}
      />
      <TextInput
        style={styles.input}
        placeholder="Senha"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />
      {!isLogin && (
        <TextInput
          style={styles.input}
          placeholder="Confirmar Senha"
          secureTextEntry
          value={confirm}
          onChangeText={setConfirm}
        />
      )}
      {error !== '' && <Text style={styles.error}>{error}</Text>}

      <TouchableOpacity onPress={handleAction} style={styles.buttonWrapper}>
        <LinearGradient
          colors={['#007bff', '#8e2de2']}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
          style={styles.button}
        >
          <Text style={styles.buttonText}>
            {isLogin ? 'Entrar' : 'Cadastrar'}
          </Text>
        </LinearGradient>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => setIsLogin(!isLogin)}>
        <Text style={styles.switchText}>
          {isLogin ? 'Não tem conta? Cadastre-se' : 'Já tem conta? Entrar'}
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  logo: {
    width: 250,
    height: 150,
    marginBottom: 40,
  },
  input: {
    width: '100%',
    height: 50,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 12,
    paddingHorizontal: 15,
    marginBottom: 15,
    fontSize: 16,
  },
  buttonWrapper: {
    width: '100%',
    borderRadius: 15,
    overflow: 'hidden',
    marginTop: 20,
  },
  button: {
    width: '100%',
    height: 50,
    borderRadius: 15,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 18,
  },
  switchText: {
    marginTop: 20,
    color: '#007CF0',
    fontWeight: 'bold',
  },
  error: {
    color: 'red',
    marginBottom: 10,
  },
});
