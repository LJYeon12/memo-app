import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { Link } from 'expo-router';

// Define the type for the component's props
export type Folder = {
  id: string;
  name: string;
  count: number;
};

type FolderListItemProps = {
  item: Folder;
  onDelete: (id: string) => void;
};

// The reusable component
const FolderListItem = ({ item, onDelete }: FolderListItemProps) => (
  <Link href={`/folder/${item.id}`} asChild>
    <TouchableOpacity style={styles.itemContainer}>
      <View style={styles.folderInfo}>
        <MaterialIcons name="folder" size={24} color="#9CA3AF" style={styles.icon} />
        <Text style={styles.folderName}>{item.name}</Text>
      </View>
      <View style={styles.folderActions}>
        <Text style={styles.folderCount}>{item.count}</Text>
        <TouchableOpacity onPress={() => onDelete(item.id)} style={styles.deleteButton}>
          <MaterialIcons name="delete" size={24} color="#9CA3AF" />
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  </Link>
);

const styles = StyleSheet.create({
  itemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 12,
    paddingHorizontal: 8,
  },
  folderInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  icon: {
    marginRight: 16,
  },
  folderName: {
    color: '#FFFFFF',
    fontSize: 18,
  },
  folderActions: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  folderCount: {
    color: '#9CA3AF',
    fontSize: 16,
    marginRight: 16,
  },
  deleteButton: {
    padding: 4,
  }
});

export default FolderListItem;
