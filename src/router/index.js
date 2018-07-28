import React from 'react';
import { createBottomTabNavigator, createStackNavigator } from 'react-navigation';
import { Icon } from 'react-native-elements';

import UserList from '../components/UserList';
import UserDetail from '../components/UserDetail';
import Settings from '../components/Settings';
import Profile from '../components/Profile';

export const UserListStack = createStackNavigator({
  UserList: {
    screen: UserList,
    navigationOptions: {
      title: 'Lista de Usuários',
    },
  },
  Details: {
    screen: UserDetail,
    navigationOptions: ({ navigation }) =>  ({
      title: `${navigation.state.params.name.first.toUpperCase()} ${navigation.state.params.name.last.toUpperCase()}`,
    }),
  },
});

export const ProfileStack = createStackNavigator({
  Profile: {
    screen: Profile,
    navigationOptions: {
      title: 'Perfil',
    },
  },
  Settings: {
    screen: Settings,
    navigationOptions: {
      title: 'Settings',
    },
  },
});

export const Tabs = createBottomTabNavigator({
  UserList: {
    screen: UserListStack,
    navigationOptions: {
      tabBarLabel: 'Usuários',
      tabBarIcon: ({ tintColor }) => <Icon name="list" size={35} color={tintColor} />,
    },
  },
  Profile: {
    screen: ProfileStack,
    navigationOptions: {
      tabBarLabel: 'Perfil',
      tabBarIcon: ({ tintColor }) => <Icon name="account-circle" size={35} color={tintColor} />
    },
  },
});

export const Root = createStackNavigator({
  Tabs: {
    screen: Tabs,
  },
}, {
  mode: 'modal',
  headerMode: 'none',
});