import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  Image,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useIsFocused } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context'; 

export default function MeusRolesScreen({ navigation }) {
  const [meusRoles, setMeusRoles] = useState([]);
  const isFocused = useIsFocused();

  useEffect(() => {
    carregarMeusRoles();
  }, [isFocused]);

  const carregarMeusRoles = async () => {
    try {
      const roles = await AsyncStorage.getItem('meusRoles');
      const meusRoles = roles ? JSON.parse(roles) : [];
      setMeusRoles(meusRoles);
    } catch (error) {
      console.log('Erro ao carregar meus rolês:', error);
    }
  };

  const renderItem = ({ item }) => (
    <TouchableOpacity
      style={styles.itemContainer}
      onPress={() => navigation.navigate('Detalhes', { evento: item })}
    >
      <Image source={item.imagem} style={styles.imagem} />
      <View>
        <Text style={styles.titulo}>{item.titulo}</Text>
        <Text style={styles.localizacao}>{item.localizacao}</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>  {/* Use SafeAreaView aqui */}
      <Text style={styles.header}>Meus Rolês</Text>
      <FlatList
        data={meusRoles}
        keyExtractor={(item, index) => index.toString()}
        renderItem={renderItem}
        ListEmptyComponent={<Text>Nenhum rolê marcado ainda.</Text>}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#fff', // ajuda na visualização
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  itemContainer: {
    flexDirection: 'row',
    marginBottom: 12,
    alignItems: 'center',
  },
  imagem: {
    width: 60,
    height: 60,
    borderRadius: 10,
    marginRight: 12,
  },
  titulo: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  localizacao: {
    color: '#666',
  },
});
