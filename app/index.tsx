import React, { useState } from 'react';
import { View, Text, FlatList, StyleSheet, SafeAreaView, TouchableOpacity } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import FolderListItem, { Folder } from '../components/FolderListItem';

// Initial data
const initialFolders: Folder[] = [
  { id: '1', name: 'Personal', count: 12 },
  { id: '2', name: 'Work', count: 5 },
  { id: '3', name: 'Ideas', count: 3 },
  { id: '4', name: 'Recipes', count: 2 },
];

export default function FoldersScreen() {
  const [folders, setFolders] = useState(initialFolders);

  const handleAddFolder = () => {
    const newFolder: Folder = {
      id: Date.now().toString(),
      name: 'New Folder',
      count: 0,
    };
    setFolders(currentFolders => [newFolder, ...currentFolders]);
  };

  const handleDeleteFolder = (id: string) => {
    setFolders(currentFolders =>
      currentFolders.filter(folder => folder.id !== id)
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.header}>Folders</Text>
      <FlatList
        data={folders}
        renderItem={({ item }) => (
          <FolderListItem item={item} onDelete={handleDeleteFolder} />
        )}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.listContent}
        ItemSeparatorComponent={() => <View style={styles.separator} />}
      />
      <TouchableOpacity style={styles.fab} onPress={handleAddFolder}>
        <MaterialIcons name="add" size={32} color="white" />
      </TouchableOpacity>
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
  fab: {
    position: 'absolute',
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: '#374151', // bg-gray-700
    justifyContent: 'center',
    alignItems: 'center',
    bottom: 32, // bottom-8
    right: 32, // right-8
    elevation: 8, // shadow-lg
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
  },
});
