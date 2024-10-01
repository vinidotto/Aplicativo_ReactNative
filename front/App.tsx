import React from 'react';
import { View, StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Home from './src/screens/Home';
import AddUser from './src/screens/AddUser';
import EditUser from './src/screens/EditUser';
import DetailsUser from './src/screens/DetailsUser';
import Header from './src/components/Header'; 
import Footer from './src/components/Footer'; 

export type RootStackParamList = {
  Home: undefined;
  AddUser: undefined;
  EditUser: { userId: number };  
  DetailsUser: { userId: number };
};

const Stack = createStackNavigator<RootStackParamList>();

export default function App() {
  return (
    <NavigationContainer>
      <View style={styles.container}>
        <Header />
        <View style={styles.content}>
          <Stack.Navigator initialRouteName="Home">
            <Stack.Screen 
              name="Home" 
              component={Home} 
              options={{ title: 'Página Inicial' }} 
            />
            <Stack.Screen 
              name="AddUser" 
              component={AddUser} 
              options={{ title: 'Adicionar Usuário' }} 
            />
            <Stack.Screen 
              name="EditUser" 
              component={EditUser} 
              options={{ title: 'Editar Usuário' }} 
            />
            <Stack.Screen 
              name="DetailsUser" 
              component={DetailsUser} 
              options={{ title: 'Detalhes do Usuário' }} 
            />
          </Stack.Navigator>
        </View>
        <Footer />
      </View>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    
    flex: 1,
  },
  content: {
    flex: 1,
    textAlign: 'center',
  },
});
