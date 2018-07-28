import React, { Component } from 'react';
import { ScrollView, View, StyleSheet, ActivityIndicator } from 'react-native';
import { Tile, List, ListItem, Button } from 'react-native-elements';
import { getUser } from './../api/data';

export default class Profile extends Component {
  state = {
    user: {},
    isFetch: false
  }

  componentDidMount() {
    this.fetchUser();
  }

  fetchUser = async () => {
    const data =  await getUser();
    console.log('data', data)
    this.setState({ user: data.user });
    this.setState({ isFetch: data.isFetch });
  }

  handleSettingsPress = () => {
    this.props.navigation.navigate('Settings');
  };

  renderProfile = () => (
    <View>
      <Tile
          imageSrc={{ uri: this.state.user.picture.large}}
          featured
          title={`${this.state.user.name.first.toUpperCase()} ${this.state.user.name.last.toUpperCase()}`}
          caption={this.state.user.email}
        />

        <Button
          title="Configurações"
          buttonStyle={{ marginTop: 20 }}
          onPress={this.handleSettingsPress}
        />

        <List>
          <ListItem
            title="Email"
            rightTitle={this.state.user.email}
            hideChevron
          />
          <ListItem
            title="Telefone"
            rightTitle={this.state.user.phone}
            hideChevron
          />
        </List>

        <List>
          <ListItem
            title="Github"
            rightTitle={this.state.user.login.username}
            hideChevron
          />
        </List>

        <List>
          <ListItem
            title="Cidade"
            rightTitle={this.state.user.location.city}
            hideChevron
          />
        </List>
      </View>
  );

  render() {
    return (
      <View style={{ flex: 1 }}>
        { !this.state.isFetch ? (
          <View style={styles.loader}>
            <ActivityIndicator size="large" color="#0000ff" />
          </View>
          ) : (
            <ScrollView>
              {this.renderProfile()}
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