import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from 'react-native';
import { theme } from '../styles/theme';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import DateTimePicker from '@react-native-community/datetimepicker';
import { format } from 'date-fns';
import { fr } from 'date-fns/locale';

const CreateSetlist = ({ navigation }) => {
  const [setlistData, setSetlistData] = useState({
    name: '',
    date: new Date(),
    venue: '',
    description: '',
  });
  const [showDatePicker, setShowDatePicker] = useState(false);

  const handleCreate = () => {
    // TODO: Implémenter la création de setlist avec l'API
    navigation.navigate('SetlistList');
  };

  const onDateChange = (event, selectedDate) => {
    setShowDatePicker(false);
    if (selectedDate) {
      setSetlistData(prev => ({ ...prev, date: selectedDate }));
    }
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Icon name="arrow-left" size={24} color={theme.colors.primary} />
        </TouchableOpacity>
        <Text style={styles.title}>Nouvelle Setlist</Text>
        <TouchableOpacity onPress={handleCreate}>
          <Icon name="check" size={24} color={theme.colors.secondary} />
        </TouchableOpacity>
      </View>

      <View style={styles.form}>
        <View style={styles.inputGroup}>
          <Text style={styles.label}>Nom de la setlist</Text>
          <TextInput
            style={styles.input}
            value={setlistData.name}
            onChangeText={(text) => setSetlistData(prev => ({ ...prev, name: text }))}
            placeholder="Ex: Concert du printemps"
            placeholderTextColor={theme.colors.text.secondary}
          />
        </View>

        <View style={styles.inputGroup}>
          <Text style={styles.label}>Date</Text>
          <TouchableOpacity
            style={styles.dateButton}
            onPress={() => setShowDatePicker(true)}
          >
            <Icon name="calendar" size={20} color={theme.colors.text.secondary} />
            <Text style={styles.dateText}>
              {format(setlistData.date, 'dd MMMM yyyy', { locale: fr })}
            </Text>
          </TouchableOpacity>
          {showDatePicker && (
            <DateTimePicker
              value={setlistData.date}
              mode="date"
              onChange={onDateChange}
            />
          )}
        </View>

        <View style={styles.inputGroup}>
          <Text style={styles.label}>Lieu</Text>
          <TextInput
            style={styles.input}
            value={setlistData.venue}
            onChangeText={(text) => setSetlistData(prev => ({ ...prev, venue: text }))}
            placeholder="Ex: Salle des fêtes"
            placeholderTextColor={theme.colors.text.secondary}
          />
        </View>

        <View style={styles.inputGroup}>
          <Text style={styles.label}>Description</Text>
          <TextInput
            style={[styles.input, styles.textArea]}
            value={setlistData.description}
            onChangeText={(text) => setSetlistData(prev => ({ ...prev, description: text }))}
            placeholder="Notes supplémentaires..."
            placeholderTextColor={theme.colors.text.secondary}
            multiline
            numberOfLines={4}
            textAlignVertical="top"
          />
        </View>
      </View>

      <TouchableOpacity
        style={[
          styles.createButton,
          !setlistData.name && styles.createButtonDisabled,
        ]}
        onPress={handleCreate}
        disabled={!setlistData.name}
      >
        <Text style={styles.createButtonText}>Créer la setlist</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: theme.spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.background,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: theme.colors.primary,
  },
  form: {
    padding: theme.spacing.md,
  },
  inputGroup: {
    marginBottom: theme.spacing.lg,
  },
  label: {
    fontSize: 16,
    fontWeight: '500',
    color: theme.colors.text.primary,
    marginBottom: theme.spacing.sm,
  },
  input: {
    backgroundColor: theme.colors.surface,
    borderRadius: theme.borderRadius.medium,
    padding: theme.spacing.md,
    fontSize: 16,
    color: theme.colors.text.primary,
    ...theme.shadows.small,
  },
  textArea: {
    height: 100,
    textAlignVertical: 'top',
  },
  dateButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: theme.colors.surface,
    borderRadius: theme.borderRadius.medium,
    padding: theme.spacing.md,
    gap: theme.spacing.sm,
    ...theme.shadows.small,
  },
  dateText: {
    fontSize: 16,
    color: theme.colors.text.primary,
  },
  createButton: {
    backgroundColor: theme.colors.secondary,
    margin: theme.spacing.md,
    padding: theme.spacing.md,
    borderRadius: theme.borderRadius.medium,
    alignItems: 'center',
    ...theme.shadows.medium,
  },
  createButtonDisabled: {
    backgroundColor: theme.colors.text.secondary,
    opacity: 0.5,
  },
  createButtonText: {
    color: theme.colors.text.light,
    fontSize: 16,
    fontWeight: '600',
  },
});

export default CreateSetlist;
