import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  Linking,
  ScrollView,
  TextInput,
  SafeAreaView,
  Platform,
  StatusBar,
  Alert,
} from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import AsyncStorage from '@react-native-async-storage/async-storage';

const STATUS_BAR_HEIGHT =
  Platform.OS === 'android' ? StatusBar.currentHeight : 0;

export default function DetalhesScreen({ route, navigation }) {
  const { evento } = route.params;
  const insets = useSafeAreaInsets();

  const comentariosIniciais = {
    'Festa de Rap': [
      {
        nome: 'Lucas',
        avaliacao: 5,
        comentario: 'A vibe da festa foi incrível, muito animada!',
      },
      {
        nome: 'Ana',
        avaliacao: 3,
        comentario: 'Adorei os shows, só achei o som um pouco alto.',
      },
      {
        nome: 'Thiago',
        avaliacao: 2,
        comentario: 'Achei que a organização deixou a desejar, filas enormes.',
      },
      {
        nome: 'Isabela',
        avaliacao: 4,
        comentario: 'Mesmo com o som alto, foi uma noite inesquecível!',
      },
    ],
    'Encontro de Skatistas': [
      {
        nome: 'João',
        avaliacao: 5,
        comentario: 'Boa pista, consegui aprender tricks novas nela!',
      },
      {
        nome: 'Marina',
        avaliacao: 5,
        comentario:
          'O pessoal da pista é muito gente boa, me ajudaram a trocar a lixa do meu shape.',
      },
      {
        nome: 'Caio',
        avaliacao: 5,
        comentario: 'Evento bem organizado, recomendo para todos!',
      },
      {
        nome: 'Renata',
        avaliacao: 3,
        comentario: 'O calor estava insuportável, devia ter mais sombra.',
      },
    ],
    'Feira de Arte Independente': [
      {
        nome: 'Beatriz',
        avaliacao: 5,
        comentario: 'Ótima variedade de artistas locais, adorei as pinturas!',
      },
      {
        nome: 'Carlos',
        avaliacao: 5,
        comentario: 'Consegui comprar umas artes lindas para a minha casa.',
      },
      {
        nome: 'Fernanda',
        avaliacao: 5,
        comentario: 'Ambiente acolhedor e cheio de criatividade.',
      },
      {
        nome: 'Rogério',
        avaliacao: 3,
        comentario: 'Algumas barracas estavam fechadas, o que foi meio chato.',
      },
    ],
    'Festival de Food Trucks': [
      {
        nome: 'Fernanda',
        avaliacao: 5,
        comentario:
          'Comida deliciosa e muita variedade, perfeito para levar a família.',
      },
      {
        nome: 'Pedro',
        avaliacao: 5,
        comentario: 'Gostei muito do hambúrguer artesanal, quero repetir!',
      },
      {
        nome: 'Laura',
        avaliacao: 5,
        comentario: 'Sobremesas incríveis, me apaixonei pelo churros!',
      },
      {
        nome: 'Igor',
        avaliacao: 3,
        comentario: 'Faltou mais opções veganas, fiquei um pouco decepcionado.',
      },
    ],
    'Noite de Stand-Up': [
      {
        nome: 'Ricardo',
        avaliacao: 5,
        comentario: 'Ri muito com os comediantes, valeu a pena!',
      },
      {
        nome: 'Mariana',
        avaliacao: 5,
        comentario: 'Humor inteligente e divertido, gostei bastante.',
      },
      {
        nome: 'Luiz',
        avaliacao: 5,
        comentario: 'Os comediantes foram ótimos, principalmente o último.',
      },
      {
        nome: 'Samantha',
        avaliacao: 4,
        comentario: 'O teatro estava meio abafado, mas o show compensou.',
      },
    ],
    'Maratona de Cinema': [
      {
        nome: 'Eduardo',
        avaliacao: 5,
        comentario: 'Sessão intensa, consegui ver todos os filmes que queria.',
      },
      {
        nome: 'Lúcia',
        avaliacao: 5,
        comentario: 'Adorei a seleção de filmes clássicos e independentes.',
      },
      {
        nome: 'Vinícius',
        avaliacao: 3,
        comentario:
          'As poltronas eram desconfortáveis, difícil aguentar tantas horas.',
      },
      {
        nome: 'Natália',
        avaliacao: 5,
        comentario: 'Experiência única, recomendo a todos os cinéfilos.',
      },
    ],
    'Workshop de Fotografia': [
      {
        nome: 'Sofia',
        avaliacao: 5,
        comentario: 'Aprendi várias técnicas novas, instrutor muito paciente.',
      },
      {
        nome: 'Felipe',
        avaliacao: 5,
        comentario:
          'Ótimo para quem quer começar a fotografar profissionalmente.',
      },
      {
        nome: 'Juliana',
        avaliacao: 5,
        comentario: 'Material didático excelente, bem completo.',
      },
      {
        nome: 'Marcelo',
        avaliacao: 3,
        comentario: 'Gostei, mas achei o preço um pouco salgado.',
      },
    ],
    'Festival de Jazz': [
      {
        nome: 'Ana Clara',
        avaliacao: 5,
        comentario: 'Música suave e ambiente perfeito para relaxar.',
      },
      {
        nome: 'Gustavo',
        avaliacao: 5,
        comentario: 'Banda sensacional, a melhor noite de jazz que já fui.',
      },
      {
        nome: 'Lara',
        avaliacao: 5,
        comentario: 'Som de qualidade e ótima estrutura.',
      },
      {
        nome: 'Fábio',
        avaliacao: 3,
        comentario: 'Faltou mais iluminação no local, ficou meio escuro.',
      },
    ],
    'Encontro de Carros Antigos': [
      {
        nome: 'Roberto',
        avaliacao: 5,
        comentario: 'Carros impecáveis, uma viagem no tempo!',
      },
      {
        nome: 'Patrícia',
        avaliacao: 5,
        comentario: 'Adorei conhecer histórias dos colecionadores.',
      },
      {
        nome: 'Eduarda',
        avaliacao: 5,
        comentario: 'Cada carro mais bonito que o outro, sensacional.',
      },
      {
        nome: 'Leandro',
        avaliacao: 5,
        comentario: 'Evento bem organizado e tranquilo.',
      },
    ],
    'Aula de Yoga ao Ar Livre': [
      {
        nome: 'Camila',
        avaliacao: 5,
        comentario: 'Sensação de paz e conexão com a natureza.',
      },
      {
        nome: 'Rafael',
        avaliacao: 5,
        comentario: 'Instrutor excelente, aula bem relaxante.',
      },
      {
        nome: 'Bruna',
        avaliacao: 5,
        comentario: 'Espaço amplo e ótimo para a prática.',
      },
      {
        nome: 'Cláudia',
        avaliacao: 3,
        comentario:
          'Só achei que poderia ter mais sombra para quem não gosta de sol.',
      },
    ],
  };

  const [comentarios, setComentarios] = useState(
    comentariosIniciais[evento.titulo] || []
  );

  const [novoComentario, setNovoComentario] = useState('');
  const [nomeNovoComentario, setNomeNovoComentario] = useState('');
  const [avaliacaoNovoComentario, setAvaliacaoNovoComentario] = useState('');
  const [marcadoComoIdo, setMarcadoComoIdo] = useState(false);
  const [adicionadoAosInteresses, setAdicionadoAosInteresses] = useState(false);

  useEffect(() => {
    verificarSeJaFoi();
    verificarSeJaAdicionadoInteresse();
  }, []);

  const verificarSeJaFoi = async () => {
    try {
      const roles = await AsyncStorage.getItem('meusRoles');
      const meusRoles = roles ? JSON.parse(roles) : [];
      const jaFui = meusRoles.some((item) => item.titulo === evento.titulo);
      setMarcadoComoIdo(jaFui);
    } catch (error) {
      console.log('Erro ao verificar rolês:', error);
    }
  };

  const verificarSeJaAdicionadoInteresse = async () => {
    try {
      const interesses = await AsyncStorage.getItem('meusInteresses');
      const meusInteresses = interesses ? JSON.parse(interesses) : [];
      const jaAdicionado = meusInteresses.some(
        (item) => item.titulo === evento.titulo
      );
      setAdicionadoAosInteresses(jaAdicionado);
    } catch (error) {
      console.log('Erro ao verificar interesses:', error);
    }
  };

  const marcarComoIdo = async () => {
    try {
      const roles = await AsyncStorage.getItem('meusRoles');
      const meusRoles = roles ? JSON.parse(roles) : [];
      const jaExiste = meusRoles.some((item) => item.titulo === evento.titulo);

      if (!jaExiste) {
        const novosRoles = [...meusRoles, evento];
        await AsyncStorage.setItem('meusRoles', JSON.stringify(novosRoles));
        setMarcadoComoIdo(true);
        Alert.alert('Sucesso!', 'Esse rolê foi salvo em "Meus rolês"');
      } else {
        const novosRoles = meusRoles.filter(
          (item) => item.titulo !== evento.titulo
        );
        await AsyncStorage.setItem('meusRoles', JSON.stringify(novosRoles));
        setMarcadoComoIdo(false);
        Alert.alert('Removido!', 'Esse rolê foi removido de "Meus rolês"');
      }
    } catch (error) {
      console.log('Erro ao salvar/remover rolê:', error);
    }
  };

  const adicionarOuRemoverInteresse = async () => {
    try {
      const interesses = await AsyncStorage.getItem('meusInteresses');
      const meusInteresses = interesses ? JSON.parse(interesses) : [];
      const jaExiste = meusInteresses.some(
        (item) => item.titulo === evento.titulo
      );

      if (!jaExiste) {
        const novosInteresses = [...meusInteresses, evento];
        await AsyncStorage.setItem(
          'meusInteresses',
          JSON.stringify(novosInteresses)
        );
        setAdicionadoAosInteresses(true);
        Alert.alert(
          'Adicionado!',
          'Esse evento foi salvo em "Meus interesses".'
        );
      } else {
        const novosInteresses = meusInteresses.filter(
          (item) => item.titulo !== evento.titulo
        );
        await AsyncStorage.setItem(
          'meusInteresses',
          JSON.stringify(novosInteresses)
        );
        setAdicionadoAosInteresses(false);
        Alert.alert(
          'Removido!',
          'Esse evento foi removido de "Meus interesses".'
        );
      }
    } catch (error) {
      console.log('Erro ao adicionar/remover interesse:', error);
    }
  };

  const abrirMapa = () => {
    const url = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
      evento.localizacao
    )}`;
    Linking.openURL(url);
  };

  const adicionarComentario = () => {
    if (nomeNovoComentario.trim() === '') {
      Alert.alert('Erro', 'Por favor, informe seu nome.');
      return;
    }
    const avaliacaoNum = Number(avaliacaoNovoComentario);
    if (isNaN(avaliacaoNum) || avaliacaoNum < 1 || avaliacaoNum > 5) {
      Alert.alert('Erro', 'Por favor, insira uma avaliação válida de 1 a 5.');
      return;
    }
    if (novoComentario.trim() === '') {
      Alert.alert('Erro', 'Por favor, escreva um comentário.');
      return;
    }

    const novo = {
      nome: nomeNovoComentario.trim(),
      avaliacao: avaliacaoNum,
      comentario: novoComentario.trim(),
    };

    setComentarios([...comentarios, novo]);
    setNomeNovoComentario('');
    setAvaliacaoNovoComentario('');
    setNovoComentario('');
    Alert.alert('Obrigado!', 'Comentário adicionado com sucesso.');
  };

  const calcularMedia = () => {
    if (comentarios.length === 0) return 0;
    const total = comentarios.reduce((sum, c) => sum + c.avaliacao, 0);
    return (total / comentarios.length).toFixed(1);
  };

  return (
    <SafeAreaView
      style={[
        styles.safeArea,
        {
          paddingTop: STATUS_BAR_HEIGHT + insets.top,
          paddingBottom: insets.bottom,
        },
      ]}>
      <ScrollView
        contentContainerStyle={[
          styles.container,
          { paddingBottom: insets.bottom + 30 },
        ]}
        keyboardShouldPersistTaps="handled">
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={styles.botaoVoltarWrapper}
          hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}>
          <LinearGradient
            colors={['#007bff', '#8e2de2']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            style={styles.botaoVoltar}>
            <FontAwesome name="arrow-left" size={24} color="#fff" />
          </LinearGradient>
        </TouchableOpacity>

        <Image source={evento.imagem} style={styles.imagem} />
        <Text style={styles.titulo}>{evento.titulo}</Text>
        <Text style={styles.categoria}>Categoria: {evento.categoria}</Text>
        <Text style={styles.data}>Data: {evento.data}</Text>
        <Text style={styles.localizacao}>Local: {evento.localizacao}</Text>

        <TouchableOpacity style={styles.botaoMapaWrapper} onPress={abrirMapa}>
          <LinearGradient
            colors={['#007bff', '#8e2de2']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            style={styles.botaoMapa}>
            <Text style={styles.textoBotao}>Ver no Mapa</Text>
          </LinearGradient>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.botaoMarcarWrapper}
          onPress={marcarComoIdo}>
          <LinearGradient
            colors={
              marcadoComoIdo ? ['#ff4d4d', '#ff0000'] : ['#007bff', '#8e2de2']
            }
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            style={styles.botaoMarcar}>
            <Text style={styles.textoBotao}>
              {marcadoComoIdo ? 'Remover dos meus rolês' : 'Marcar como ido'}
            </Text>
          </LinearGradient>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.botaoMarcarWrapper}
          onPress={adicionarOuRemoverInteresse}>
          <LinearGradient
            colors={
              adicionadoAosInteresses
                ? ['#ff9900', '#ff6600']
                : ['#007bff', '#8e2de2']
            }
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            style={styles.botaoMarcar}>
            <Text style={styles.textoBotao}>
              {adicionadoAosInteresses
                ? 'Remover dos meus interesses'
                : 'Adicionar aos meus interesses'}
            </Text>
          </LinearGradient>
        </TouchableOpacity>

        <View style={styles.secaoComentarios}>
          <Text style={styles.subtitulo}>Comentários</Text>
          <Text style={styles.media}>
            Média de avaliação: ⭐ {calcularMedia()} / 5
          </Text>

          {comentarios.length === 0 ? (
            <Text style={{ fontStyle: 'italic', color: '#666' }}>
              Nenhum comentário ainda.
            </Text>
          ) : (
            comentarios.map((item, index) => (
              <View key={index} style={styles.comentarioContainer}>
                <Text style={styles.nomeComentario}>{item.nome}</Text>
                <View style={styles.estrelasComentario}>
                  {[1, 2, 3, 4, 5].map((star) => (
                    <FontAwesome
                      key={star}
                      name={star <= item.avaliacao ? 'star' : 'star-o'}
                      size={16}
                      color="#fbc02d"
                    />
                  ))}
                </View>
                <Text style={styles.textoComentario}>{item.comentario}</Text>
              </View>
            ))
          )}

          <View style={styles.novoComentarioWrapper}>
            <Text style={styles.subtitulo}>Deixe seu comentário</Text>
            <TextInput
              placeholder="Seu nome"
              value={nomeNovoComentario}
              onChangeText={setNomeNovoComentario}
              style={styles.input}
            />
            <Text style={{ fontSize: 16, marginBottom: 5 }}>
              Sua avaliação:
            </Text>
            <View style={styles.estrelasInterativas}>
              {[1, 2, 3, 4, 5].map((star) => (
                <TouchableOpacity
                  key={star}
                  onPress={() => setAvaliacaoNovoComentario(String(star))}>
                  <FontAwesome
                    name={
                      star <= Number(avaliacaoNovoComentario)
                        ? 'star'
                        : 'star-o'
                    }
                    size={30}
                    color="#fbc02d"
                    style={{ marginHorizontal: 4 }}
                  />
                </TouchableOpacity>
              ))}
            </View>
            <TextInput
              placeholder="Seu comentário"
              value={novoComentario}
              onChangeText={setNovoComentario}
              style={[styles.input, { height: 80 }]}
              multiline
            />
            <TouchableOpacity
              style={styles.botaoComentarioWrapper}
              onPress={adicionarComentario}>
              <LinearGradient
                colors={['#007bff', '#8e2de2']}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
                style={styles.botaoComentario}>
                <Text style={styles.textoBotao}>Enviar Comentário</Text>
              </LinearGradient>
            </TouchableOpacity>
          </View>
        </View>
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
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  botaoVoltarWrapper: {
    marginBottom: 10,
  },
  botaoVoltar: {
    padding: 10,
    borderRadius: 50,
    alignSelf: 'flex-start',
  },
  imagem: {
    width: '100%',
    height: 200,
    borderRadius: 10,
    marginBottom: 10,
  },
  titulo: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  categoria: {
    fontSize: 16,
    color: '#555',
    marginBottom: 5,
  },
  data: {
    fontSize: 16,
    color: '#555',
    marginBottom: 5,
  },
  localizacao: {
    fontSize: 16,
    color: '#555',
    marginBottom: 10,
  },
  botaoMapaWrapper: {
    marginBottom: 10,
  },
  botaoMapa: {
    padding: 10,
    borderRadius: 10,
    alignItems: 'center',
  },
  botaoMarcarWrapper: {
    marginBottom: 10,
  },
  botaoMarcar: {
    padding: 10,
    borderRadius: 10,
    alignItems: 'center',
  },
  textoBotao: {
    color: '#fff',
    fontWeight: 'bold',
  },
  secaoComentarios: {
    marginTop: 20,
  },
  subtitulo: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  media: {
    fontSize: 16,
    marginBottom: 10,
  },
  comentarioContainer: {
    marginBottom: 10,
    backgroundColor: '#f9f9f9',
    padding: 10,
    borderRadius: 10,
  },
  nomeComentario: {
    fontWeight: 'bold',
    marginBottom: 5,
  },
  estrelasComentario: {
    flexDirection: 'row',
    marginBottom: 5,
  },
  textoComentario: {
    fontSize: 14,
  },
  novoComentarioWrapper: {
    marginTop: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 10,
    padding: 10,
    marginBottom: 10,
  },
  botaoComentarioWrapper: {},
  botaoComentario: {
    padding: 10,
    borderRadius: 10,
    alignItems: 'center',
  },
  estrelasInterativas: {
    flexDirection: 'row',
    marginBottom: 10,
  },
});
