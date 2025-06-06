import React, { useEffect, useRef } from 'react';
import { View, Animated, StyleSheet } from 'react-native';

export default function SplashScreen({ navigation }) {
  const scaleAnim = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    const pulse = Animated.loop(
      Animated.sequence([
        Animated.timing(scaleAnim, {
          toValue: 1.1,
          duration: 2200,
          useNativeDriver: true,
        }),
        Animated.timing(scaleAnim, {
          toValue: 0.9,
          duration: 500,
          useNativeDriver: true,
        }),
      ])
    );

    pulse.start();

    const timer = setTimeout(() => {
      pulse.stop();
      navigation.replace('Login');
    }, 2500);

    return () => {
      clearTimeout(timer);
      pulse.stop();
    };
  }, []);

  return (
    <View style={styles.container}>
      <Animated.Image
        source={require('../assets/logo-login.webp')}
        style={[styles.logo, { transform: [{ scale: scaleAnim }] }]}
        resizeMode="contain"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
  },
  logo: {
    width: 200,
    height: 200,
  },
});
