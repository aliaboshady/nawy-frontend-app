import { StyleSheet, View } from 'react-native';
import Hero from './src/components/Hero';

export default function App() {
  return (
    <View style={styles.container}>
      <Hero />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});
