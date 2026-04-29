import React, { useState, useEffect, useRef, useContext } from 'react';
import { View, TextInput, FlatList, Text, TouchableOpacity } from 'react-native';
import io from 'socket.io-client';
import { ThemeContext } from '../contexts/ThemeContext';

export default function CheatingRoom({ partnerId, userId }) {
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState('');
  const socket = useRef(null);
  const { colors } = useContext(ThemeContext);

  useEffect(() => {
    // Ye URL baad mein aapke Render server se replace hoga
    socket.current = io('https://your-backend-api.onrender.com');
    
    socket.current.emit('join-cheating-room', `${userId}-${partnerId}`);
    
    socket.current.on('new-cheating-message', (msg) => {
      setMessages(prev => [...prev, msg]);
    });

    return () => socket.current.disconnect();
  }, []);

  const sendMessage = () => {
    if (message.trim().length === 0) return;
    
    const msg = {
      roomId: `${userId}-${partnerId}`,
      sender: userId,
      text: message,
      timestamp: new Date()
    };
    
    socket.current.emit('cheating-message', msg);
    setMessages(prev => [...prev, msg]);
    setMessage('');
  };

  return (
    <View style={{ flex: 1, backgroundColor: colors.background }}>
      <FlatList
        data={messages}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <View style={[
            { padding: 12, margin: 8, borderRadius: 15, maxWidth: '75%' },
            item.sender === userId 
              ? { backgroundColor: colors.primary, alignSelf: 'flex-end' }
              : { backgroundColor: colors.surface, alignSelf: 'flex-start' }
          ]}>
            <Text style={{ color: item.sender === userId ? '#FFFFFF' : colors.text }}>
              {item.text}
            </Text>
          </View>
        )}
      />
      
      <View style={{ flexDirection: 'row', padding: 15, borderTopWidth: 0.5, borderColor: colors.secondary }}>
        <TextInput
          style={{
            flex: 1,
            backgroundColor: colors.surface,
            borderRadius: 25,
            paddingHorizontal: 15,
            color: colors.text,
            height: 45
          }}
          value={message}
          onChangeText={setMessage}
          placeholder="Type a message..."
          placeholderTextColor={colors.secondary}
        />
        <TouchableOpacity
          onPress={sendMessage}
          style={{
            backgroundColor: colors.primary,
            width: 45,
            height: 45,
            borderRadius: 22.5,
            justifyContent: 'center',
            alignItems: 'center',
            marginLeft: 10
          }}
        >
          <Text style={{ color: '#FFFFFF', fontWeight: 'bold' }}>Go</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
    }
                 
