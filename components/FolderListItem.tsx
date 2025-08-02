import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';

// Define the type for the component's props
export type Folder = {
  id: string;
  name: string;
  count: number;
};

type FolderListItemProps = {
  item: Folder;
};

// The reusable component
const FolderListItem = ({ item }: FolderListItemProps) => (
  <View style={styles.itemContainer}>
    <View style={styles.folderInfo}>
      <MaterialIcons name="folder" size={24} color="#9CA3AF" style={styles.icon} />
      <Text style={styles.folderName}>{item.name}</Text>
    </View>
    <Text style={styles.folderCount}>{item.count}</Text>
  </View>
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
  folderCount: {
    color: '#9CA3AF',
    fontSize: 16,
  },
});

export default FolderListItem;
