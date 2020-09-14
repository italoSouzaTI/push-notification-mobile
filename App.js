import React, { useEffect, useState } from 'react';
import { View, Alert, Text } from 'react-native';
import messaging from '@react-native-firebase/messaging';

// import { Container } from './styles';

const notification = () => {
  const [newStatus, setNewStatus] = useState('sem Status')


  const handleNotificationOpen = (remoteMessage) => {
    if (remoteMessage) {
      console.log('app Aberto ', remoteMessage)
    }
  }


  useEffect(() => {
    const requestUserPermission = async () => {
      const authStatus = await messaging().requestPermission();
      console.log('Authorization status:', authStatus);

    }

    requestUserPermission();

    //pegando token do dispositivo
    messaging().getToken().then((token) => {
      console.log('Token do dispositivo', token)
    })

    const unsubscribe = messaging().onMessage(async (remoteMessage) => {
      console.log(`recebido`, remoteMessage)
      //background
      if (remoteMessage.data.newStatus) {
        setNewStatus(remoteMessage.data.newStatus)
      }
      //Evento para click em background
      messaging().onNotificationOpenedApp(handleNotificationOpen)
      //Evento para click na notificacao (com app fechado)
      messaging().getInitialNotification().then(handleNotificationOpen)
    });
    return unsubscribe
  }, []);




  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text>{newStatus}</Text>
    </View>
  );
}

export default notification;