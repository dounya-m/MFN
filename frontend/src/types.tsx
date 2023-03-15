import MapView, { Region } from 'react-native-maps';

export type Navigation = {
    navigate: (scene: string) => void;
  };

  export type RootStackParamList = {
    HomeScreen: undefined;
    Dashboard: { region: Region };
    RegisterScreen: { region: Region };
  };