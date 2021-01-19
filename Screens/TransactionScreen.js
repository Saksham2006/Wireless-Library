import * as React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  Image,
} from 'react-native';
import * as Permissions from 'expo-permissions';
import { BarCodeSanner } from 'expo-barcode-scanner';
import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import IssueScreen from '../Screens/IssueScreen';
import ReturnScreen from '../Screens/ReturnScreen';

export default class TransactionScreen extends React.Component {
  render() {
    return (
      <View>
        <Image
          source={require('libraryicon.png')}
          style={{ marginTop: 20, marginLeft: 105, width: 130, height: 130 }}
        />
        <TouchableOpacity
          style={styles.issueReturnButton}
         onPress={()=>{this.props.navigation.navigate('Issue')}}>
          <Text style={styles.buttonText}>Issue</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.issueReturnButton}
        onPress={()=>{this.props.navigation.navigate('Return')}}>
          <Text style={styles.buttonText}>Return</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  issueReturnButton: {
    marginTop: 50,
    textAlign: 'center',
    width: '50%',
    height: 50,
    alignSelf: 'center',
    backgroundColor: 'yellow',
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
});