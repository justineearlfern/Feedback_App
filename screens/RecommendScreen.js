import React, {Component} from 'react';
import {StyleSheet, View} from 'react-native';
import {Form, CardList, ListView, PillView} from '@99xt/first-born';
import {Home} from './Home03';

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      text: '',
      value: '',
      Subject: '',
      Summary: '',
      SelectedPhoto: '',
    };
  }

  handleTextChange = text => {
    this.setState({text: text});
  };

  handlePickerChange = value => {
    this.setState({value: value});
  };

  pillScenes = [
    {scene: <Home />},
    {scene: <CardList data={this.listData} />},
    {scene: <ListView data={this.listData} />},
    {
      scene: (
        <View style={styles.innerContainer}>
          <Form formElements={this.formElements} />
        </View>
      ),
    },
  ];

  render() {
    return (
      <View style={styles.container}>
        <PillView pillScenes={this.pillScenes} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#ffffff',
    flexDirection: 'column',
  },
  innerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 0,
    flexDirection: 'column',
  },
});
