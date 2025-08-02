import React, { useEffect, useMemo } from 'react';
import { Text, StyleSheet, FlatList, Alert } from 'react-native';
import { useLocalSearchParams, useNavigation } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import NoteListItem from '../../components/NoteListItem';
import FolderListItem from '../../components/FolderListItem';
import SpeedDialFab, { Action } from '../../components/SpeedDialFab';
import { useAppContext } from '../../context/AppContext';

export default function FolderScreen() { // Renamed for clarity
  const { id } = useLocalSearchParams<{ id: string }>();
  const navigation = useNavigation();
  const { getNotesByFolder, getFoldersByParentId, getFolderById, addFolder, addNote, deleteFolder } = useAppContext();

  const notes = useMemo(() => getNotesByFolder(id || ''), [id, getNotesByFolder]);
  const subFolders = useMemo(() => getFoldersByParentId(id || ''), [id, getFoldersByParentId]);
  const folder = useMemo(() => getFolderById(id || ''), [id, getFolderById]);

  const combinedData = useMemo(() => {
      const getFolderItemData = (folder: any) => {
          const subfolderCount = getFoldersByParentId(folder.id).length;
          const noteCount = getNotesByFolder(folder.id).length;
          return {
              ...folder,
              type: 'folder',
              count: subfolderCount + noteCount,
          }
      };
    const foldersWithType = subFolders.map(getFolderItemData);
    const notesWithType = notes.map(n => ({ ...n, type: 'note' }));
    return [...foldersWithType, ...notesWithType];
  }, [subFolders, notes, getFoldersByParentId, getNotesByFolder]);

  useEffect(() => {
    navigation.setOptions({ title: folder?.name || 'Folder' });
  }, [navigation, folder]);

  const handleCreateFolder = () => {
    Alert.prompt('New Folder', 'Enter the name for the new folder:', text => {
      addFolder(text, id); // Create as subfolder
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

  const renderItem = ({ item }: { item: any }) => {
    if (item.type === 'folder') {
      return <FolderListItem item={item} onDelete={deleteFolder} />;
    }
    return <NoteListItem item={item} />;
  };

  return (
    <SafeAreaView style={styles.container} edges={['bottom', 'left', 'right']}>
      <FlatList
        data={combinedData}
        renderItem={renderItem}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.listContent}
        ListEmptyComponent={<Text style={styles.emptyText}>This folder is empty.</Text>}
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
