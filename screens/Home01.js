import React, {Component} from 'react';
import {StyleSheet, View} from 'react-native';
import {Text, Button, Picker, FormTextArea, FormPicker} from '@99xt/first-born';
import Card from './Card';
import {AirbnbRating} from 'react-native-ratings';
import Connection from '../common/Connection';
const connection = new Connection();

export class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      department: 'Library',
      rating: 0,
      description: '',
      departments: [],
    };
  }

  componentDidMount() {
    this.getDepartments();
  }

  getDepartments = async () => {
    const result = await connection.get('api/v1/department');
    console.log(result.data.data);
    this.setState({departments: result.data.data});
  };

  submit = async () => {
    try {
      const {department, rating, description} = this.state;
      const data = {
        department: department,
        rating: rating.toString(),
        description: description,
      };
      console.log(data);
      const result = await connection.post('api/v1/react', data);
      if (result.data) {
        alert('Your information has been submitted.');
      }
    } catch (error) {
      console.log(error);
      alert(`Error: ${error}`);
    }
  };

  checkInputValidity = text => {
    const regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    return regex.test(text);
  };

  render() {
    const {departments} = this.state;
    return (
      <View style={styles.innerContainer}>
        <FormPicker
          label="Select a department to rate."
          selectedValue={this.state.department}
          onValueChange={text => {
            this.setState({department: text});
          }}>
          {departments.map(dept => {
            return <Picker.Item value={dept._id} label={dept.department} />;
          })}
        </FormPicker>

        <FormTextArea
          label="Description"
          value={this.state.description}
          onChangeText={text => {
            this.setState({description: text});
          }}
        />

        <Card containerStyle={styles.card}>
          <AirbnbRating
            showRating={true}
            defaultRating={this.state.rating}
            onFinishRating={rating => {
              this.setState({rating: rating});
            }}
          />
        </Card>

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
