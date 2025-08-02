import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';

export type Note = {
  id: string;
  title: string;
  date: string;
  isLocked: boolean;
};

type NoteListItemProps = {
  item: Note;
};

const NoteListItem = ({ item }: NoteListItemProps) => {
  return (
    <View style={styles.container}>
      <View>
        <Text style={styles.title}>{item.title}</Text>
        <Text style={styles.date}>{item.date}</Text>
      </View>
      {item.isLocked && (
        <MaterialIcons name="lock" size={20} color="white" />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#1E1E1E',
    borderRadius: 8,
    marginVertical: 4,
  },
  title: {
    color: 'white',
    fontSize: 18,
  },
  date: {
    color: '#A9A9A9',
    fontSize: 14,
    marginTop: 4,
  },
});

export default NoteListItem;
