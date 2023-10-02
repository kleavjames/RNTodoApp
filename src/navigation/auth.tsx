import React from 'react';
import {
  StackNavigationProp,
  createStackNavigator,
} from '@react-navigation/stack';
import {SignIn, SignUp} from '../screens';

type AuthStackParamList = {
  SignIn: undefined;
  SignUp: undefined;
};

export type AuthNavigationProp = StackNavigationProp<
  AuthStackParamList,
  'SignIn'
>;

const Stack = createStackNavigator<AuthStackParamList>();

const AuthStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen name="SignIn" component={SignIn} />
      <Stack.Screen name="SignUp" component={SignUp} />
    </Stack.Navigator>
  );
};

export default AuthStack;
