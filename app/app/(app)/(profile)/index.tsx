import React, { useState } from 'react';
import { View, Text, ScrollView, Switch, StyleSheet, TouchableOpacity, Image, Modal } from 'react-native';
import { useRouter } from 'expo-router';
import { Button, ButtonText } from '@/components/ui/button';
import EditableInput from '@/components/ui/profileInput/EditableInput';
import NonEditableInput from '@/components/ui/profileInput/NonEditableInput';
import ProfileHeaderComponent from '@/components/ui/ProfileHeader';
import Coin from '@/assets/images/coin';
import { Select } from '@/components/ui/select';



// Simulação de um usuário
const usuario = {
  id: '1',
  nome: 'Renan V. Guedes',
  avatar: require('@/assets/avatars/avatar1.webp'),
  email: '21012345@aluno.unb.br',
  titulo: 'Marujo',
  curso: 'Engenharia Aeroespacial',
  matricula: '21012345',
  ranking: 1,
  respostas: 42,
  perguntas: 10,
};



const PerfilScreen = () => {

  const handleSwitchChange = (value: boolean) => {
    if (!value) {
      setModalVisible(true);
    } else {
      setParticiparRanking(value);
    }
  };

  const cancelSwitchChange = () => {
    setModalVisible(false);
  };

  const confirmSwitchChange = () => {
    setParticiparRanking(false);
    setModalVisible(false);
  };

  const handleLogout = () => {
    setModalLogoutVisible(false);
    while (router.canGoBack()) router.back()
  }

  const handleSave = () => {
    setIsEditingNome(false);
    setIsEditingCurso(false);

    //colocar logica para salvar as alteracoes
  };

  const handleCancel = () => {
    setIsEditingNome(false);
    setIsEditingCurso(false);
  };
  

  const [nome, setNome] = useState(usuario.nome);
  const [curso, setCurso] = useState(usuario.curso);
  const [email, setEmail] = useState(usuario.email);
  const [matricula, setMatricula] = useState(usuario.matricula);
  const [participarRanking, setParticiparRanking] = useState(true);
  const [isEditingNome, setIsEditingNome] = useState(false); // Estado para controlar a editabilidade do nome
  const [isEditingCurso, setIsEditingCurso] = useState(false); // Estado para controlar a editabilidade do curso
  const [modalVisible, setModalVisible] = useState(false); // Estado para controlar a visibilidade do modal
  const [modalLogoutVisible, setModalLogoutVisible] = useState(false);
  const [modalCursoVisible, setModalCursoVisible] = useState(false);

  const router = useRouter();


  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
      {/* Header */}
      <ProfileHeaderComponent
        photoUri={usuario.avatar}
        title={usuario.titulo}
        onBackPress={() => router.back()}
      />

      {/* Informações Pessoais */}
      <View style={styles.section}>
        <View style={styles.center}>
          <Text style={styles.sectionTitle}>Informações Pessoais</Text>
        </View>
        <Text style={styles.sectionSubTitle}>Nome</Text>
        <EditableInput
          value={nome}
          onChangeText={setNome}
          placeholder="Nome"
          editable={isEditingNome}
          onEditPress={() => setIsEditingNome(!isEditingNome)}
        />

        {/* Curso */}

        <Select
          label="Curso"
          placeholder="Selecione seu curso"
          value={curso}
          modalVisible={modalCursoVisible}
          setModalVisible={setModalCursoVisible}
        >
          {/* Lista de opções */}
          <TouchableOpacity onPress={() => { setCurso('Engenharias'); setModalCursoVisible(false); setIsEditingCurso(true); }}>
            <Text style={styles.optionText}>Engenharias</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => { setCurso('Engenharia Aeroespacial'); setModalCursoVisible(false); setIsEditingCurso(true); }}>
            <Text style={styles.optionText}>Engenharia Aeroespacial</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => { setCurso('Ciência da Computação'); setModalCursoVisible(false); setIsEditingCurso(true); }}>
            <Text style={styles.optionText}>Engenharia Automotiva</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => { setCurso('Engenharia de Energia'); setModalCursoVisible(false); setIsEditingCurso(true); }}>
            <Text style={styles.optionText}>Engenharia de Energia</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => { setCurso('Engenharia de Software'); setModalCursoVisible(false); setIsEditingCurso(true); }}>
            <Text style={styles.optionText}>Engenharia de Software</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => { setCurso('Engenharia Eletrônica'); setModalCursoVisible(false); setIsEditingCurso(true); }}>
            <Text style={styles.optionText}>Engenharia Eletrônica</Text>
          </TouchableOpacity>
        </Select>

        <Text style={styles.sectionSubTitle}>Email</Text>
        <NonEditableInput
          value={email}
          placeholder="Email"
        />

        <Text style={styles.sectionSubTitle}>Matrícula</Text>
        <NonEditableInput
          value={matricula}
          placeholder="Matrícula"
        />

        {(isEditingNome || isEditingCurso) && (
          <View style={styles.saveButtonContainer}>
            <TouchableOpacity onPress={handleCancel}>
              <Button size="lg" variant='outline' style={{width: 150, marginRight: 30}}>
                <ButtonText>cancelar</ButtonText>
              </Button>
            </TouchableOpacity>
            <TouchableOpacity onPress={handleSave}>
              <Button size="lg" style={{width: 150}}>
                <ButtonText>Salvar</ButtonText>
              </Button>
            </TouchableOpacity>
          </View>
        )}
      </View>
      <View style={styles.separator} />

      {/* Gamificação */}

      <View style={styles.section}>
        <View style={styles.center}>
          <Text style={styles.sectionTitle}>Gamificação</Text></View>
        <View style={styles.switchContainer}>
          <Text style={{ fontSize: 18, fontFamily: 'Raleway_400Regular' }}>Desejo participar do ranking</Text>
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
              <Button
                size="lg"
                variant='outline'
                action='primary'
                onPress={cancelSwitchChange}>
                <ButtonText>Cancelar</ButtonText>
              </Button>
              <Button
                size="lg"
                variant='solid'
                action='primary'
                onPress={confirmSwitchChange}>
                <ButtonText>Continuar</ButtonText>
              </Button>
            </View>
          </View>
        </View>
      </Modal>

      {/* Pontuação */}
      <View style={styles.pontuacaoContainer}>
        {participarRanking && (
          <View style={styles.pontuacaoItem}>
            <Text style={styles.pontuacaoNumero}>{usuario.ranking}°</Text>
            <Text>Ranking</Text>
          </View>
        )}
        <View style={styles.pontuacaoItem}>
          <Text style={styles.pontuacaoNumero}>{usuario.respostas}</Text>
          <Text>Respostas</Text>
        </View>
        <View style={styles.pontuacaoItem}>
          <Text style={styles.pontuacaoNumero}>{usuario.perguntas}</Text>
          <Text>Perguntas</Text>
        </View>
      </View>
      <View style={styles.pontuacaoContainer}>
        {participarRanking && (
          <View style={styles.pontuacaoItem}>
            <Text style={styles.pontuacaoNumero}>4,75⭐</Text>
            <Text>Média</Text>
          </View>
        )}
      </View>
      <View style={styles.pontuacaoContainer}>
        {participarRanking && (
          <View style={styles.moedasContainer}>
            <Text style={styles.moedasTexto}>459</Text>
            <Coin></Coin>
          </View>
        )}
      </View>
      <View style={styles.separator} />

      {/* Conta */}

      {/* Modal de Confirmação de Logout */}
      <Modal
        transparent={true}
        visible={modalLogoutVisible}
        onRequestClose={() => setModalLogoutVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContainer}>
            <Text style={styles.modalTitle}>Deseja sair da sua conta?</Text>
            <Text style={styles.modalMessage}>Você precisará logar novamente na próxima vez que entrar.</Text>
            <View style={styles.modalButtons}>
              <View style={{ flex: 1 }}>
                <Button
                  size="lg"
                  variant="outline"
                  onPress={() => setModalLogoutVisible(false)}
                  style={{ height: 50 }}
                >
                  <ButtonText>Cancelar</ButtonText>
                </Button>
                <Button
                  size="lg"
                  variant="solid"
                  onPress={handleLogout}
                  style={{ marginTop: 20, height: 55 }}
                >
                  <ButtonText>Sair</ButtonText>
                </Button>
              </View>
            </View>
          </View>
        </View>
      </Modal>

      <View style={styles.section}>
        <View style={styles.center}>
          <Text style={[styles.sectionTitle, { marginTop: 20 }]}>Conta</Text></View>

        <TouchableOpacity onPress={() => router.push('/(app)/(profile)/(delete)')}>
          <Text style={{ fontSize: 16, color: '#3b82f6' }}>Alterar senha</Text>
        </TouchableOpacity>

      </View>
      <TouchableOpacity onPress={() => router.push('/(app)/(profile)/(change)')}>
        <Text style={styles.deleteLink}>Excluir conta</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => {
        setModalLogoutVisible(true)
      }}>
        <Text style={styles.logoutText}>Sair da conta</Text>
      </TouchableOpacity>

    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F6FA',
  },
  contentContainer: {
    paddingBottom: 20, // Adiciona um padding no final para garantir que o conteúdo não seja cortado
  },
  headerContainer: {// Aumenta a altura do header para dar mais espaço
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
    width: '100%',
    transform: [{ scale: 1.3 }],
  },
  header: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    height: '100%',
  },
  profilePhotoContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
  },
  editIcon: {
    position: 'absolute',
    bottom: 0,
    right: -10,
  },
  backButton: {
    position: 'absolute',
    top: 50,
    left: 20,
    padding: 10,
    backgroundColor: 'transparent', // Torna o fundo transparente
  },
  profilePic: {
    width: 100,
    height: 100,
    borderRadius: 50,
    borderWidth: 1,
    borderColor: "",
    marginTop: 50, // Ajusta a margem para posicionar a imagem corretamente
  },
  headerTitle: {
    fontFamily: 'Itim_400Regular',
    color: 'white',
    fontSize: 24,
    fontWeight: 'bold',
    marginTop: 10,
  },
  section: {
    marginTop: 20,
    paddingHorizontal: 20,
  },
  center: { alignItems: 'center' },
  sectionTitle: {
    fontSize: 26,
    fontFamily: 'Itim_400Regular',
    marginBottom: 20,
    marginTop: 15,
    alignItems: 'center',
  },
  sectionSubTitle: {
    fontFamily: 'Itim_400Regular',
    fontSize: 16,
    marginTop: 5,
  },
  saveButtonContainer: {
    alignItems: 'center',
    margin: 5,
    flexDirection: 'row',
    justifyContent: 'center'
  },
  separator: {
    height: 1,
    marginHorizontal: 20,
    backgroundColor: '#CCCCCC',
    marginTop: 20,
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
    width: 82,
    height: 82,
    backgroundColor: '#FFFFFF',
    margin: 12,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.25,
    shadowRadius: 2,
    elevation: 2,
  },
  pontuacaoNumero: {
    fontSize: 18,
    color: '#173CAC',
    fontWeight: 'bold',
  },
  deleteLink: {
    marginLeft: 20,
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
  moedasContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 15,
  },
  moedasTexto: {
    fontSize: 24,
    color: '#173CAC',
  },
  optionText: {
    padding: 15,
    fontSize: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
});

export default PerfilScreen;