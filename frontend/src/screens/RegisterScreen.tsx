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
  manadger: string;
  password: string;
}

const RegisterScreen = ({route, navigation }: Props) => {

  const [formData, setFormData] = useState<RegistrationData>({
    rs: '',
    tele: '',
    address: '',
    ice: '',
    manadger: '',
    password: '',
  });

  const handleInputChange = (key: keyof RegistrationData, value: string) => {
    setFormData({
      ...formData,
      [key]: value,
    });
  };

  const handleRegistration = () => {
    console.log(formData);
  
    fetch('http://192.168.10.23:5000/api/mfn/company', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        rs: formData.rs,
        tele: formData.tele,
        address: formData.address,
        ice: formData.ice,
        manadger: formData.manadger,
        password: formData.password,
      }),
    })
      .then((response) => response.json())
      .then((json) => {
        console.log(json);
      })
      .catch((error) => {
        console.error(error);
      });
  };
// const fetchApi = async () => {
//   try {
//     const response = await axios.get('http://192.168.10.23:5000/api/mfn/company')
//     console.log(response.data)
//   } catch (error) {
//     console.log(error)
//   }
// }
// useEffect(() => {
//   fetchApi()
//   console.log();
  
// }, []);

  

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
        label="Manadger"
        returnKeyType="next"
        value={formData.manadger}
        onChangeText={(value) => handleInputChange('manadger', value)}
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