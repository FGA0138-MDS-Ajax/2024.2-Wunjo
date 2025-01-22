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
}
