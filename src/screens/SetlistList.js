import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, FlatList, StyleSheet } from 'react-native';
import { theme } from '../styles/theme';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const SetlistList = ({ navigation }) => {
  const [setlists, setSetlists] = useState([]);

  useEffect(() => {
    // TODO: Implémenter la récupération des setlists depuis l'API
    const mockSetlists = [
      { id: '1', name: 'Concert Été 2024', date: '2024-06-15', songCount: 12 },
      { id: '2', name: 'Répétition Hebdo', date: '2024-02-20', songCount: 8 },
      { id: '3', name: 'Session Studio', date: '2024-03-01', songCount: 5 },
    ];
    setSetlists(mockSetlists);
  }, []);

  const renderSetlistItem = ({ item }) => (
    <TouchableOpacity
      style={styles.setlistCard}
      onPress={() => navigation.navigate('SetlistDetail', { setlistId: item.id })}
    >
      <View style={styles.setlistHeader}>
        <Text style={styles.setlistName}>{item.name}</Text>
        <Icon name="chevron-right" size={24} color={theme.colors.secondary} />
      </View>
      <View style={styles.setlistInfo}>
        <Text style={styles.setlistDate}>
          <Icon name="calendar" size={16} color={theme.colors.text.secondary} /> {item.date}
        </Text>
        <Text style={styles.songCount}>
          <Icon name="music-note" size={16} color={theme.colors.text.secondary} /> {item.songCount} morceaux
        </Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Mes Setlists</Text>
        <TouchableOpacity
          style={styles.addButton}
          onPress={() => navigation.navigate('CreateSetlist')}
        >
          <Icon name="plus" size={24} color={theme.colors.text.light} />
        </TouchableOpacity>
      </View>
      <FlatList
        data={setlists}
        renderItem={renderSetlistItem}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.listContainer}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
    padding: theme.spacing.md,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: theme.spacing.lg,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: theme.colors.primary,
  },
  addButton: {
    backgroundColor: theme.colors.secondary,
    padding: theme.spacing.sm,
    borderRadius: theme.borderRadius.medium,
    elevation: 2,
  },
  listContainer: {
    gap: theme.spacing.md,
  },
  setlistCard: {
    backgroundColor: theme.colors.surface,
    borderRadius: theme.borderRadius.medium,
    padding: theme.spacing.md,
    ...theme.shadows.medium,
  },
  setlistHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: theme.spacing.sm,
  },
  setlistName: {
    fontSize: 18,
    fontWeight: '600',
    color: theme.colors.text.primary,
  },
  setlistInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  setlistDate: {
    fontSize: 14,
    color: theme.colors.text.secondary,
  },
  songCount: {
    fontSize: 14,
    color: theme.colors.text.secondary,
  },
});

export default SetlistList;
