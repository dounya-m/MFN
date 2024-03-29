import React, { memo } from 'react';
import Background from '../components/Background';
import Logo from '../components/Logo';
import Header from '../components/Header';
import Button from '../components/Button';
import Paragraph from '../components/Paragraph';
import { Navigation } from '../types';

type Props = {
  navigation: Navigation;
};

const HomeScreen = ({ navigation }: Props) => (
  <Background>
    <Logo />

    <Header>Login Page</Header>

    <Paragraph>
      The easiest way to start with your amazing application.
    </Paragraph>
    <Button mode="contained" onPress={() => navigation.navigate('RegisterScreen')}>
      Add Company
    </Button>
    <Button
      mode="outlined"
      onPress={() => navigation.navigate('Dashboard')}
    >
      Guest
    </Button>

  </Background>
);

export default memo(HomeScreen);