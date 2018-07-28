import React, { Component } from 'react';
import { ScrollView, ActivityIndicator, StyleSheet, View } from 'react-native';
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
    this.setState({ users: data.result });
    this.setState({ isFetch: data.isFetch });
    this.setState({ info: data.info });
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
      <View style={{ flex: 1 }}>
        { !this.state.isFetch ? (
          <View style={styles.loader}>
            <ActivityIndicator size="large" color="#0000ff" />
          </View>
          ) : (
            <ScrollView>
              {this.renderUser()}
            </ScrollView>
          )
        }
      </View>
    );
  }
}

const styles = StyleSheet.create({
  loader: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  }
});