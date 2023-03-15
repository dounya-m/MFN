import React, { memo, useState } from 'react';
import { View, StyleSheet, Text } from 'react-native';
// import { Navigation } from '../types';
import { NavigationProp, RouteProp } from '@react-navigation/native';
import MapView, { Region } from 'react-native-maps';
import Button from '../components/Button';
import BackButton from '../components/BackButton';
import  {RootStackParamList}  from '../types';



// export type RootStackParamList = {
//   Dashboard: { region: Region };
//   RegisterScreen: { region: Region };
//   HomeScreen: undefined;
// };

type Props = {
  navigation: NavigationProp<RootStackParamList, 'Dashboard'>;
  route: RouteProp<RootStackParamList, 'Dashboard'>;
  setErrorMsg: (msg: string) => void;
};

const Dashboard = ({ navigation }: Props) => {

  const [region, setRegion] = useState({
    latitude: 32.300815,
    longitude: -9.227203,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  });
  



  return (
    <View style={styles.container}>
      <MapView
        style={styles.map}
        initialRegion={{
          latitude: 32.300815,
          longitude: -9.227203,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
        onRegionChangeComplete={(region) => setRegion(region)}
      />
      <BackButton goBack={() => navigation.navigate('HomeScreen')} />
      
      <Text>Latitude: {region.latitude}</Text>
      <Text>Longitude: {region.longitude}</Text>
      <Button
        mode="contained"
        onPress={() => navigation.navigate('RegisterScreen', { region })}
      >
        Register
      </Button>

    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
  searchContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    padding: 10,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
  },
  searchInput: {
    flex: 1,
    marginRight: 10,
    height: 40,
    borderColor: 'gray',
    borderWidth: 1
  },
  text: {
    color: 'black',
    fontSize: 14,
    fontWeight: 'bold',
  },
});

export default memo(Dashboard);
