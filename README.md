# Beemaster General

Welcome to the Beemaster General project repository. Follow these instructions to set up and run the project on your local machine.

## Prerequisites

- Git
- Node.js and npm
- Visual Studio Code (recommended)
- An Android or iOS emulator (recommended)
- Note: A Mac is required to compile the iOS application. Both the Web and Android application can be compiled on both Windows and Mac operating systems.
- Note: Admin rights may be required for Visual Studio Code and shell commands on some systems.

## Setup Instructions

1. **Clone the Repository**

 Clone the project repository from GitHub:
 
```git clone https://github.com/sammish93/beemaster_general```

2. **Download Required Files**

Download the following files from the project manager:
- `.env`
- `GoogleService-Info.plist`
- `google-services.json`

Place these files in the root directory of the project.

3. **Install Dependencies**

Open your terminal and run the following command in the project directory:

```npm install```

4. **Modify `useWebQRScanner.js`**

In the file `node_modules/expo-camera/build/useWebQRScanner.js`, comment out lines 46 and 49:

5. **Prebuild the Project**

```npx expo prebuild```

6. **Run the Project**

To launch the development build, use one of the following commands:

```npx expo run:android```
or
```npx expo run:ios```

From there on you can select whether to launch the application on the web, or on an Android or iOS device. Setting a path for an emulator varies based on your local machine. More information can be found [here](https://docs.expo.dev/workflow/android-studio-emulator/) or [here](https://docs.expo.dev/workflow/ios-simulator/).

Note: The iOS application may have additional steps.

## Recommended Actions

Once you get the project up and running you'll be met with a login screen. Here you can register using a personal email, an existing google account, or an anonymous account. We recommend you click the button to fill in account details automatically (contained in the .env file locally) in order to log into an existing account filled with dummy data. Once you're logged in here are some actions that we recommend you perform in order to demonstrate key features of the application:

1. **Action 1**

Blah blah

2. **Action 2**

Blah blah
