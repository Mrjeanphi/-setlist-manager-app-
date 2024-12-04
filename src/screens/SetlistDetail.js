import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  StyleSheet,
  TextInput,
} from 'react-native';
import { theme } from '../styles/theme';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import DraggableFlatList from 'react-native-draggable-flatlist';

const SetlistDetail = ({ route, navigation }) => {
  const { setlistId } = route.params;
  const [setlist, setSetlist] = useState(null);
  const [songs, setSongs] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [newSong, setNewSong] = useState({ title: '', duration: '', key: '', notes: '' });

  useEffect(() => {
    // TODO: Récupérer les données de la setlist depuis l'API
    const mockSetlist = {
      id: setlistId,
      name: 'Concert Été 2024',
      date: '2024-06-15',
      venue: 'Salle des Fêtes',
    };
    const mockSongs = [
      { id: '1', title: 'Sweet Home Alabama', duration: '4:41', key: 'G', notes: 'Intro extended' },
      { id: '2', title: 'Wonderwall', duration: '4:18', key: 'Em', notes: 'New arrangement' },
      { id: '3', title: 'Sweet Child O Mine', duration: '5:56', key: 'D', notes: '' },
    ];
    setSetlist(mockSetlist);
    setSongs(mockSongs);
  }, [setlistId]);

  const renderSongItem = ({ item, drag, isActive }) => (
    <TouchableOpacity
      style={[
        styles.songCard,
        isActive && styles.songCardActive,
      ]}
      onLongPress={drag}
    >
      <View style={styles.songHeader}>
        <Icon name="drag" size={24} color={theme.colors.text.secondary} />
        <Text style={styles.songTitle}>{item.title}</Text>
        <TouchableOpacity onPress={() => handleEditSong(item.id)}>
          <Icon name="pencil" size={20} color={theme.colors.secondary} />
        </TouchableOpacity>
      </View>
      <View style={styles.songDetails}>
        <Text style={styles.songInfo}>
          <Icon name="clock-outline" size={14} /> {item.duration}
        </Text>
        <Text style={styles.songInfo}>
          <Icon name="music" size={14} /> Key: {item.key}
        </Text>
        {item.notes && (
          <Text style={styles.songNotes}>
            <Icon name="note-text" size={14} /> {item.notes}
          </Text>
        )}
      </View>
    </TouchableOpacity>
  );

  const handleAddSong = () => {
    if (newSong.title.trim()) {
      setSongs([
        ...songs,
        {
          id: Date.now().toString(),
          ...newSong,
        },
      ]);
      setNewSong({ title: '', duration: '', key: '', notes: '' });
      setIsEditing(false);
    }
  };

  const handleEditSong = (songId) => {
    // Logique pour éditer une chanson
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Icon name="arrow-left" size={24} color={theme.colors.primary} />
        </TouchableOpacity>
        <Text style={styles.title}>{setlist?.name}</Text>
        <TouchableOpacity onPress={() => setIsEditing(!isEditing)}>
          <Icon name={isEditing ? 'close' : 'plus'} size={24} color={theme.colors.primary} />
        </TouchableOpacity>
      </View>

      <View style={styles.setlistInfo}>
        <Text style={styles.infoText}>
          <Icon name="calendar" size={16} /> {setlist?.date}
        </Text>
        <Text style={styles.infoText}>
          <Icon name="map-marker" size={16} /> {setlist?.venue}
        </Text>
      </View>

      {isEditing && (
        <View style={styles.addSongForm}>
          <TextInput
            style={styles.input}
            placeholder="Titre du morceau"
            value={newSong.title}
            onChangeText={(text) => setNewSong({ ...newSong, title: text })}
          />
          <View style={styles.inputRow}>
            <TextInput
              style={[styles.input, styles.smallInput]}
              placeholder="Durée"
              value={newSong.duration}
              onChangeText={(text) => setNewSong({ ...newSong, duration: text })}
            />
            <TextInput
              style={[styles.input, styles.smallInput]}
              placeholder="Tonalité"
              value={newSong.key}
              onChangeText={(text) => setNewSong({ ...newSong, key: text })}
            />
          </View>
          <TextInput
            style={styles.input}
            placeholder="Notes"
            value={newSong.notes}
            onChangeText={(text) => setNewSong({ ...newSong, notes: text })}
          />
          <TouchableOpacity style={styles.addButton} onPress={handleAddSong}>
            <Text style={styles.addButtonText}>Ajouter le morceau</Text>
          </TouchableOpacity>
        </View>
      )}

      <DraggableFlatList
        data={songs}
        renderItem={renderSongItem}
        keyExtractor={(item) => item.id}
        onDragEnd={({ data }) => setSongs(data)}
        contentContainerStyle={styles.listContainer}
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
    marginBottom: theme.spacing.md,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: theme.colors.primary,
  },
  setlistInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: theme.spacing.lg,
  },
  infoText: {
    fontSize: 14,
    color: theme.colors.text.secondary,
  },
  listContainer: {
    gap: theme.spacing.md,
  },
  songCard: {
    backgroundColor: theme.colors.surface,
    borderRadius: theme.borderRadius.medium,
    padding: theme.spacing.md,
    ...theme.shadows.small,
  },
  songCardActive: {
    backgroundColor: theme.colors.background,
    transform: [{ scale: 1.02 }],
  },
  songHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: theme.spacing.sm,
  },
  songTitle: {
    flex: 1,
    fontSize: 16,
    fontWeight: '500',
    color: theme.colors.text.primary,
  },
  songDetails: {
    marginTop: theme.spacing.sm,
    gap: theme.spacing.xs,
  },
  songInfo: {
    fontSize: 14,
    color: theme.colors.text.secondary,
  },
  songNotes: {
    fontSize: 14,
    color: theme.colors.text.secondary,
    fontStyle: 'italic',
  },
  addSongForm: {
    backgroundColor: theme.colors.surface,
    borderRadius: theme.borderRadius.medium,
    padding: theme.spacing.md,
    marginBottom: theme.spacing.md,
    ...theme.shadows.medium,
  },
  input: {
    backgroundColor: theme.colors.background,
    borderRadius: theme.borderRadius.small,
    padding: theme.spacing.sm,
    marginBottom: theme.spacing.sm,
  },
  inputRow: {
    flexDirection: 'row',
    gap: theme.spacing.sm,
  },
  smallInput: {
    flex: 1,
  },
  addButton: {
    backgroundColor: theme.colors.secondary,
    borderRadius: theme.borderRadius.small,
    padding: theme.spacing.sm,
    alignItems: 'center',
  },
  addButtonText: {
    color: theme.colors.text.light,
    fontWeight: '500',
  },
});

export default SetlistDetail;
