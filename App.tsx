import './gesture-handler';
import { StyleSheet, Text, View } from 'react-native';
import HocManager from './src/lib/helpers/HocManager';
import { Provider } from "react-redux";
import { store } from "./src/lib/redux";

export default function App() {
  return (
    <View style={styles.container}>
      <Provider store={store}>
        <HocManager />
      </Provider>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff'
  },
});
