import React, { memo, useState, useEffect } from 'react';
import { View, StyleSheet, Text } from 'react-native';
// import { Navigation } from '../types';
import { NavigationProp, RouteProp } from '@react-navigation/native';
import MapView, { Region, Marker } from 'react-native-maps';
import Button from '../components/Button';
import BackButton from '../components/BackButton';
import  {RootStackParamList}  from '../types';
import axios from 'axios';



type Props = {
  navigation: NavigationProp<RootStackParamList, 'Dashboard'>;
  route: RouteProp<RootStackParamList, 'Dashboard'>;
  setErrorMsg: (msg: string) => void;
};

interface RegistrationData {
  rs: string;
  tele: string;
  address: string;
  ice: string;
  lat: string;
  log: string;
  password: string;
}
const Dashboard = ({ navigation }: Props) => {


  const [region, setRegion] = useState({
    latitude: 32.300815,
    longitude: -9.227203,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  });
console.log(region);


const [data, setData] = useState<RegistrationData[]>([]);
useEffect(() => {
  axios.get('http://192.168.10.23:5000/api/mfn/company')
    .then((response) => {
      setData(response.data);
      console.log(response.data[0].lat);
      
    }
    )
    .catch((error) => {
      console.log(error);
    });
}, []);





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
      >
        {data.length > 0 && data.map((marker: RegistrationData, index: number) => (
          <Marker
            key={index}
            coordinate={{
              latitude: parseFloat(marker.lat),
              longitude: parseFloat(marker.log),
            }}
            title={marker.rs}
            description={marker.address}
          />
        ))}

      </MapView>
      <BackButton goBack={() => navigation.navigate('HomeScreen')} />
      
      <Text style={styles.text}>Current latitude: {region.latitude}</Text>
      <Text style={styles.text}>Current longitude: {region.longitude}</Text>
      <Button
        mode="contained"
        onPress={() => navigation.navigate('RegisterScreen', { region })}
      >
        Register
      </Button>
      <Button
        mode="contained"
        onPress={() => navigation.navigate('CompanyScreen')}
      >
        Company
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
