import React, { useState, useEffect } from 'react';
import { View, StyleSheet, TextInput } from 'react-native';
import { useLocalSearchParams, useNavigation } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';

// Dummy data source for notes
const NOTES_DATA: { [key: string]: { title: string; content: string } } = {
  '1': { title: 'Meeting Notes', content: 'Discussed Q3 roadmap.' },
  '2': { title: 'Grocery List', content: 'Milk, Eggs, Bread' },
  '3': { title: 'Travel Plans', content: 'Book flight to Paris.' },
  '4': { title: 'Project Ideas', content: 'Develop a new note-taking app.' },
  '5': { title: 'Book Recommendations', content: 'Sapiens by Yuval Noah Harari' },
};


export default function NoteEditorScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const navigation = useNavigation();

  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  useEffect(() => {
    const note = NOTES_DATA[id || ''];
    if (note) {
      setTitle(note.title);
      setContent(note.content);
    }
  }, [id]);

  useEffect(() => {
    navigation.setOptions({ title: title === '' ? 'New Note' : title });
  }, [navigation, title]);

  return (
    <SafeAreaView style={styles.container} edges={['bottom', 'left', 'right']}>
      <View style={styles.content}>
        <TextInput
          style={styles.titleInput}
          placeholder="Title"
          placeholderTextColor="#666"
          value={title}
          onChangeText={setTitle}
        />
        <TextInput
          style={styles.bodyInput}
          placeholder="Start writing..."
          placeholderTextColor="#666"
          multiline
          value={content}
          onChangeText={setContent}
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000000',
  },
  content: {
    flex: 1,
    padding: 16,
  },
  titleInput: {
    color: 'white',
    fontSize: 24,
    fontWeight: 'bold',
    paddingBottom: 16,
  },
  bodyInput: {
    flex: 1,
    color: 'white',
    fontSize: 18,
    textAlignVertical: 'top', // Ensures text starts from the top on Android
  },
});
