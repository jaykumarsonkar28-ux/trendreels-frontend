import React, { useState, useContext } from 'react';
import { ScrollView, View, Text, TouchableOpacity } from 'react-native';
import { ThemeContext } from '../contexts/ThemeContext';

export default function CreatorDashboard() {
  const { colors } = useContext(ThemeContext);
  
  // Dummy data for now
  const [stats, setStats] = useState({
    monetizationUnlocked: false,
    walletBalance: 0,
    views: 1200
  });

  return (
    <ScrollView style={{ flex: 1, backgroundColor: colors.background }}>
      <View style={{ padding: 20 }}>
        
        {/* Monetization Status */}
        <View style={[
          { padding: 20, borderRadius: 15, marginBottom: 20 },
          stats.monetizationUnlocked 
            ? { backgroundColor: '#D4EDDA' } 
            : { backgroundColor: '#F8D7DA' }
        ]}>
          <Text style={{ fontSize: 18, fontWeight: 'bold', color: '#1C1E21' }}>
            {stats.monetizationUnlocked 
              ? `✅ Monetization Active - $${stats.walletBalance}` 
              : '🔒 Unlock monetization (30 days, 5K views, 500 followers)'
            }
          </Text>
        </View>

        {/* Payout Section */}
        {stats.walletBalance > 10 && stats.monetizationUnlocked && (
          <TouchableOpacity
            style={{
              backgroundColor: colors.primary,
              padding: 20,
              borderRadius: 15,
              marginTop: 20,
              alignItems: 'center'
            }}
          >
            <Text style={{ color: '#FFFFFF', fontSize: 18, fontWeight: 'bold' }}>
              Withdraw ${stats.walletBalance}
            </Text>
          </TouchableOpacity>
        )}
      </View>
    </ScrollView>
  );
                     }
          
