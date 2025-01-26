import React, { useState } from 'react';
import { View, Text, TextInput, Switch, StyleSheet, TouchableOpacity, Modal, Button } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Button as ButtonModal, ButtonText } from "@/components/ui/button";
import { Itim_400Regular } from '@expo-google-fonts/itim';
import { ScrollView } from 'react-native';

const PerfilScreen = () => {
  const [nome, setNome] = useState('Renan V. Guedes');
  const [curso, setCurso] = useState('Engenharia Aeroespacial');
  const [email, setEmail] = useState('renanv.guedes@aluno.unb.br');
  const [matricula, setMatricula] = useState('21012345');
  const [participarRanking, setParticiparRanking] = useState(true);
  const [modalVisible, setModalVisible] = useState(false);
  const [newSwitchValue, setNewSwitchValue] = useState(false); 

  const handleSwitchChange = (value: boolean) => {
    if (!value) {
      setNewSwitchValue(value);
      setModalVisible(true); 
    } else {
      setParticiparRanking(true);
    }
  };

  const confirmSwitchChange = () => {
    setParticiparRanking(false);
    setModalVisible(false);
  };

  const cancelSwitchChange = () => {
    setModalVisible(false);
    setNewSwitchValue(true); 
  };

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
            <Text style={{ fontSize: 16 }}>Desejo participar do ranking</Text>
            <Switch
              value={participarRanking}
              onValueChange={handleSwitchChange} 
              trackColor={{ false: '#9C9C9C', true: '#4CAF50' }} // Cor do fundo do switch
              thumbColor={participarRanking ? '#fff' : '#fff'} // Cor da bolinha do switch
              style={{ transform: [{ scaleX: 1.5 }, { scaleY: 1.5 }] }} // Aumenta o tamanho do switch
            />
          </View>
        </View>

        {/* Modal de Confirmação */}
        <Modal
          transparent={true}
          visible={modalVisible}
          onRequestClose={cancelSwitchChange}
        >
          <View style={styles.modalOverlay}>
            <View style={styles.modalContainer}>
              <Text style={styles.modalTitle}>Deseja desativar sua participação no ranking?</Text>
              <Text style={styles.modalMessage}>Essa ação fará você perder sua posição atual</Text>
              <View style={styles.modalButtons}>
                <Button title="Cancelar" onPress={cancelSwitchChange} color="#FF6347" />
                <Button title="Confirmar" onPress={confirmSwitchChange} color="#4CAF50" />
              </View>
            </View>
          </View>
        </Modal>

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
            <Text style={{ fontSize: 16, color: '#3b82f6' }}>Alterar senha</Text>
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
    justifyContent: 'center',
    width: 120,
    height: 100,
    backgroundColor: 'white',
    margin: 5,
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

  // Estilos para o Modal
  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContainer: {
    width: 300,
    padding: 20,
    backgroundColor: 'white',
    borderRadius: 10,
    alignItems: 'center',
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
  },
  modalMessage: {
    fontSize: 16,
    marginBottom: 20,
    textAlign: 'center',
  },
  modalButtons: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-evenly',
  },
});

export default PerfilScreen;
