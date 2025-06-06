import React, { useState, useContext, useEffect } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  SafeAreaView,
  StatusBar,
  Platform,
  ScrollView,
  Image,
  Modal,
  Alert,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import * as ImagePicker from 'expo-image-picker';
import { EventosContext } from '../Context/EventosContext';
import DateTimePicker from '@react-native-community/datetimepicker';

let MapView, Marker;
if (Platform.OS !== 'web') {
  const MapModule = require('react-native-maps');
  MapView = MapModule.default;
  Marker = MapModule.Marker;
}

const STATUS_BAR_HEIGHT = Platform.OS === 'android' ? StatusBar.currentHeight : 0;

export default function CadastrarRoleScreen({ navigation }) {
  const insets = useSafeAreaInsets();
  const { adicionarEvento } = useContext(EventosContext);

  const [titulo, setTitulo] = useState('');
  const [categoria, setCategoria] = useState('');
  const [data, setData] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);

  const [localizacao, setLocalizacao] = useState('');
  const [linkMaps, setLinkMaps] = useState('');

  const [imagem, setImagem] = useState(null);

  const [mapVisible, setMapVisible] = useState(false);
  const [selectedLocation, setSelectedLocation] = useState({
    latitude: -23.55052,
    longitude: -46.633308,
  });

  const [salvando, setSalvando] = useState(false);

  useEffect(() => {
    (async () => {
      if (Platform.OS !== 'web') {
        const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (status !== 'granted') {
          Alert.alert('Permissão', 'Permissão para acessar a galeria é necessária!');
        }
      }
    })();
  }, []);

  async function escolherImagem() {
    try {
      let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
      });

      if (!result.canceled) {
        setImagem(result.assets[0].uri);
      }
    } catch (error) {
      Alert.alert('Erro', 'Não foi possível escolher a imagem.');
    }
  }

  function validarCampos() {
    if (!titulo.trim() || !categoria.trim() || !localizacao.trim() || !linkMaps.trim()) {
      Alert.alert('Erro', 'Por favor, preencha todos os campos corretamente.');
      return false;
    }
    return true;
  }

  async function salvarRole() {
    if (!validarCampos()) return;

    setSalvando(true);

    try {
      const novoRole = {
        id: Date.now().toString(),
        titulo: titulo.trim(),
        categoria: categoria.trim(),
        data: data.toISOString(),
        localizacao: localizacao.trim(),
        linkMaps: linkMaps.trim(),
        coordenadas: selectedLocation,
        imagem: imagem ? { uri: imagem } : require('../assets/DefaultImage.webp'),
      };

      await adicionarEvento(novoRole);

      Alert.alert('Sucesso', 'Rolê cadastrado com sucesso!');
      navigation.goBack();

      setTitulo('');
      setCategoria('');
      setData(new Date());
      setLocalizacao('');
      setLinkMaps('');
      setImagem(null);
    } catch (error) {
      Alert.alert('Erro', 'Falha ao salvar o rolê. Tente novamente.');
      console.error(error);
    } finally {
      setSalvando(false);
    }
  }

  function handleMapPress(event) {
    setSelectedLocation(event.nativeEvent.coordinate);
  }

  function gerarLinkGoogleMaps(latitude, longitude) {
    return `https://www.google.com/maps/search/?api=1&query=${latitude},${longitude}`;
  }

  function confirmarLocalizacao() {
    const { latitude, longitude } = selectedLocation;

    setLocalizacao(
      `Lat: ${latitude.toFixed(5)}, Lng: ${longitude.toFixed(5)}`
    );

    const link = gerarLinkGoogleMaps(latitude, longitude);
    setLinkMaps(link);

    setMapVisible(false);
  }

  function onChangeDate(event, selectedDate) {
    setShowDatePicker(false);
    if (selectedDate) {
      setData(selectedDate);
    }
  }

  return (
    <SafeAreaView
      style={[styles.safeArea, { paddingTop: STATUS_BAR_HEIGHT, paddingBottom: insets.bottom }]}
    >
      <StatusBar barStyle="dark-content" backgroundColor="#fff" translucent={false} />
      <ScrollView
        contentContainerStyle={{ padding: 16, paddingBottom: insets.bottom + 40 }}
        keyboardShouldPersistTaps="handled"
      >
        <Text style={styles.label}>Título</Text>
        <TextInput
          style={styles.input}
          placeholder="Digite o título do rolê"
          value={titulo}
          onChangeText={setTitulo}
          placeholderTextColor="#999"
          editable={!salvando}
        />

        <Text style={styles.label}>Categoria</Text>
        <TextInput
          style={styles.input}
          placeholder="Digite a categoria"
          value={categoria}
          onChangeText={setCategoria}
          placeholderTextColor="#999"
          editable={!salvando}
        />

        <Text style={styles.label}>Data</Text>
        <TouchableOpacity
          onPress={() => setShowDatePicker(true)}
          style={[styles.input, { justifyContent: 'center' }]}
          disabled={salvando}
        >
          <Text style={{ color: '#333', fontSize: 16 }}>
            {data.toLocaleDateString('pt-BR')}
          </Text>
        </TouchableOpacity>
        {showDatePicker && (
          <DateTimePicker
            value={data}
            mode="date"
            display="default"
            onChange={onChangeDate}
            locale="pt-BR"
          />
        )}

        <Text style={styles.label}>Localização</Text>
        <TextInput
          style={styles.input}
          placeholder="Digite o local ou escolha no mapa"
          value={localizacao}
          onChangeText={setLocalizacao}
          placeholderTextColor="#999"
          editable={!salvando}
        />

        <TouchableOpacity
          onPress={() => setMapVisible(true)}
          style={styles.botaoImagem}
          disabled={salvando}
        >
          <Text style={styles.textoBotaoImagem}>Escolher Local no Mapa</Text>
        </TouchableOpacity>

        <Text style={styles.label}>Link do Google Maps</Text>
        <TextInput
          style={styles.input}
          placeholder="Cole ou gere automaticamente o link"
          value={linkMaps}
          onChangeText={setLinkMaps}
          placeholderTextColor="#999"
          editable={!salvando}
        />

        <Text style={styles.label}>Imagem</Text>
        <TouchableOpacity
          onPress={escolherImagem}
          style={styles.botaoImagem}
          disabled={salvando}
        >
          <Text style={styles.textoBotaoImagem}>Selecionar Imagem</Text>
        </TouchableOpacity>

        {imagem && (
          <Image
            source={{ uri: imagem }}
            style={{ width: '100%', height: 200, borderRadius: 10, marginTop: 10 }}
            resizeMode="cover"
          />
        )}

        <TouchableOpacity
          onPress={salvarRole}
          activeOpacity={0.8}
          style={[styles.botaoWrapper, salvando && { opacity: 0.6 }]}
          disabled={salvando}
        >
          <LinearGradient
            colors={['#007bff', '#8e2de2']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            style={styles.botao}
          >
            <Text style={styles.textoBotao}>{salvando ? 'Salvando...' : 'Cadastrar Rolê'}</Text>
          </LinearGradient>
        </TouchableOpacity>
      </ScrollView>

      <Modal visible={mapVisible} animationType="slide">
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          {Platform.OS !== 'web' ? (
            <>
              <MapView
                style={{ flex: 1, width: '100%' }}
                initialRegion={{
                  latitude: selectedLocation.latitude,
                  longitude: selectedLocation.longitude,
                  latitudeDelta: 0.01,
                  longitudeDelta: 0.01,
                }}
                onPress={handleMapPress}
              >
                <Marker coordinate={selectedLocation} />
              </MapView>

              <TouchableOpacity
                onPress={confirmarLocalizacao}
                style={[styles.botaoImagem, { margin: 16, backgroundColor: '#007bff' }]}
              >
                <Text style={{ color: '#fff', textAlign: 'center' }}>Confirmar Localização</Text>
              </TouchableOpacity>
            </>
          ) : (
            <Text style={{ fontSize: 16, color: '#555', margin: 20, textAlign: 'center' }}>
              Mapa disponível apenas no app
            </Text>
          )}
        </View>
      </Modal>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#fff',
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
    color: '#222',
    marginBottom: 6,
    marginTop: 12,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 10,
    paddingHorizontal: 14,
    paddingVertical: 12,
    fontSize: 16,
    color: '#333',
  },
  botaoWrapper: {
    marginTop: 30,
    borderRadius: 10,
    overflow: 'hidden',
  },
  botao: {
    paddingVertical: 14,
    alignItems: 'center',
    borderRadius: 10,
  },
  textoBotao: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
  botaoImagem: {
    backgroundColor: '#eee',
    paddingVertical: 12,
    paddingHorizontal: 14,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 6,
  },
  textoBotaoImagem: {
    color: '#555',
    fontSize: 14,
  },
});
