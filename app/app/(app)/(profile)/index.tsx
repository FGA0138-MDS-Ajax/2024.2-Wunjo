import React, { useState } from 'react';
import { View, Text, TextInput, Switch, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const PerfilScreen = () => {
  const [nome, setNome] = useState('Renan V. Guedes');
  const [curso, setCurso] = useState('Engenharia Aeroespacial');
  const [email, setEmail] = useState('renanv.guedes@aluno.unb.br');
  const [matricula, setMatricula] = useState('21012345');
  const [participarRanking, setParticiparRanking] = useState(true);

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Ionicons name="person-circle" size={80} color="white" />
        <Text style={styles.headerTitle}>Título</Text>
      </View>

      {/* Informações Pessoais */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Informações Pessoais</Text>

        <Text style={styles.sectionSubTitle}>Nome</Text>
        <TextInput
          style={styles.input}
          value={nome}
          onChangeText={setNome}
          placeholder="Nome"
        />

        <TextInput
          style={styles.input}
          value={curso}
          onChangeText={setCurso}
          placeholder="Curso"
        />

        <TextInput
          style={styles.input}
          value={email}
          onChangeText={setEmail}
          placeholder="Email cadastrado"
        />

        <TextInput
          style={styles.input}
          value={matricula}
          onChangeText={setMatricula}
          placeholder="Matrícula"
        />
      </View>

      {/* Gamificação */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Gamificação</Text>
        <View style={styles.switchContainer}>
          <Text>Desejo participar do ranking</Text>
          <Switch
            value={participarRanking}
            onValueChange={setParticiparRanking}
          />
        </View>
      </View>

      {/* Pontuação */}
      <View style={styles.pontuacaoContainer}>
        <View style={styles.pontuacaoItem}>
          <Text style={styles.pontuacaoNumero}>29</Text>
          <Text>Cursos</Text>
        </View>
        <View style={styles.pontuacaoItem}>
          <Text style={styles.pontuacaoNumero}>209</Text>
          <Text>Atividades</Text>
        </View>
        <View style={styles.pontuacaoItem}>
          <Text style={styles.pontuacaoNumero}>10</Text>
          <Text>Amigos</Text>
        </View>
      </View>

      {/* Conta */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Conta</Text>

        <TouchableOpacity>
          <Text style={styles.link}>Alterar senha</Text>
        </TouchableOpacity>

        <TouchableOpacity>
          <Text style={[styles.link, styles.deleteLink]}>Excluir conta</Text>
        </TouchableOpacity>
      </View>

      <TouchableOpacity style={styles.logoutButton}>
        <Text style={styles.logoutText}>Sair da conta</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    padding: 20,
  },
  header: {
    alignItems: 'center',
    backgroundColor: '#3b82f6',
    paddingVertical: 20,
    borderRadius: 10,
    marginBottom: 20,
  },
  headerTitle: {
    color: 'white',
    fontSize: 20,
    marginTop: 10,
  },
  section: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 16,
    fontFamily: 'Itim_400Regular',
    fontWeight: 'bold',
    marginBottom: 10,
  },
  sectionSubTitle: {
    fontSize: 14,
    marginBottom: 5,
  },
  input: {
    backgroundColor: 'white',
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
  },
  switchContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  pontuacaoContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    backgroundColor: 'white',
    padding: 10,
    borderRadius: 10,
    marginBottom: 20,
  },
  pontuacaoItem: {
    alignItems: 'center',
  },
  pontuacaoNumero: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  link: {
    color: '#3b82f6',
    marginBottom: 10,
  },
  deleteLink: {
    color: 'red',
  },
  logoutButton: {
    marginTop: 20,
    padding: 15,
    backgroundColor: 'red',
    borderRadius: 5,
    alignItems: 'center',
  },
  logoutText: {
    color: 'white',
    fontSize: 16,
  },
});

export default PerfilScreen;