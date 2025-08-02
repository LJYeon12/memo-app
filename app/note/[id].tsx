import React, { useState, useEffect, useRef } from 'react';
import { View, StyleSheet, TextInput } from 'react-native';
import { useLocalSearchParams, useNavigation } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useAppContext } from '../../context/AppContext';


export default function NoteEditorScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const navigation = useNavigation();
  const { getNoteById, updateNote } = useAppContext();

  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const isModified = useRef(false);

  useEffect(() => {
    const note = getNoteById(id || '');
    if (note) {
      setTitle(note.title);
      setContent(note.content);
    }
    isModified.current = false; // Reset on new note load
  }, [id, getNoteById]);

  useEffect(() => {
    navigation.setOptions({ title: title === '' ? 'New Note' : title });
    isModified.current = true;
  }, [navigation, title, content]);

  // Auto-save on unmount
  useEffect(() => {
    return () => {
      if (isModified.current && id) {
        updateNote(id, title, content);
      }
    };
  }, [id, title, content, updateNote]);

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
