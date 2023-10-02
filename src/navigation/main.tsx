import React from 'react';
import {
  StackNavigationProp,
  createStackNavigator,
} from '@react-navigation/stack';
import auth from '@react-native-firebase/auth';
import {AddEditTodo, TodoList} from '../screens';
import {RouteProp} from '@react-navigation/native';
import {ITodo} from '../hooks/useTodos';
import {Icon} from '@rneui/themed';
import {Alert, TouchableOpacity} from 'react-native';
import {Colors} from '../constants/theme';

type MainStackParamList = {
  TodoList: undefined;
  AddEditTodo: {
    type: 'add' | 'edit';
    todo?: ITodo;
  };
};

export type TodoListNavigationProp = StackNavigationProp<
  MainStackParamList,
  'TodoList'
>;

export type AddEditTodoRouteProp = RouteProp<MainStackParamList, 'AddEditTodo'>;

const Stack = createStackNavigator<MainStackParamList>();

const Logout = () => {
  const logout = async () => {
    await auth().signOut();
    Alert.alert('Sign Out', 'You have successfully signed out.');
  };

  return (
    <TouchableOpacity onPress={logout}>
      <Icon name="logout" color={Colors.secondary} />
    </TouchableOpacity>
  );
};

const MainStack = () => {
  return (
    <Stack.Navigator
      initialRouteName="TodoList"
      screenOptions={{
        headerRightContainerStyle: {paddingRight: 15},
      }}>
      <Stack.Screen
        name="TodoList"
        component={TodoList}
        options={{
          title: 'Welcome',
          headerRight: Logout,
        }}
      />
      <Stack.Screen
        name="AddEditTodo"
        component={AddEditTodo}
        options={{title: 'Add Todo'}}
      />
    </Stack.Navigator>
  );
};

export default MainStack;
