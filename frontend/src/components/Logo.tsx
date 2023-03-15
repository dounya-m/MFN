import React, { memo } from 'react';
import { Image, Text,StyleSheet, View } from 'react-native';

const Logo = () => (
  <View>
    <Text style={styles.text}>MFN</Text>
  </View>
);

const styles = StyleSheet.create({
  text:{
    fontSize: 50,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#6D00C7',
  }
});

export default memo(Logo);
