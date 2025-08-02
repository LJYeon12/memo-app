import { Stack } from 'expo-router';
import { TouchableOpacity } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { AppProvider } from '../context/AppContext';

export default function RootLayout() {
  return (
    <AppProvider>
      <Stack>
        <Stack.Screen
          name="index"
        options={{
          headerShown: false, // Hide header on the main folder list screen
        }}
      />
      <Stack.Screen
        name="folder/[id]"
        options={{
          headerStyle: {
            backgroundColor: '#000000',
          },
          headerTintColor: '#FFFFFF',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
          headerRight: () => (
            <TouchableOpacity onPress={() => alert('Lock toggled!')}>
              <MaterialIcons name="lock-open" size={24} color="white" />
            </TouchableOpacity>
          ),
        }}
      />
      <Stack.Screen
        name="note/[id]"
        options={{
          title: '제목',
          headerStyle: {
            backgroundColor: '#000000',
          },
          headerTintColor: '#FFFFFF',
          headerRight: () => (
            <TouchableOpacity onPress={() => alert('Note lock toggled!')}>
              <MaterialIcons name="lock-outline" size={24} color="white" />
            </TouchableOpacity>
          ),
        }}
      />
    </Stack>
    </AppProvider>
  );
}
