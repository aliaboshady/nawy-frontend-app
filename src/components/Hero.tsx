import { StyleSheet, View, Image } from 'react-native';

export default function Hero() {
  return (
    <View style={styles.topBar}>
      <Image
        source={require('../../assets/nawy_logo.png')}
        style={styles.logo}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  topBar: {
    width: '100%',
    height: '12%',
    borderBottomWidth: 0.5,
    borderColor: '#c2c2c2',
    justifyContent: 'center',
  },
  logo: {
    marginTop: '8%',
    marginLeft: '3%',
    width: '25%',
    height: '25%',
  },
});
