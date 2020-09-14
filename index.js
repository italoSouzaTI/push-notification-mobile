/**
 * @format
 */

import { AppRegistry } from 'react-native';
import App from './App';
import { name as appName } from './app.json';
import messaging from '@react-native-firebase/messaging'
//recebendo notificacao em background
messaging().setBackgroundMessageHandler(async (remoteMessage) => {
  console.log('recebendo no Background', remoteMessage);
});

AppRegistry.registerComponent(appName, () => App);
