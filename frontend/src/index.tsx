import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import {  HomeScreen,  LoginScreen,  RegisterScreen,  ForgotPasswordScreen, Dashboard, CompanyScreen} from './screens';

const RouterScreens = createStackNavigator(
  {
    HomeScreen,
    LoginScreen,
    RegisterScreen,
    ForgotPasswordScreen,
    Dashboard,
    CompanyScreen,
  },
  {
    initialRouteName: 'HomeScreen',
    headerMode: 'none',
  }
);

export default createAppContainer(RouterScreens);