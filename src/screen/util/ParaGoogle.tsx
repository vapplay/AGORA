import React, { useState, useEffect } from 'react';
import { View, StyleSheet, TouchableWithoutFeedback, Animated, Text } from 'react-native';

const MyScreen = () => {
  const [color, setColor] = useState('red');
  const [touchIndicator, setTouchIndicator] = useState(false);
  const [scaleValue, setScaleValue] = useState(new Animated.Value(1));

  useEffect(() => {
    // Aplica una animación aleatoria al cambiar de color
    const animateColorChange = () => {
      // Genera valores aleatorios para la escala y la duración de la animación
      const scale = 1 + Math.random();
      const duration = 500 + Math.random() * 1000;

      // Inicia la animación de escala
      Animated.timing(scaleValue, {
        toValue: scale,
        duration,
        useNativeDriver: true,
      }).start();
    };

    // Ejecuta la animación al cambiar el color
    animateColorChange();
  }, [color]);

  const handleTouchStart = () => {
    setTouchIndicator(true);
  };

  const handleTouchEnd = () => {
    setTouchIndicator(false);
  };

  const changeColor = () => {
    const newColor = getRandomColor();
    setColor(newColor);
  };

  const getRandomColor = () => {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  };

  const animatedStyle = {
    transform: [{ scale: scaleValue }],
  };

  return (
    <TouchableWithoutFeedback onPress={changeColor} onPressIn={handleTouchStart} onPressOut={handleTouchEnd}>
      <View style={[styles.container, { backgroundColor: color }]}>

          <Text style={styles.touchIndicator} numberOfLines={1}>
            Toca la pantalla
          </Text>
     
        <Animated.View style={[styles.colorChangeIndicator, animatedStyle]} />
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  touchIndicator: {
    position: 'absolute',
    fontSize: 24,
    color: 'white',
    top: '50%',
    textAlign: 'center',
    marginTop: 20,
    fontWeight: 'bold',
  },
  colorChangeIndicator: {
    position: 'absolute',
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: 'white',
    backgroundColor: 'transparent',
  },
});

export default MyScreen;
