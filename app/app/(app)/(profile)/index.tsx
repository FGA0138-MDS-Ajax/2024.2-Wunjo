import React, { useState } from 'react';
import { View, Text, TextInput, Switch, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Itim_400Regular } from '@expo-google-fonts/itim';
import { ScrollView } from 'react-native';

const PerfilScreen = () => {
  const [nome, setNome] = useState('Renan V. Guedes');
  const [curso, setCurso] = useState('Engenharia Aeroespacial');
  const [email, setEmail] = useState('renanv.guedes@aluno.unb.br');
  const [matricula, setMatricula] = useState('21012345');
  const [participarRanking, setParticiparRanking] = useState(true);

  return (
    <ScrollView>
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

        <Text style={styles.sectionSubTitle}>Curso</Text>
        <TextInput
          style={styles.input}
          value={curso}
          onChangeText={setCurso}
          placeholder="Curso"
        />

        <Text style={styles.sectionSubTitle}>Email cadastrado</Text>
        <TextInput
          style={styles.input}
          value={email}
          onChangeText={setEmail}
          placeholder="Email cadastrado"
        />

        <Text style={styles.sectionSubTitle}>Matrícula</Text>
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
          <Text style={{fontSize: 16 }}>Desejo participar do ranking</Text>
          <Switch
            value={participarRanking}
            onValueChange={setParticiparRanking}
          />
        </View>
      </View>

      {/* Pontuação */}
      <View style={styles.pontuacaoContainer}>
        {participarRanking && (
        <View style={styles.pontuacaoItem}>
          <Text style={styles.pontuacaoNumero}>29°</Text>
          <Text>Ranking</Text>
        </View>
        )}
        <View style={styles.pontuacaoItem}>
          <Text style={styles.pontuacaoNumero}>209</Text>
          <Text>Respostas</Text>
        </View>
        <View style={styles.pontuacaoItem}>
          <Text style={styles.pontuacaoNumero}>10</Text>
          <Text>Perguntas</Text>
        </View>
      </View>
      <View style={styles.pontuacaoContainer}>
        {participarRanking && (
        <View style={styles.pontuacaoItem}>
          <Text style={styles.pontuacaoNumero}>4,75</Text>
          <Text>Média</Text>
        </View>
        )}
      </View>

      {/* Conta */}
      <View style={styles.section}>
        <Text style={[styles.sectionTitle, { marginTop: 20 }]}>Conta</Text>

        <TouchableOpacity>
          <Text style={{fontSize: 16, color: '#3b82f6'}}>Alterar senha</Text>
        </TouchableOpacity>

        <TouchableOpacity>
          <Text style={styles.deleteLink}>Excluir conta</Text>
        </TouchableOpacity>
      </View>

      <TouchableOpacity>
        <Text style={styles.logoutText}>Sair da conta</Text>
      </TouchableOpacity>
    </View>
    </ScrollView>
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
    fontFamily: 'Itim_400Regular',
    textAlign: 'center',
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  sectionSubTitle: {
    fontFamily: 'Itim_400Regular',
    fontSize: 16,
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
    justifyContent: 'center',
    borderRadius: 10,
  },
  pontuacaoItem: {
    alignItems: 'center',
    backgroundColor: 'white',
    margin: 10,
    padding: 20,
    borderRadius: 10,
  },
  pontuacaoNumero: {
    fontSize: 18,
    color: '#173CAC',
    fontWeight: 'bold',
  },
  deleteLink: {
    marginTop: 10,
    fontSize: 16,
    color: '#FF0000',
  },
  logoutText: {
    marginTop: 40,
    textAlign: 'center',
    color: 'red',
    fontSize: 16,
    fontFamily: 'Raleway_700Bold',
  },
});

export default PerfilScreen;