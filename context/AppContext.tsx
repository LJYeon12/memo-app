import React, { createContext, useState, useContext, ReactNode, useCallback } from 'react';
import { router } from 'expo-router';

// 1. Types
export type Folder = {
  id: string;
  name: string;
  parentId: string | null;
};

export type Note = {
  id: string;
  folderId: string;
  title: string;
  content: string;
  date: string;
  isLocked: boolean;
};

// 2. Initial Data
const initialFolders: Folder[] = [
  { id: '1', name: 'Personal', parentId: null },
  { id: '2', name: 'Work', parentId: null },
  { id: '3', name: 'Ideas', parentId: null },
  { id: '4', name: 'Recipes', parentId: null },
  { id: '5', name: 'Vacation', parentId: '1' },
];

const initialNotes: Note[] = [
  { id: 'n1', folderId: '1', title: 'Meeting Notes', content: '', date: '2023-09-20', isLocked: false },
  { id: 'n2', folderId: '1', title: 'Grocery List', content: '', date: '2023-09-18', isLocked: true },
  { id: 'n3', folderId: '2', title: 'Travel Plans', content: '', date: '2023-09-15', isLocked: false },
];

// 3. Context Shape
interface AppContextType {
  folders: Folder[];
  notes: Note[];
  getNotesByFolder: (folderId: string) => Note[];
  getFoldersByParentId: (parentId: string | null) => Folder[];
  getFolderById: (folderId: string) => Folder | undefined;
  addFolder: (name: string, parentId?: string | null) => void;
  addNote: (folderId: string, title: string) => void;
  updateNote: (noteId: string, title: string, content: string) => void;
  deleteFolder: (folderId: string) => void;
}

// 4. AppContext
const AppContext = createContext<AppContextType | undefined>(undefined);

// 5. AppProvider Component
export const AppProvider = ({ children }: { children: ReactNode }) => {
  const [folders, setFolders] = useState<Folder[]>(initialFolders);
  const [notes, setNotes] = useState<Note[]>(initialNotes);

  const getNotesByFolder = useCallback((folderId: string) => {
    return notes.filter(note => note.folderId === folderId);
  }, [notes]);

  const getFoldersByParentId = useCallback((parentId: string | null) => {
    return folders.filter(folder => folder.parentId === parentId);
  }, [folders]);

  const getFolderById = useCallback((folderId: string) => {
    return folders.find(folder => folder.id === folderId);
  }, [folders]);

  const addFolder = useCallback((name: string, parentId: string | null = null) => {
    const newFolder: Folder = {
      id: Date.now().toString(),
      name,
      parentId,
    };
    setFolders(prev => [newFolder, ...prev]);
  }, []);

  const addNote = useCallback((folderId: string, title: string) => {
    const newNote: Note = {
        id: `n${Date.now()}`,
        folderId,
        title,
        content: '',
        date: new Date().toISOString().split('T')[0],
        isLocked: false,
    };
    setNotes(prev => [newNote, ...prev]);
    // Navigate to the new note's editor screen
    router.push(`/note/${newNote.id}`);
  }, []);

  const updateNote = useCallback((noteId: string, title: string, content: string) => {
    setNotes(prev =>
      prev.map(note =>
        note.id === noteId ? { ...note, title, content, date: new Date().toISOString().split('T')[0] } : note
      )
    );
  }, []);

  const deleteFolder = useCallback((folderId: string) => {
    const folderIdsToDelete: string[] = [folderId];

    const findDescendants = (parentId: string) => {
      const children = folders.filter(f => f.parentId === parentId);
      for (const child of children) {
        folderIdsToDelete.push(child.id);
        findDescendants(child.id);
      }
    };

    findDescendants(folderId);

    setFolders(prev => prev.filter(f => !folderIdsToDelete.includes(f.id)));
    setNotes(prev => prev.filter(n => !folderIdsToDelete.includes(n.folderId)));
  }, [folders]);

  const value = {
    folders,
    notes,
    getNotesByFolder,
    getFoldersByParentId,
    getFolderById,
    addFolder,
    addNote,
    updateNote,
    deleteFolder,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

// 6. useAppContext Hook
export const useAppContext = () => {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useAppContext must be used within an AppProvider');
  }
  return context;
};
