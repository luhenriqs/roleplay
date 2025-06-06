import React, { createContext, useState } from 'react';

export const EventosContext = createContext();

export const EventosProvider = ({ children }) => {
  const [eventos, setEventos] = useState([
    {
      id: '1',
      titulo: 'Festa de Rap',
      categoria: 'Música',
      data: '25/05/2025',
      localizacao: 'Praça Central',
      imagem: require('../assets/Rap.webp'),
    },
    {
      id: '2',
      titulo: 'Encontro de Skatistas',
      categoria: 'Esporte',
      data: '22/05/2025',
      localizacao: 'Pista Skate Park',
      imagem: require('../assets/Skate.webp'),
    },
    {
      id: '3',
      titulo: 'Feira de Arte Independente',
      categoria: 'Cultura',
      data: '30/05/2025',
      localizacao: 'Centro Cultural',
      imagem: require('../assets/Arte.webp'),
    },
    {
      id: '4',
      titulo: 'Festival de Food Trucks',
      categoria: 'Gastronomia',
      data: '28/05/2025',
      localizacao: 'Parque da Cidade',
      imagem: require('../assets/FoodTruck.webp'),
    },
    {
      id: '5',
      titulo: 'Noite de Stand-Up',
      categoria: 'Comédia',
      data: '27/05/2025',
      localizacao: 'Teatro Municipal',
      imagem: require('../assets/StandUp.webp'),
    },
    {
      id: '6',
      titulo: 'Maratona de Cinema',
      categoria: 'Cultura',
      data: '29/05/2025',
      localizacao: 'Cine Plaza',
      imagem: require('../assets/Cinema.webp'),
    },
    {
      id: '7',
      titulo: 'Workshop de Fotografia',
      categoria: 'Educação',
      data: '26/05/2025',
      localizacao: 'Estúdio Criativo',
      imagem: require('../assets/Fotografia.webp'),
    },
    {
      id: '8',
      titulo: 'Festival de Jazz',
      categoria: 'Música',
      data: '31/05/2025',
      localizacao: 'Praça das Artes',
      imagem: require('../assets/Jazz.webp'),
    },
    {
      id: '9',
      titulo: 'Encontro de Carros Antigos',
      categoria: 'Automobilismo',
      data: '01/06/2025',
      localizacao: 'Estacionamento Central',
      imagem: require('../assets/CarrosAntigos.webp'),
    },
    {
      id: '10',
      titulo: 'Aula de Yoga ao Ar Livre',
      categoria: 'Bem-estar',
      data: '02/06/2025',
      localizacao: 'Parque Verde',
      imagem: require('../assets/Yoga.webp'),
    },
  ]);

  const adicionarEvento = (novoEvento) => {
    setEventos((oldEventos) => [
      ...oldEventos,
      { ...novoEvento, id: (oldEventos.length + 1).toString() },
    ]);
  };

  
  const removerEvento = (id) => {
    setEventos((oldEventos) => oldEventos.filter(evento => evento.id !== id));
  };

  return (
    <EventosContext.Provider value={{ eventos, adicionarEvento, removerEvento }}>
      {children}
    </EventosContext.Provider>
  );
};
