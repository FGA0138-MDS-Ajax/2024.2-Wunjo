import React from 'react';
import { View, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import ProfileHeader from '@/assets/images/profile-header';

export default function Profile() {
  const navigation = useNavigation();

  return (
    <View>
      <View style={styles.headerbox}>
        <ProfileHeader />
      </View>
      <View style={styles.container}>

      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  headerbox: {
    backgroundColor: '#173CAC',
    height: 200,
    justifyContent: 'center',
    alignItems: 'center',
  },
  header: {
    bottom: 0,
    height: '100%',
    transform: [{ scale: 2.3 }, { rotate: '180deg' }],
  },
});