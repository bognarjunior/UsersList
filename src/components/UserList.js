import React, { Component } from 'react';
import { ScrollView, ActivityIndicator } from 'react-native';
import { List, ListItem } from 'react-native-elements';
import { getUserList } from './../api';

export default class UserList extends Component {
  state = {
    users: {},
    isFetch: false,
    info: {}
  }

  componentDidMount() {
    this.fetchUsers();
  }

  fetchUsers = async () => {
    const data =  await getUserList();

    this.setState({
      users: data.result,
      isFetch: data.isFetch,
      info: data.info
    });
  }

  onNavigateToDetails = (user) => {
    this.props.navigation.navigate('Details', { ...user });
  };

  renderUser = () => {
    const { users } = this.state;
    return <List>
      {users.map((user) => (
        <ListItem
          key={user.login.username}
          roundAvatar
          avatar={{ uri: user.picture.thumbnail }}
          title={`${user.name.first.toUpperCase()} ${user.name.last.toUpperCase()}`}
          subtitle={user.email}
          onPress={() => this.onNavigateToDetails(user) }
        />
      ))}
    </List>
  }

  render() {
    return (
      <ScrollView>
        { !this.state.isFetch ? (
          <ActivityIndicator size="large" color="#0000ff" />
          ) : (
            this.renderUser()
          )
        }
      </ScrollView>
    );
  }
}