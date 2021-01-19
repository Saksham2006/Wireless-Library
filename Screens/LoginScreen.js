import * as React from 'react';
import {
  ToastAndroid,
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  Image,
  TextInput,
} from 'react-native';

export default class LoginScreen extends React.Component {
  render() {
    return (
      <View>
        <TextInput style={styles.inputbox} placeholder="Enter the Username" />
        <TextInput style={styles.inputbox} placeholder="Enter the Password" />
        <TouchableOpacity style={styles.enterButton}>
          <Text>Enter</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  requestText: {
    textAlign: 'center',
    fontSize: 15,
    alignSelf: 'center',
    marginTop: 20,
  },
  inputbox: {
    marginTop: 100,
    textAlign: 'center',
    width: '60%',
    height: 40,
    borderWidth: 4,
    alignSelf: 'center',
    backgroundColor: '#fcc603',
    borderRadius: 20,
  },
  enterButton: {
    marginTop: 75,
    textAlign: 'center',
    width: '70%',
    height: 50,
    alignSelf: 'center',
    backgroundColor: '#12deb8',
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
