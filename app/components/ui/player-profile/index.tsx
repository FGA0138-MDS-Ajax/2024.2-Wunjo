import Coin from '@/assets/images/coin';
import React from 'react';
import { View, Text, Image, StyleSheet, ImageBackground } from 'react-native';
import { BackHeader } from '../backheader';
import { useRouter } from 'expo-router';

interface User {
  id: string;
  avatar: any;
  name: string;
  course: string;
  title: string;
  ranking: number;
  answers: number;
  questions: number;
  points: number;
  gamification: boolean;
}

const ProfileScreen = ({ user }: { user: User }) => {
  const router = useRouter();
  const backgroundImage = require('../../../assets/images/background.jpg');

  return (
    <ImageBackground 
    source={backgroundImage} 
    style={styles.background}>

      <BackHeader style={styles.backButton} onPress={() => router.back()} label="" />

      <View style={styles.headerContainer}>
        <Image style={styles.profilePic} source={user.avatar} />
        <View>{user.gamification &&(<Text style={styles.headerTitle}>{user.title}</Text>)}
        </View>
      </View>

        <Text style={styles.textName}>{user.name}</Text>
        <Text style={styles.textCourse}>{user.course}</Text>

      <View style={styles.pontuacaoContainer}>
        {user.gamification && (
          <View style={styles.pontuacaoItem}>
            <Text style={styles.pontuacaoNumero}>{user.ranking}°</Text>
            <Text>Ranking</Text>
          </View>
        )}
        <View style={styles.pontuacaoItem}>
          <Text style={styles.pontuacaoNumero}>{user.answers}</Text>
          <Text>Respostas</Text>
        </View>
        <View style={styles.pontuacaoItem}>
          <Text style={styles.pontuacaoNumero}>{user.questions}</Text>
          <Text>Perguntas</Text>
        </View>
      </View>

      <View style={styles.pontuacaoContainer}>
        {user.gamification && (
          <View style={styles.moedasContainer}>
            <Text style={styles.moedasTexto}>{user.points}</Text>
            <Coin />
          </View>
        )}
      </View>

    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
    resizeMode: 'cover',
  },
  backButton: {
    position: 'absolute',
    top: 50,
    left: 20,
    padding: 10,
    backgroundColor: 'transparent',
  },
  container: {
    flex: 1,
    backgroundColor: '#F5F6FA',
    alignItems: 'center',
  },
  textName:
  {
    fontFamily: 'Raleway_400Regular',
    fontSize: 26,
    color: '#000',
    textAlign: 'center',
  },
  textCourse:
  {
    fontFamily: 'Raleway_400Regular',
    fontSize: 20,
    color: '#000',
    textAlign: 'center',
  },
  headerContainer: {
    flexDirection: 'column',
    alignItems: 'center',
    marginTop: 60,
    paddingBottom: 132,
  },
  profilePic: {
    width: 100,
    height: 100,
    borderRadius: 50,
    borderWidth: 1,
    borderColor: '#000',
    marginBottom: 10,
  },
  headerTitle: {
    fontFamily: 'Itim_400Regular',
    color: 'white',
    fontSize: 24,
  },
  pontuacaoContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    borderRadius: 10,
    marginTop: 20,
  },
  pontuacaoItem: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 82,
    height: 82,
    backgroundColor: '#FFFFFF',
    margin: 12,
    marginBottom: 30,
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
  moedasContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 15,
  },
  moedasTexto: {
    fontSize: 24,
    color: '#173CAC',
  },
  separator: {
    height: 1,
    backgroundColor: '#969696',
    width: '90%',
    alignSelf: 'center',
    marginVertical: 20,
  },
});

export default ProfileScreen;