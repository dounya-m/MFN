import React, { memo, useState } from 'react';
import { useRoute } from '@react-navigation/native';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import Background from '../components/Background';
import Logo from '../components/Logo';
import Header from '../components/Header';
import Button from '../components/Button';
import TextInput from '../components/TextInput';
import BackButton from '../components/BackButton';
import { theme } from '../core/theme';
import { Navigation } from '../types';
import {
  emailValidator,
  passwordValidator,
  nameValidator,
} from '../core/utils';


type Props = {
  navigation: Navigation;
};

const RegisterScreen = ({ navigation }: Props) => {



  const [rs, setRs] = useState({ value: '', error: '' });
  const [tele, setTele] = useState({ value: '', error: '' });
  const [address, setAdress] = useState({ value: '', error: '' });
  const [ice, setIce] = useState({ value: '', error: '' });
  const [manadger, setManadger] = useState({ value: '', error: '' });
  const [password, setPassword] = useState({ value: '', error: '' });

  const _onSignUpPressed = () => {
    const rsError = nameValidator(rs.value);
    const teleError = emailValidator(tele.value);
    const addressError = emailValidator(address.value);
    const iceError = emailValidator(ice.value);
    const manadgerError = emailValidator(manadger.value);
    const passwordError = passwordValidator(password.value);

    if (rsError || teleError || addressError || iceError || manadgerError || passwordError) {
      setRs({ ...rs, error: rsError });
      setTele({ ...tele, error: teleError });
      setAdress({ ...address, error: addressError });
      setIce({ ...ice, error: iceError });
      setManadger({ ...manadger, error: manadgerError });
      setPassword({ ...password, error: passwordError });
      return;
    }

    navigation.navigate('Dashboard');
  };
  const route = useRoute();
  const { region } = route.params;
  const { latitude, longitude } = region;

  return (
    <Background>
      <Text>Latitude: {latitude}</Text>
      <Text>Longitude: {longitude}</Text>
      <BackButton goBack={() => navigation.navigate('Dashboard')} />

      <Logo />

      <Header>Create Account</Header>

      <TextInput
        label="raison sociale"
        returnKeyType="next"
        value={rs.value}
        onChangeText={text => setRs({ value: text, error: '' })}
        error={!!rs.error}
        errorText={rs.error}
      />

<TextInput
        label="Téléphone"
        returnKeyType="next"
        value={tele.value}
        onChangeText={text => setTele({ value: text, error: '' })}
        error={!!tele.error}
        errorText={tele.error}
        autoCapitalize="none"
        keyboardType="numeric"
      />

      <TextInput
        label="Address"
        returnKeyType="next"
        value={address.value}
        onChangeText={text => setAdress({ value: text, error: '' })}
        error={!!address.error}
        errorText={address.error}
        autoCapitalize="none"
        // autoCompleteType="email"

      />

<TextInput
        label="ICE"
        returnKeyType="next"
        value={ice.value}
        onChangeText={text => setIce({ value: text, error: '' })}
        error={!!ice.error}
        errorText={ice.error}
        autoCapitalize="none"
        // autoCompleteType="email"
      />
      <TextInput
        label="Manadger"
        returnKeyType="next"
        value={manadger.value}
        onChangeText={text => setManadger({ value: text, error: '' })}
        error={!!manadger.error}
        errorText={manadger.error}
        autoCapitalize="none"
      />

      <TextInput
        label="Password"
        returnKeyType="done"
        value={password.value}
        onChangeText={text => setPassword({ value: text, error: '' })}
        error={!!password.error}
        errorText={password.error}
        secureTextEntry
      />

      <Button mode="contained" onPress={_onSignUpPressed} style={styles.button}>
        Sign Up
      </Button>

      <View style={styles.row}>
        <Text style={styles.label}>Already have an account? </Text>
        <TouchableOpacity onPress={() => navigation.navigate('LoginScreen')}>
          <Text style={styles.link}>Login</Text>
        </TouchableOpacity>
      </View>
    </Background>
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