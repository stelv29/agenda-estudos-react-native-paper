import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StatusBar } from 'expo-status-bar';
import { PaperProvider } from 'react-native-paper';
import NovaTarefaScreen from './src/screens/NovaTarefaScreen';
import TarefasScreen from './src/screens/TarefasScreen';
import { tema } from './src/theme/tema';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <PaperProvider theme={tema}>
      <NavigationContainer>
        <Stack.Navigator screenOptions={{ headerShown: false }}>
          <Stack.Screen name="Tarefas" component={TarefasScreen} />
          <Stack.Screen name="NovaTarefa" component={NovaTarefaScreen} />
        </Stack.Navigator>
      </NavigationContainer>
      <StatusBar style="dark" />
    </PaperProvider>
  );
}
