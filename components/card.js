import React from 'react';
import { StyleSheet, View } from 'react-native';

const Card = (props) => {
  return (
    <View style={styles.card}>
        { props.children }
    </View>
  );
}

export default Card;

const styles = StyleSheet.create({
  card: {
    padding: 16,
    marginTop: 16,
    borderColor: 'white',
    borderWidth: 1,
    borderStyle: 'dashed',
    borderRadius: 10,
    flexDirection: 'row',
    backgroundColor: 'white',
    justifyContent: 'space-between',
    flex:1,
  }
});