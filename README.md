# B.L.I.N.D
## Bidirectional Location Impairment Navigational Device
### Team
- Peyton Urquhart
- Tanner Dryden
- Stephen Graham
- Turner Smith                                                                                              
- Brandon Luy
### Overview
A smartphone app that aids visually impaired individuals in safely navigating throughout a building with 
concern for detecting obstacles, time to destination, and familiarity of the route. This app will utilize
voice commentary and the vibrate features of a smartphone to direct the user to their destination within a 
building.

### How to get Started (Windows)
#### 1. Requirements
- Latest version of Node.js: https://nodejs.org/en/download/
- Latest version of npm: ```npm install -g npm```
- Yarn: ```npm install --global yarn```
- VSCode or preferred IDE
#### 2. Android Emulator
- Download & Install Android Studio: https://developer.android.com/studio
- Open Android Studio -> 'More Actions' -> 'AVD Manager' -> 'Create Virtual Device'
- Create Device 'Pixel 4 XL Pie (API Level 28) Android 9.0 x86'
- You should see the new device in the AVD Manager, make sure it launches.
#### 3. EXPO CLI
- ```npm install -g expo-cli``` or ```yarn global add expo-cli```
#### 4. Fork this Repository
#### 5. Open the Root Directory in your IDE
- Open 'package.json'
- Under "scripts" section, see command line scripts.
- Under "dependencies", see required node modules for the project.
#### 6. Open a Terminal in the Root Directory
- Make sure you have all requiremets from the 'Required Node Modules' section of this document.
- Type ```yarn start``` to start with expo
- If development server starts correctly and a browser tab opens, go to step 7. Keep tab open.
- If errors, follow prompts in terminal, you may need to install additional node modules with npm or yarn. Check 'package.json' "dependencies" are installed in your environment.
#### 7. Start the Android Emulator you created in step 2.
- Navigate to the browser tab which opened in step 6.
- Select 'Run on Android device/emulator'
- Wait for your android emulator to respond.

### Required Node Modules
- GUI Elements: ```yarn add react-native-vector-icons```
- GUI Library: ```yarn add react-native-paper``` or ```npm install react-native-paper```
- App Navigation: ```npm install @react-navigation/native @react-navigation/native-stack```
- App Navigation: ```expo install react-native-screens react-native-safe-area-context```
- Dropdown Menu: ```yarn add react-native-paper-dropdown```
- Menu Slider: ```yarn add @miblanchard/react-native-slider```
- Redux Toolkit: ```yarn add @reduxjs/toolkit```
- React Redux: ```yarn add react-redux```
- Text to Speech ```expo install expo-speech```

### Contribute
- Create a branch for your changes
- Submit a descriptive pull request




