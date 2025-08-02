import React, { useState, useRef } from 'react';
import { View, TouchableOpacity, StyleSheet, Animated } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';

export type Action = {
  icon: keyof typeof MaterialIcons.glyphMap;
  onPress: () => void;
  color: string;
  name: string; // for accessibility
};

type SpeedDialFabProps = {
  actions: Action[];
};

export default function SpeedDialFab({ actions }: SpeedDialFabProps) {
  const [isOpen, setIsOpen] = useState(false);
  const animation = useRef(new Animated.Value(0)).current;

  const toggleMenu = () => {
    const toValue = isOpen ? 0 : 1;
    Animated.spring(animation, {
      toValue,
      friction: 5,
      useNativeDriver: true,
    }).start();
    setIsOpen(!isOpen);
  };

  const rotation = {
    transform: [
      {
        rotate: animation.interpolate({
          inputRange: [0, 1],
          outputRange: ['0deg', '45deg'],
        }),
      },
    ],
  };

  return (
    <View style={styles.container}>
      {actions.map((action, index) => {
        const pinStyle = {
          transform: [
            { scale: animation },
            {
              translateY: animation.interpolate({
                inputRange: [0, 1],
                outputRange: [0, -(index + 1) * 60 - 10],
              }),
            },
          ],
        };
        return (
          <Animated.View key={action.icon} style={[styles.secondaryButtonContainer, pinStyle]}>
            <TouchableOpacity style={[styles.fabButton, { backgroundColor: action.color }]} onPress={action.onPress}>
              <MaterialIcons name={action.icon} size={24} color="white" />
            </TouchableOpacity>
          </Animated.View>
        );
      })}
      <TouchableOpacity style={[styles.fabButton, styles.mainButton]} onPress={toggleMenu}>
        <Animated.View style={rotation}>
          <MaterialIcons name="add" size={32} color="white" />
        </Animated.View>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    bottom: 32,
    right: 32,
    alignItems: 'center',
  },
  fabButton: {
    width: 56,
    height: 56,
    borderRadius: 28,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
    elevation: 5,
  },
  mainButton: {
    backgroundColor: '#374151',
  },
  secondaryButtonContainer: {
    position: 'absolute',
  },
});
