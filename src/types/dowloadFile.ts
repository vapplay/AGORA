import { saveFile } from "./saveFile";
import * as FileSystem from "expo-file-system";
import { Platform } from "react-native";


export const dowloadFile = async (filename: string, uri:string) => {
  const result = await FileSystem.downloadAsync(
    uri,
    FileSystem.documentDirectory + filename
  );
  console.log(result);

  saveFile(result.uri, filename, result.headers["content-type"]);
};
