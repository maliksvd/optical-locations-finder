import { StatusBar } from 'expo-status-bar';
import React, { useCallback, useMemo, useRef } from 'react';
import { GestureHandlerRootView, TextInput } from 'react-native-gesture-handler';
import { Button, StyleSheet, Text, View } from 'react-native';
import BottomSheet, { BottomSheetView } from '@gorhom/bottom-sheet';

import MapView from 'react-native-maps';
import {Marker} from 'react-native-maps';


export default function App() {
  const bottomSheetRef = useRef(null);
  
  const handleSheetChanges = useCallback((index) => {
    console.log('handleSheetChanges', index);
  }, []);


  const handleMarkerPress = () => {
    console.log('handleMarkerPress');
    bottomSheetRef.current.collapse(); 
    
  };

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <View style={styles.container}>
        <StatusBar style="auto" />
        <MapView  
          style={styles.map} 
          initialRegion={{
            latitude: 45.5017,
            longitude: -73.5673,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          }}>
           <Marker coordinate={{latitude: 45.5017, longitude: -73.5673}} title="Lunetterie Locale" description="1234 Rue de la Lunette" />
            {Array.from({ length: 10 }).map((_, index) => (
              <Marker
                key={`marker-${index}`}
                coordinate={{
                  latitude: 45.5017 + Math.random() * 0.1,
                  longitude: -73.5673 + Math.random() * 0.1,
                }}
                title={`Lunetterie Locale - ${index}`}
                description={`1234 Rue de la Lunette ${index}`}
              />
            
          ))}
        </MapView>
        <BottomSheet
          ref={bottomSheetRef}
          onChange={handleSheetChanges}
          snapPoints={['15%', '50%', '80%']}
        >
          <BottomSheetView style={styles.contentContainer}>
            <Text
              style={{
                fontSize: 24,
                marginBottom: 12,
                fontWeight: 'bold',
              }}
            >Search</Text>
            <TextInput 
              style={styles.input}
              placeholder="Find a location by typing..." 
            />
            {Array.from({ length: 10 }).map((_, index) => (
              <View key={index} style={styles.locationCard}>
                <Text style={{ fontSize: 18, fontWeight: 'bold' }}>
                  Lunetterie Locale - {index}
                </Text>
                <Text>1234 Rue de la Lunette {index}</Text>
                <Button title="View Details" onPress={handleMarkerPress} />
              </View>
            ))}


          </BottomSheetView>
        </BottomSheet>
      </View>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  contentContainer: {
    flex: 1,
    padding: 24,
  },
  input: {
    height: 50,
    padding: 10,
    backgroundColor: '#f2f2f7',
    borderRadius: 8,
  },
  map: {
    width: '100%',
    height: '100%',
  },
  locationCard: {
    marginTop: 24,
    backgroundColor: '#f2f2f7',
    borderRadius: 8,
    padding: 12,
  },
});
