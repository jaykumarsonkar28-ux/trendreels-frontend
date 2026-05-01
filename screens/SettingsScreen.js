import React, { useContext } from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons'; // Icons ke liye
import { ThemeContext } from '../contexts/ThemeContext';

export default function SettingsScreen() {
  const { colors } = useContext(ThemeContext);

  // Ek chhota component jo har list item ko design karega
  const SettingsItem = ({ icon, title, value }) => (
    <TouchableOpacity style={[styles.itemContainer, { borderBottomColor: colors.surface }]}>
      <View style={styles.itemLeft}>
        <Ionicons name={icon} size={24} color={colors.text} style={styles.icon} />
        <Text style={[styles.itemText, { color: colors.text }]}>{title}</Text>
      </View>
      <View style={styles.itemRight}>
        {value && <Text style={[styles.valueText, { color: colors.secondary }]}>{value}</Text>}
        <Ionicons name="chevron-forward" size={20} color={colors.secondary} />
      </View>
    </TouchableOpacity>
  );

  const SectionHeader = ({ title }) => (
    <Text style={[styles.sectionHeader, { color: colors.secondary }]}>{title}</Text>
  );

  return (
    <ScrollView style={{ flex: 1, backgroundColor: colors.background }}>
      <View style={styles.container}>
        
        {/* Section 1: Who can see your content */}
        <SectionHeader title="Who can see your content" />
        <SettingsItem icon="lock-closed-outline" title="Account privacy" value="Public" />
        <SettingsItem icon="star-outline" title="Close Friends" value="2" />
        <SettingsItem icon="grid-outline" title="Crossposting" />
        <SettingsItem icon="ban-outline" title="Blocked" value="0" />
        <SettingsItem icon="time-outline" title="Story, live and location" />
        <SettingsItem icon="people-outline" title="Activity in Friends tab" />

        {/* Section 2: How others can interact with you */}
        <SectionHeader title="How others can interact with you" />
        <SettingsItem icon="chatbubble-ellipses-outline" title="Messages and story replies" />
        <SettingsItem icon="at-circle-outline" title="Tags and mentions" />
        <SettingsItem icon="chatbox-outline" title="Comments" />
        <SettingsItem icon="share-social-outline" title="Sharing and reuse" />
        <SettingsItem icon="close-circle-outline" title="Restricted" value="0" />
        <SettingsItem icon="warning-outline" title="Limit interactions" value="Off" />
        <SettingsItem icon="text-outline" title="Hidden Words" />
        <SettingsItem icon="person-add-outline" title="Follow and invite friends" />

        {/* Section 3: What you see */}
        <SectionHeader title="What you see" />
        <SettingsItem icon="star-outline" title="Favorites" value="0" />
        <SettingsItem icon="notifications-off-outline" title="Muted accounts" value="0" />
        <SettingsItem icon="play-circle-outline" title="Content preferences" />
        <SettingsItem icon="heart-dislike-outline" title="Like and share counts" />
        <SettingsItem icon="ribbon-outline" title="Creator subscriptions" />

        {/* Section 4: Your app and media */}
        <SectionHeader title="Your app and media" />
        <SettingsItem icon="cellular-outline" title="Data usage and media quality" />
        
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingVertical: 10,
  },
  sectionHeader: {
    fontSize: 14,
    fontWeight: 'bold',
    marginLeft: 15,
    marginTop: 20,
    marginBottom: 10,
  },
  itemContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 15,
    paddingHorizontal: 15,
    borderBottomWidth: 0.5,
  },
  itemLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  icon: {
    marginRight: 15,
  },
  itemText: {
    fontSize: 16,
  },
  itemRight: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  valueText: {
    marginRight: 10,
    fontSize: 14,
  },
});
    
