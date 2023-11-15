import React, {useState} from 'react';
import {View, TextInput, Button, StyleSheet, Text} from 'react-native';
import {useMutation} from '@apollo/client';
import {INCREMENT_COUNTER} from '../utils/graphql';

const TransactionForm: React.FC = () => {
  const [accountExternalIdDebit, setField1] = useState('');
  const [accountExternalIdCredit, setField2] = useState('');
  const [tranferTypeId, setField3] = useState<number>();
  const [value, setField4] = useState<number>();
  const [createTransaction] = useMutation(INCREMENT_COUNTER);

  const handleSubmit = () => {
    createTransaction({
      variables: {
        accountExternalIdDebit,
        accountExternalIdCredit,
        tranferTypeId,
        value,
      },
    });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Etiqueta 1</Text>
      <TextInput
        style={styles.input}
        value={accountExternalIdDebit}
        onChangeText={setField1}
        placeholder="Campo 1"
      />
      <Text style={styles.label}>Etiqueta 1</Text>
      <TextInput
        style={styles.input}
        value={accountExternalIdCredit}
        onChangeText={setField2}
        placeholder="Campo 2"
      />
      <Text style={styles.label}>Etiqueta 1</Text>
      <TextInput
        style={styles.input}
        value={tranferTypeId?.toString()}
        onChangeText={value => setField3(parseInt(value))}
        placeholder="Campo 3"
      />
      <Text style={styles.label}>Etiqueta 1</Text>
      <TextInput
        style={styles.input}
        value={value?.toString()}
        onChangeText={val => setField4(parseInt(val))}
        placeholder="Campo 4"
      />
      <Button title="Enviar" onPress={handleSubmit} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10,
    paddingLeft: 10,
  },
  label: {
    fontWeight: 'bold',
    marginBottom: 5,
  },
});

export default TransactionForm;
