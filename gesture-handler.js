import { Platform } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

if (Platform.OS === 'android') {
  if (typeof global.self === 'undefined') {
    global.self = global;
  }
}

export default GestureHandlerRootView;