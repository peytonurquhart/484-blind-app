import * as FileSystem from 'expo-file-system';
export function transcribe(filePath) {
    console.log("-");
    console.log("transcribe: ");
    console.log("    uri: " + filePath);
    FileSystem.getInfoAsync(filePath).then(data => {
        console.log(JSON.stringify(data, null, 4));
    });
    FileSystem.readAsStringAsync(filePath, {encoding: FileSystem.EncodingType.Base64}).then(data => {
        console.log("    length: " + data.length);
        console.log("-");
        // TBI transcribe with api
    });
}
