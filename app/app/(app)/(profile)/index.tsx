import Layout from '@/components/Layout';
import { Button } from '@/components/ui/button2';
import { Text } from '@/components/ui/text';
import { useUnBordo } from '@/hooks/unbordo';
import { useRouter } from 'expo-router';
import { View } from 'react-native';

export default function Profile() {
  const { auth } = useUnBordo();
  const route = useRouter();
  return (
    <View>
      <Layout className="mt-24">
        <Text>Perfil!</Text>
        <Button
          label="LOGOUT"
          onPress={async () => {
            await auth.unauthenticate();
            // route.replace('/');
          }}
        />
      </Layout>
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