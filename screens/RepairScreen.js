import React, {Component} from 'react';
import {StyleSheet, View, Alert} from 'react-native';
import {Form, CardList, ListView, PillView} from '@99xt/first-born';
import {Home} from './Home04';

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      text: '',
      value: '', 
      Subject: '',
      Description: '',
      SelectedPhoto: '',
      SelectedBldg:'',
    };
  }

  handleTextChange = text => {
    this.setState({text: text});
  };

  handlePickerChange = value => {
    this.setState({value: value});
  };

  handleDisplayAlert = btnName => {
    Alert.alert('Hello', btnName);
  };

  checkInputValidity = text => {
    const regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    return regex.test(text);
  };

  pickerData = [
    {
      value: '1',
      label: '1',
    },
    {
      value: '2',
      label: '2',
    },
    {
      value: '3',
      label: '3',
    },
  ];

  

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
        <View style={styles.container}>
          <PillView pillScenes={this.pillScenes} />
        </View>
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
    padding: 20,
    flexDirection: 'column',
  },
});
