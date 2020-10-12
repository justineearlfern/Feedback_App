import React, {Component} from 'react';
import {StyleSheet, View} from 'react-native';
import {Text, FormInput, FormTextArea, Button} from '@99xt/first-born';
import {Image} from 'react-native';
import ImagePicker from 'react-native-image-picker';
import Connection from '../common/Connection';

const connection = new Connection();
export class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: '',
      filePath: {},
      loadingImage: false,
      subject: '',
      description: '',
    };
  }

  async componentDidMount() {
    try {
      await fetch('https://webhook.site/a01c6346-a1a3-4ca7-9393-30b159382bd4', {
        method: 'post',
        mode: 'no-cors',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          Subject: 'userstring',
          Description: 'passstring',
        }),
      });
    } catch (e) {
      console.log(e);
    }
  }

  submit = async () => {
    try {
      const {subject, description} = this.state;
      const data = {
        subject: subject,
        description: description,
      };
      const result = await connection.post('api/v1/report', data);
      console.log(result.data);
      if (result.data) {
        alert('Success: Data Saved');
      }
    } catch (error) {
      console.log(error);
      alert(`Error: ${error}`);
    }
  };

  chooseFile = () => {
    let options = {
      title: 'Select image',
      storageOptions: {
        skipBackup: true,
        path: 'images',
      },
    };
    this.setState({loadingImage: true});
    ImagePicker.showImagePicker(options, response => {
      console.log('Response =', response);
      if (response.didCancel) {
        this.setState({loadingImage: false});
      } else if (response.error) {
        console.log('ImagePicker Error', response.error);
      } else {
        let source = response;
        this.setState({
          filePath: source,
        });
      }
    });
  };

  render() {
    return (
      <View style={styles.innerContainer}>
        <FormInput
          label="Subject"
          placeholder="Lost things, Incident and etc."
          onChangeText={text => {
            this.setState({subject: text});
          }}
        />
        <FormTextArea
          label="Description"
          onChangeText={text => {
            this.setState({description: text});
          }}
        />
        <Image
          source={
            this.state.loadingImage
              ? {uri: this.state.filePath.uri}
              : require('../assets/placeholder.png')
          }
          style={{width: 250, height: 250, resizeMode: 'stretch'}}
        />
        <Button color="#191970" onPress={this.chooseFile.bind(this)} block>
          <Text>Select a Photo</Text>
        </Button>

        <Button
          color="#191970"
          onPress={() => {
            this.submit();
          }}
          block>
          <Text>Submit</Text>
        </Button>
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
