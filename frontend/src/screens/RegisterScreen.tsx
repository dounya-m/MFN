import React, { memo, useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import Background from '../components/Background';
import Logo from '../components/Logo';
import Header from '../components/Header';
import Button from '../components/Button';
import TextInput from '../components/TextInput';
import BackButton from '../components/BackButton';
import { theme } from '../core/theme';
import { Navigation } from '../types';
import { RouteProp } from '@react-navigation/native';
import {  emailValidator,  passwordValidator, nameValidator,} from '../core/utils';
import  {RootStackParamList}  from '../types';
import axios from 'axios';

type Props = {
  navigation: Navigation;
  route: RouteProp<RootStackParamList, 'RegisterScreen'>;
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

const RegisterScreen = ({route, navigation }: Props) => {

  const [formData, setFormData] = useState<RegistrationData>({
    rs: '',
    tele: '',
    address: '',
    ice: '',
    lat: '',
    log: '',
    password: '',
  });

  const [error, setError] = useState('');

  const handleInputChange = async(name: string, value: string) => {
    setFormData({ ...formData, [name]: value });
  };

  const handleRegistration = () => {
  console.log(formData);


    axios.post('http://192.168.10.23:5000/api/mfn/company', {
      rs: formData.rs,
      tele: formData.tele,
      address: formData.address,
      ice: formData.ice,
      lat: formData.lat,
      log: formData.log,
      password: formData.password,
    })
      .then((response) => {
        console.log(response);
        navigation.navigate('Dashboard');
      })
      .catch((error) => {
        console.log(error);
      });
  };

  

  return (
    <ScrollView>
      <Background>
      <Text></Text>
      <Text></Text>

      <BackButton goBack={() => navigation.navigate('Dashboard')} />

      <Logo />

      <Header>Add Your Copany</Header>

      <TextInput
        label="raison sociale"
        returnKeyType="next"
        value={formData.rs}
        onChangeText={(value) => handleInputChange('rs', value)}
      />

<TextInput
        label="Téléphone"
        returnKeyType="next"
        value={formData.tele}
        onChangeText={(value) => handleInputChange('tele', value)}
        autoCapitalize="none"
        keyboardType="numeric"
      />

      <TextInput
        label="Address"
        returnKeyType="next"
        value={formData.address}
        onChangeText={(value) => handleInputChange('address', value)}
        autoCapitalize="none"
      />

<TextInput
        label="ICE"
        returnKeyType="next"
        value={formData.ice}
        onChangeText={(value) => handleInputChange('ice', value)}
        autoCapitalize="none"
        // autoCompleteType="email"
      />
<TextInput
        label="Latitude"
        returnKeyType="next"
        value={formData.lat}
        onChangeText={(value) => handleInputChange('lat', value)}
        autoCapitalize="none"
      />

<TextInput
        label="Longitude"
        returnKeyType="next"
        value={formData.log}
        onChangeText={(value) => handleInputChange('log', value)}
        autoCapitalize="none"
      />

      <TextInput
        label="Password"
        returnKeyType="done"
        value={formData.password}
        onChangeText={(value) => handleInputChange('password', value)}
        secureTextEntry
      />

      <Button mode="contained"  onPress={() => handleRegistration()} style={styles.button}>
        Sign Up
      </Button>

      <View style={styles.row}>
        <Text style={styles.label}>Already have an account? </Text>
        <TouchableOpacity onPress={() => navigation.navigate('LoginScreen')}>
          <Text style={styles.link}>Login</Text>
        </TouchableOpacity>
      </View>
    </Background>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  label: {
    color: theme.colors.secondary,
  },
  button: {
    marginTop: 24,
  },
  row: {
    flexDirection: 'row',
    marginTop: 4,
  },
  link: {
    fontWeight: 'bold',
    color: theme.colors.primary,
  },
});

export default memo(RegisterScreen);