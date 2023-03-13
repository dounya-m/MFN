import React, { memo, useState, useEffect } from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Navigation } from '../types';
import MapView, { Region, Marker } from 'react-native-maps';
import Button from '../components/Button';
import BackButton from '../components/BackButton';
import * as Location from 'expo-location'

type Props = {
  navigation: Navigation;
  region: Region;
  setErrorMsg: (msg: string) => void;
  // enableHighAccuracy: boolean;
};
interface Location {
  latitude: number;
  longitude: number;
  id: number;
}

const navigation = useNavigation();

const Dashboard = ({ navigation, setErrorMsg }: Props) => {
  // const [searchQuery, setSearchQuery] = useState('');
  // const [region, setRegion] = useState<Region | undefined>();

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
      //onRegionChangeComplete runs when the user stops dragging MapView
      onRegionChangeComplete={(region) => setRegion(region)}
    />
    <BackButton goBack={() => navigation.navigate('HomeScreen')} />
    {/*Display user's current region:*/}
    <Text style={styles.text}>Current latitude: {region.latitude}</Text>
    <Text style={styles.text}>Current longitude: {region.longitude}</Text>
    <Button
  mode="outlined"
  //onePress navigate with the current region to the next screen
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
