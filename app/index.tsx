import React from 'react';
import { View, Text, FlatList, StyleSheet, SafeAreaView, Alert } from 'react-native';
import FolderListItem from '../components/FolderListItem';
import { useAppContext } from '../context/AppContext';
import SpeedDialFab, { Action } from '../components/SpeedDialFab';


export default function FoldersScreen() {
  const { getFoldersByParentId, getNotesByFolder, addFolder, deleteFolder, addNote } = useAppContext();

  const rootFolders = getFoldersByParentId(null);

  const handleCreateFolder = () => {
    Alert.prompt('New Folder', 'Enter the name for the new folder:', text => {
      addFolder(text, null); // Create a root folder
    });
  };

  const handleCreateNote = () => {
      // Create a note in the first folder by default, or handle case with no folders
      if (rootFolders.length > 0) {
          addNote(rootFolders[0].id, 'New Note');
      } else {
          Alert.alert("No Folders", "Please create a folder first to add a note.");
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

  // This function needs to be updated to get note counts
  const getFolderItemData = (folder: any) => {
      const subfolderCount = getFoldersByParentId(folder.id).length;
      const noteCount = getNotesByFolder(folder.id).length;
      return {
          ...folder,
          count: subfolderCount + noteCount,
      }
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.header}>Folders</Text>
      <FlatList
        data={rootFolders}
        renderItem={({ item }) => (
          <FolderListItem item={getFolderItemData(item)} onDelete={deleteFolder} />
        )}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.listContent}
        ItemSeparatorComponent={() => <View style={styles.separator} />}
      />
      <SpeedDialFab actions={fabActions} />
    </SafeAreaView>
  );
}

// Add styles based on the dark theme from the HTML design
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000000',
  },
  header: {
    color: '#FFFFFF', // text-white
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    paddingVertical: 24, // py-6
  },
  listContent: {
    paddingHorizontal: 16, // px-4
  },
  separator: {
    height: 1,
    backgroundColor: '#374151', // A subtle separator
  },
});
