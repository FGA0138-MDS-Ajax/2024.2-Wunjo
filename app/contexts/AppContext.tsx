import { IStudent } from '@/interfaces/application/Student';
import { createContext, useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { AuthService } from '@/http/services/auth';
import { useRouter } from 'expo-router';

interface AppContext {
  auth: AuthContext & {
    authenticate: (token: string) => Promise<void>;
    unauthenticate: () => Promise<void>;
  };
}

interface AuthContext {
  student: Omit<IStudent, 'password'>;
  isAuthenticated: boolean;
  token: string;
}

const initialState: AppContext = {
  auth: {
    student: {
      id: '',
      registration: '',
      status: 'PENDING',
      course: 'ENG',
      name: '',
      email: '',
      avatar: '',
      avatarUrl: '',
      rankingParticipant: false,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    isAuthenticated: false,
    token: '',
    authenticate: () => Promise.resolve(),
    unauthenticate: () => Promise.resolve(),
  },
};
const AppContext = createContext<AppContext>(initialState);

const AppProvider = ({ children }: { children: React.ReactNode }) => {
  const [auth, setAuth] = useState<AuthContext>(initialState.auth);
  const route = useRouter();

  const fetchAuth = async () => {
    const student = await AuthService.me();

    await AsyncStorage.setItem(
      'unbordo@student',
      JSON.stringify(student.data.student),
    );

    return student;
  };
  const authenticate = async (token: string) => {
    try {
      await AsyncStorage.setItem('unbordo@token', token);

      const student = await fetchAuth();

      setAuth({
        ...auth,
        isAuthenticated: true,
        token,
        student: student.data.student,
      });
    } catch (error) {
      console.error(error);
    }
  };

  const unauthenticate = async () => {
    await AsyncStorage.removeItem('unbordo@token');
    await AsyncStorage.removeItem('unbordo@student');

    setAuth({
      ...auth,
      isAuthenticated: false,
      token: '',
    });
  };

  useEffect(() => {
    const loadAuth = async () => {
      const token = await AsyncStorage.getItem('unbordo@token');
      if (token) {
        const student = await fetchAuth();

        setAuth({
          ...auth,
          isAuthenticated: true,
          token,
          student: student.data.student,
        });

        route.replace('/(app)/(home)');
      }
    };

    if (!auth.isAuthenticated) loadAuth();
  }, []);

  return (
    <AppContext.Provider
      value={{ auth: { ...auth, authenticate, unauthenticate } }}
    >
      {children}
    </AppContext.Provider>
  );
};

export default { Context: AppContext, Provider: AppProvider };
