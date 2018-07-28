import React, { Component } from 'react';
import { ScrollView } from 'react-native';
import { List, ListItem } from 'react-native-elements';

export default class Settings extends Component {
  render() {
    return (
      <ScrollView>
        <List>
          <ListItem title="Notificações" />
          <ListItem title="Perfil" />
          <ListItem title="Password" />
        </List>
        <List>
          <ListItem
            title="Sign Out"
            rightIcon={{ name: 'cancel' }}
          />
        </List>
      </ScrollView>
    );
  }
}