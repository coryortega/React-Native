import { StackScreenProps } from '@react-navigation/stack';
import { Button } from 'react-native';
import { Text, View } from '../components/Themed';

import { RootStackParamList } from '../types';

export default function ModalScreen({
  navigation,
}: StackScreenProps<RootStackParamList, 'NotFound'>)  {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Text style={{ fontSize: 30 }}>This is a modal!</Text>
        <Button onPress={() => navigation.goBack()} title="Dismiss" />
      </View>
    );
  }