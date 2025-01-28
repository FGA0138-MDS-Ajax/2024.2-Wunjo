import React, { useState } from 'react';
import { View, Text, ScrollView, Switch, StyleSheet, TouchableOpacity, Image, Modal } from 'react-native';
import { BackHeader } from '@/components/ui/backheader';
import { useRouter } from 'expo-router';
import ProfileHeader from '@/assets/images/profile-header';
import { Button, ButtonText } from '@/components/ui/button';
import EditableInput from '@/components/ui/profileInput/EditableInput';
import NonEditableInput from '@/components/ui/profileInput/NonEditableInput';

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
    const [nome, setNome] = useState('Renan V. Guedes');
    const [curso, setCurso] = useState('Engenharia Aeroespacial');
    const [email, setEmail] = useState('renanv.guedes@aluno.unb.br');
    const [matricula, setMatricula] = useState('21012345');
    const [participarRanking, setParticiparRanking] = useState(true);
    const [isEditingNome, setIsEditingNome] = useState(false); // Estado para controlar a editabilidade do nome
    const [isEditingCurso, setIsEditingCurso] = useState(false); // Estado para controlar a editabilidade do curso
    const [modalVisible, setModalVisible] = useState(false); // Estado para controlar a visibilidade do modal

    const handleSave = () => {
        setIsEditingNome(false);
        setIsEditingCurso(false);
        // Adicione aqui a lógica para salvar as alterações, se necessário
    };

    const router = useRouter();
    return (
        <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
            {/* Header */}
            <View style={styles.headerContainer}>
                <ProfileHeader style={styles.header} />
                <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
                    <BackHeader onPress={() => router.back()} label="" />
                </TouchableOpacity>
                <Image source={{ uri: 'https://picsum.photos/68' }} style={styles.profilePic} />
                <Text style={styles.headerTitle}>Título</Text>
            </View>

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

                <Text style={styles.sectionSubTitle}>Curso</Text>
                <EditableInput
                    value={curso}
                    onChangeText={setCurso}
                    placeholder="Curso"
                    editable={isEditingCurso}
                    onEditPress={() => setIsEditingCurso(!isEditingCurso)}
                />

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
                        <TouchableOpacity onPress={handleSave}>
                            <Button size="lg">
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
            <View style={styles.pontuacaoContainer}>
    {participarRanking && (
        <View style={styles.moedasContainer}>
            <Text style={styles.moedasTexto}>459🪙</Text>
        </View>
    )}
</View>
            <View style={styles.separator} />

            {/* Conta */}
            <View style={styles.section}>
                <View style={styles.center}>
                    <Text style={[styles.sectionTitle, { marginTop: 20 }]}>Conta</Text></View>

                <TouchableOpacity onPress={() => router.push('/alterarSenha')}>
                    <Text style={{ fontSize: 16, color: '#3b82f6' }}>Alterar senha</Text>
                </TouchableOpacity>

            </View>
            <TouchableOpacity onPress={() => router.push('/excluirConta')}>
                <Text style={styles.deleteLink}>Excluir conta</Text>
            </TouchableOpacity>

            <TouchableOpacity>
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
    headerContainer: {
        height: 220, // Aumenta a altura do header para dar mais espaço
        backgroundColor: '#173CAC',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative',
    },
    header: {
        position: 'absolute',
        bottom: 0,
        width: '100%',
        height: '100%',
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
        alignItems: 'center',
        marginTop: 15,
    },
    moedasTexto: {
        fontSize: 24,
        color: '#173CAC',
    },
});

export default PerfilScreen;
