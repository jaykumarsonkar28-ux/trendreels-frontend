import React, { useRef, useState, useContext } from 'react';
import { Camera } from 'expo-camera';
import { View, TouchableOpacity, Text } from 'react-native';
import { FFmpegKit } from 'ffmpeg-kit-react-native';
import { ThemeContext } from '../contexts/ThemeContext';

const FILTERS = {
  vintage: '[vintage]hue=s=0.6[v];[v]curves=r="0/0 0.29/0.17 0.71/0.55 1/1":g="0/0 0.29/0.47 0.71/0.78 1/1":b="0/0 0.29/0.18 0.71/0.75 1/1"[c];[c]vignette="[0.6/0 0.7/0 1/1]"[vign];[vign]eq=contrast=1.1:brightness=0.05:saturation=1.15[out]',
  color: 'eq=brightness=0.05:contrast=1.1:saturation=1.2',
};

export default function CameraScreen() {
  const cameraRef = useRef(null);
  const { colors } = useContext(ThemeContext);
  const [selectedFilter, setSelectedFilter] = useState('none');

  const applyFilter = async (videoPath, filterName) => {
    const outputPath = `${videoPath}_filtered.mp4`;
    await FFmpegKit.execute(
      `-i ${videoPath} -vf "${FILTERS[filterName]}" -c:a copy ${outputPath}`
    );
    return outputPath;
  };

  const recordVideo = async () => {
    if (cameraRef.current) {
      const video = await cameraRef.current.recordAsync();
      const filteredVideo = await applyFilter(video.uri, selectedFilter);
      console.log('Video saved with filter at:', filteredVideo);
    }
  };

  return (
    <View style={{ flex: 1, backgroundColor: colors.background }}>
      <Camera style={{ flex: 1 }} ref={cameraRef}>
        <View style={{ flex: 1, justifyContent: 'flex-end', padding: 20 }}>
          
          <View style={{ flexDirection: 'row', justifyContent: 'space-around', marginBottom: 20 }}>
            {Object.keys(FILTERS).map(filter => (
              <TouchableOpacity
                key={filter}
                onPress={() => setSelectedFilter(filter)}
                style={[
                  { padding: 10, borderRadius: 20 },
                  selectedFilter === filter ? { backgroundColor: colors.primary } : {}
                ]}
              >
                <Text style={{ color: colors.text, fontWeight: 'bold' }}>
                  {filter}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
          
          <TouchableOpacity
            onPress={recordVideo}
            style={{
              backgroundColor: colors.primary,
              padding: 20,
              borderRadius: 50,
              alignSelf: 'center'
            }}
          >
            <Text style={{ color: '#FFFFFF', fontSize: 18, fontWeight: 'bold' }}>
              Record
            </Text>
          </TouchableOpacity>
        </View>
      </Camera>
    </View>
  );
                 }
