import { io } from 'socket.io-client';

const socket = io('ws://192.168.1.14:3000', {
  reconnectionDelayMax: 10000,
  auth: {
    token:
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdHVkZW50X2lkIjoiZDZkZWYyNmYtNWZmNC00OTQ2LTlkNjAtMjU1ZmE3MjY5MDFkIiwiaWF0IjoxNzM4NTU0MDE3LCJleHAiOjE3Mzg2NDA0MTcsImlzcyI6IlVuQm9yZG8ifQ.6ZAPckzOrY-YD2UoKVzs-3E9A93fFxy-ZaONuyhsFz4',
  },
});

socket.emit('join', {
  id: '582323ab-0156-468f-8b18-aed1181f5be2',
  name: 'David William',
  registration: '232001649',
});

socket.on('79568da5-81e0-460b-84cf-6ebe073db539', (data) => {
  console.log(data, 'MESSAGE RECEIVED');
});

setTimeout(() => {
  socket.emit('send-message', {
    chatId: '79568da5-81e0-460b-84cf-6ebe073db539',
    message: 'Hello, world 2!',
  });
}, 1000);
