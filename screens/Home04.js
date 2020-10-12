import React, {Component} from 'react';
import {StyleSheet, View} from 'react-native';
import {
  FormInput,
  Button,
  Picker,
  FormTextArea,
  FormPicker,
  Text,
} from '@99xt/first-born';
import {Image, TouchableOpacity} from 'react-native';
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
      building: 'CAH',
      subject: '',
      description: '',
      buildingList: [],
    };
  }

  componentDidMount() {
    this.getBuildings();
  }

  getBuildings = async () => {
    const result = await connection.get('api/v1/building');
    this.setState({buildingList: result.data.data});
  };

  submit = async () => {
    try {
      const {building, subject, description} = this.state;
      const data = {
        building: building,
        subject: subject,
        description: description,
      };
      console.log(this.state);
      const result = await connection.post('api/v1/repair', data);
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
    const {buildingList} = this.state;
    return (
      <View style={styles.innerContainer}>
        <FormPicker
          label="Building"
          selectedValue={this.state.building}
          onValueChange={text => {
            this.setState({building: text});
          }}>
          {buildingList.map(bldg => {
            return <Picker.Item value={bldg._id} label={bldg.building} />;
          })}
        </FormPicker>

        <FormInput
          label="Subject"
          placeholder="Chair,table and etc."
          value={this.state.subject}
          onChangeText={text => {
            this.setState({subject: text});
          }}
        />
        <FormTextArea
          label="Description"
          onChangeText={text => {
            this.setState({description: text});
          }}
          placeholder="Please type here the exact room and description."
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
