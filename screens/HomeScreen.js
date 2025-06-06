import React, { useState, useContext } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  TextInput,
  ScrollView,
  SafeAreaView,
  StatusBar,
  Platform,
} from 'react-native';
import { Feather } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import { EventosContext } from '../Context/EventosContext';  

const STATUS_BAR_HEIGHT = Platform.OS === 'android' ? StatusBar.currentHeight : 0;

export default function HomeScreen({ navigation }) {
  const { eventos } = useContext(EventosContext);  
  const [busca, setBusca] = useState('');
  const insets = useSafeAreaInsets();

  
  const eventosFiltrados = eventos.filter(
    (item) =>
      item.titulo.toLowerCase().includes(busca.toLowerCase()) ||
      item.categoria.toLowerCase().includes(busca.toLowerCase())
  );

  return (
    <SafeAreaView
      style={[
        styles.safeArea,
        { paddingTop: STATUS_BAR_HEIGHT, paddingBottom: insets.bottom },
      ]}
    >
      <StatusBar barStyle="dark-content" backgroundColor="#fff" translucent={false} />
      <View style={{ flex: 1, paddingHorizontal: 16 }}>
        <ScrollView
          contentContainerStyle={{ paddingBottom: insets.bottom + 90 }}
          keyboardShouldPersistTaps="handled"
        >
          <View style={styles.pesquisaContainer}>
            <Feather name="search" size={20} color="#999" style={styles.iconePesquisa} />
            <TextInput
              style={styles.inputPesquisa}
              placeholder="Buscar rolê..."
              value={busca}
              onChangeText={setBusca}
              placeholderTextColor="#999"
            />
          </View>

          {eventosFiltrados.map((item) => (
            <View key={item.id} style={styles.card}>
              <Image source={item.imagem} style={styles.imagem} />
              <View style={styles.info}>
                <Text style={styles.titulo}>{item.titulo}</Text>
                <Text style={styles.categoria}>{item.categoria}</Text>
                <Text style={styles.data}>
                  {item.data} • {item.localizacao}
                </Text>
                <TouchableOpacity
                  onPress={() => navigation.navigate('Detalhes', { evento: item })}
                  activeOpacity={0.8}
                  style={styles.botaoMapaWrapper}
                >
                  <LinearGradient
                    colors={['#007bff', '#8e2de2']}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 0 }}
                    style={styles.botaoMapa}
                  >
                    <Text style={styles.textoBotao}>VER DETALHES</Text>
                  </LinearGradient>
                </TouchableOpacity>
              </View>
            </View>
          ))}
        </ScrollView>
      </View>

      {}
      <TouchableOpacity
        style={[styles.floatingButton, { bottom: 80 + insets.bottom }]}
        onPress={() => navigation.navigate('CadastrarRole')}
      >
        <Text style={styles.floatingButtonText}>+</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#fff',
  },
  pesquisaContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f0f0f0',
    borderRadius: 10,
    paddingHorizontal: 12,
    paddingVertical: 10,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: '#ccc',
  },
  iconePesquisa: {
    marginRight: 8,
  },
  inputPesquisa: {
    flex: 1,
    fontSize: 16,
    color: '#333',
  },
  card: {
    backgroundColor: '#ffffff',
    borderRadius: 12,
    marginBottom: 20,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 6,
    elevation: 3,
  },
  imagem: {
    width: '100%',
    height: 180,
  },
  info: {
    padding: 12,
  },
  titulo: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#222',
    marginBottom: 4,
  },
  categoria: {
    fontSize: 14,
    color: '#444',
    marginBottom: 2,
  },
  data: {
    fontSize: 12,
    color: '#666',
  },
  botaoMapaWrapper: {
    borderRadius: 10,
    overflow: 'hidden',
    marginTop: 10,
  },
  botaoMapa: {
    paddingVertical: 12,
    alignItems: 'center',
    borderRadius: 10,
  },
  textoBotao: {
    color: '#FFF',
    fontWeight: 'bold',
    fontSize: 14,
  },
  floatingButton: {
    position: 'absolute',
    right: 30,
    backgroundColor: '#7D4EF3',
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 5,
    shadowColor: '#000',
    shadowOpacity: 0.3,
    shadowOffset: { width: 0, height: 3 },
    shadowRadius: 4,
    zIndex: 1000,
  },
  floatingButtonText: {
    color: '#fff',
    fontSize: 36,
    fontWeight: 'bold',
    lineHeight: 36,
  },
});
