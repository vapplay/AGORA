import { Linking, Platform } from "react-native";


export const checkAppInstalled = async (packageName:string) => {
  try {
    const url = `${packageName}://`; // Esquema de URL personalizado para la aplicación que deseas verificar
    await Linking.canOpenURL(url);
    return true; // La aplicación está instalada
  } catch (error) {
    return false; // La aplicación no está instalada
  }
};

// Llamar a la función para verificar si la aplicación está instalada


// Uso de la función
