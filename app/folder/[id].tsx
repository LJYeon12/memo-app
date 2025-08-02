import React, { useEffect } from 'react';
import { Text, StyleSheet, FlatList, Alert } from 'react-native';
import { useLocalSearchParams, useNavigation } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import NoteListItem from '../../components/NoteListItem';
import SpeedDialFab, { Action } from '../../components/SpeedDialFab';
import { useAppContext } from '../../context/AppContext';

export default function NoteScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const navigation = useNavigation();
  const { getNotesByFolder, getFolderById, addFolder, addNote } = useAppContext();

  const notes = getNotesByFolder(id || '');
  const folder = getFolderById(id || '');

  useEffect(() => {
    navigation.setOptions({ title: folder?.name || 'Notes' });
  }, [navigation, folder]);

  const handleCreateFolder = () => {
    Alert.prompt('New Folder', 'Enter the name for the new folder:', text => {
      addFolder(text);
    });
  };

  const handleCreateNote = () => {
    if (id) {
        addNote(id, 'New Note');
    }
  }

  const fabActions: Action[] = [
    {
      icon: 'note-add',
      name: 'New Note',
      onPress: handleCreateNote,
      color: '#61758A',
    },
    {
      icon: 'create-new-folder',
      name: 'New Folder',
      onPress: handleCreateFolder,
      color: '#61758A',
    },
  ];

  return (
    <SafeAreaView style={styles.container} edges={['bottom', 'left', 'right']}>
      <FlatList
        data={notes}
        renderItem={({ item }) => <NoteListItem item={item} />}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.listContent}
        ListEmptyComponent={<Text style={styles.emptyText}>No notes yet.</Text>}
      />
      <SpeedDialFab actions={fabActions} />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000000',
  },
  listContent: {
    paddingHorizontal: 16,
    paddingTop: 16,
  },
  emptyText: {
    color: '#9CA3AF',
    textAlign: 'center',
    marginTop: 32,
    fontSize: 16,
  }
});
