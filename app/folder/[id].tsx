import React, { useEffect, useMemo } from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';
import { useLocalSearchParams, useNavigation } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { MaterialIcons } from '@expo/vector-icons';
import NoteListItem, { Note } from '../../components/NoteListItem';
import SpeedDialFab from '../../components/SpeedDialFab';

// Dummy data for notes
const dummyNotes: Note[] = [
  { id: '1', title: 'Meeting Notes', date: '2023-09-20', isLocked: false },
  { id: '2', title: 'Grocery List', date: '2023-09-18', isLocked: true },
  { id: '3', title: 'Travel Plans', date: '2023-09-15', isLocked: false },
  { id: '4', title: 'Project Ideas', date: '2023-09-12', isLocked: false },
  { id: '5', title: 'Book Recommendations', date: '2023-09-10', isLocked: false },
];

// Dummy data for folder details
const FOLDERS_DATA: { [key: string]: { name: string; noteCount: number } } = {
    '1': { name: 'Personal', noteCount: 12 },
    '2': { name: 'Work', noteCount: 5 },
    '3': { name: 'Ideas', noteCount: 3 },
    '4': { name: 'Recipes', noteCount: 2 },
};

export default function NoteScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const navigation = useNavigation();

  const folderDetails = useMemo(() => {
    return FOLDERS_DATA[id || '1'] || { name: 'Unknown Folder', noteCount: 0 };
  }, [id]);

  useEffect(() => {
    navigation.setOptions({ title: folderDetails.name });
  }, [navigation, folderDetails]);

  return (
    <SafeAreaView style={styles.container} edges={['bottom', 'left', 'right']}>
      <View style={styles.folderInfoContainer}>
        <View style={styles.folderInfo}>
            <MaterialIcons name="folder-open" size={28} color="#9CA3AF" />
            <Text style={styles.folderName}>{folderDetails.name}</Text>
        </View>
        <Text style={styles.noteCount}>{folderDetails.noteCount}</Text>
      </View>

      <FlatList
        data={dummyNotes}
        renderItem={({ item }) => <NoteListItem item={item} />}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.listContent}
      />
      <SpeedDialFab />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000000',
  },
  folderInfoContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#1E1E1E',
    borderRadius: 8,
    margin: 16,
  },
  folderInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
  },
  folderName: {
    color: 'white',
    fontSize: 18,
  },
  noteCount: {
      color: '#9CA3AF',
      fontSize: 16,
  },
  listContent: {
    paddingHorizontal: 16,
  },
});
