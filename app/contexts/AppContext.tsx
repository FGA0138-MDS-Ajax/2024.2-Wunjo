import { IStudent } from '@/interfaces/application/Student';
import { createContext, useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { AuthService } from '@/services/http/services/auth';
import { connectToSocket } from '@/services/socket/client'
import { useRouter } from 'expo-router';
import { IQuestionFormInputs } from '@/app/(app)/(home)/(post)/post';
import { Socket } from 'socket.io-client';

interface AppContext {
  auth: AuthContext & {
    authenticate: (token: string) => Promise<void>;
    unauthenticate: () => Promise<void>;
  };
  forms: {
    question: IQuestionFormInputs;
    setQuestion: (forms: IQuestionFormInputs) => void;
  };
  socket: Socket | null;
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
  forms: {
    question: {
      subjectId: '',
      title: '',
      description: '',
      difficulty: '' as any,
      urgency: '' as any,
    },
    setQuestion: (_forms: IQuestionFormInputs) => {},
  },
  socket: null,
};
const AppContext = createContext<AppContext>(initialState);

const AppProvider = ({ children }: { children: React.ReactNode }) => {
  const [auth, setAuth] = useState<AuthContext>(initialState.auth);
  const [socket, setSocket] = useState<Socket | null>(null);
  const [questionForm, setQuestionForm] = useState(initialState.forms.question);
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

      const socketConn = connectToSocket(token);

      socketConn.emit('join', {
        id: student.data.student.id,
        registration: student.data.student.registration,
        name: student.data.student.name,
      });

      setSocket(socketConn);
    } catch (error) {
      console.error(error);
    }
  };

  const socketConnection = () => {
    if((auth.isAuthenticated && !socket) || (auth.isAuthenticated && !socket?.connected)) {
      const socketConn = connectToSocket(auth.token);

      socketConn.emit('join', {
        id: auth.student.id,
        registration: auth.student.registration,
        name: auth.student.name,
      });
    }
  }

  const unauthenticate = async () => {
    await AsyncStorage.removeItem('unbordo@token');
    await AsyncStorage.removeItem('unbordo@student');

    if (socket) {
      // To-do: hang-up on emit disconnect.
      //socket.emit('disconnect');
      socket.disconnect();
    }

    setAuth({
      ...auth,
      isAuthenticated: false,
      token: '',
    });

    route.replace({
      pathname: '/',
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

        const socketConn = connectToSocket(token);

        socketConn.emit('join', {
          id: student.data.student.id,
          registration: student.data.student.registration,
          name: student.data.student.name,
        });
  
        setSocket(socketConn);

        route.replace('/(app)/(home)');
      }
    };

    if (!auth.isAuthenticated) loadAuth();
  }, []);


  useEffect(() => {
    socketConnection();
  }, [socket, socket?.connect])

  return (
    <AppContext.Provider
      value={{
        auth: { ...auth, authenticate, unauthenticate },
        forms: {
          question: questionForm,
          setQuestion: setQuestionForm,
        },
        socket,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export default { Context: AppContext, Provider: AppProvider };
