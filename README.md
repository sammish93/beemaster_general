# Beemaster General

Welcome to the Beemaster General project repository. Follow these instructions to set up and run the project on your local machine.

## Prerequisites

- Git
- Node.js and npm
- Visual Studio Code (recommended)
- An Android or iOS emulator (recommended)
- <em>Note: A Mac is required to compile the iOS application. Both the Web and Android application can be compiled on both Windows and Mac operating systems.</em>
- <em>Note: Admin rights may be required for Visual Studio Code and shell commands on some systems.</em>

## Setup Instructions

1. **Clone the Repository**

Clone the project repository from GitHub:

`git clone https://github.com/sammish93/beemaster_general`

2. **Download Required Files**

Download the following files from the project manager:

- `.env`
- `GoogleService-Info.plist`
- `google-services.json`

Place these files in the root directory of the project.

3. **Install Dependencies**

Open your terminal and run the following command in the project directory:

`npm install`

4. **Modify `useWebQRScanner.js`**

In the file `node_modules/expo-camera/build/useWebQRScanner.js`, comment out lines 46 and 49:

5. **Prebuild the Project**

`npx expo prebuild`

**Important: Users attempting to build an iOS project must additionally run the command `npx pod-install` in order to install the CocoaPods dependency.**

6. **Run the Project**

To launch the development build, use one of the following commands:

`npx expo run:android`
or
`npx expo run:ios`

From there on you can select whether to launch the application on the web, or on an Android or iOS device. Setting a path for an emulator varies based on your local machine. More information can be found [here](https://docs.expo.dev/workflow/android-studio-emulator/) or [here](https://docs.expo.dev/workflow/ios-simulator/).

## Recommended Actions

Once you get the project up and running you'll be met with a login screen. Here you can register using a personal email, an existing google account, or an anonymous account. We recommend you click the button named 'Fill credentials' to fill in account details automatically (contained in the .env file locally) in order to log into an existing account filled with dummy data. Once you're logged in here are some actions that we recommend you perform in order to demonstrate key features of the application:

1. **Create a hive**

Click on the 'Add new hive' button on the home screen. You should be prompted to share your location with the application. Accept, and then give the hive a name. Navigate to an area on the map component and press/click on a location to drop a marker. This is the location of your hive.

2. **Swap between display modes**

Click on the 'Simplified View' toggle on the top of the home screen to toggle between displaying your newly created hive card between simplified and detailed mode. Simplified mode displays only the current forecast, while detailed mode displays the most recent reading from the linked hive sensor (if it exists).

3. **Add a filter**

Click on the 'Add new filter' button on the top of the home screen. This feature allows users to further organise hive filtering to make hive management easier. Add a new filter by giving it a name. Once the filter has been added then it should appear on the top of the home screen. You can now assign a filter to one or more of your hives by clicking on the floating action button displayed on each card (or a long press on a card if you are using a mobile device). Each hive can have several filters assigned to it. Once it has been assigned then your filter tab at the top of the screen should no longer be faded out - if you click on it it will only show hive cards that include that specific hive.

4. **Visit the hive page**

Click on a hive card to visit a more detailed view of a specific hive. Here you can view a forecast summary based on the hive's location. You can click on the floating action button on the forecast component in order to visit the forecast screen which provides an in-depth weather forecast.

Regarding the hive screen - you can also view charts showing sensor data readings for the previous 3 days (additionally, clicking on the 'Historical data' button will open a modal in which you can view all sensor data readings.

5. **Create a hive note**

On the hive screen, click on the pencil icon located on the top bar (to the far right). This should open a modal in which you can write a note with the option to 'sticky' (pin) it. Notes are displayed on the hive screen and are sorted automatically by date, with the most recent notes appearing first. Additionally, notes that are stickied are always located before non-stickied notes, regardless of dates.

6. **Visit hive settings**

By clicking on the cogwheel icon next to the pencil icon you will be navigated to the hive settings screen. Here you can rename and relocate a hive, as well as add filters to said hive. Additionally, you can download historical hive data in JSON format, or delete the hive.

There also exists a section dedicated to notification types. Here you can toggle whether you will receive notifications of a specific type (e.g. weather-based notifications) for a specific hive. Furthermore, you can click the 'Customise' button in order to further adjust the parameters that determine whether a specific notification will be triggered.

<em>Note that if a hive has a specific notification type toggled on but has the same notification type toggled off on the settings screen (not the hive settings screen) then the user will fail to receive notifications unless enabled globally.</em>

7. **Manage sensors**

While you're on the hive settings screen you can click on the 'Manage sensors' button. From here you can view which sensors are registered to a specific hive. You can register a new sensor by entering a valid hive ID, as well deleting a sensor from that specific hive. Once added, you should see sensor data on the hive screen, as well as on a detailed card view on the home screen, providing that the hive has written a data reading to the database.

<em>Note that only one physical sensor exists as of now and, therefore, can only be registered to a single hive. The sensor in question has the ID 'weight-sensor-1'.</em>

**Important: The only physical sensor prototype in existence is linked to the hive named 'Honey Bee' located on the dummy account contained in the .env folder (the account credentials that are automatically filled in when you click on the 'Fill credentials' button on the login screen).**

8. **Visit updates screen**

Any notifications you receive (even while you're offline or logged out) will be displayed here. This screen is a handy way of making sure that you remember important notifications. Additionally, you can turn off a specific notification type for a specific hive by pressign the 'Mute' button (this is the same functionality which controls the notification type toggle switches). When a notification is no longer of interest then you can click the 'Seen' button in order to delete it permanently from your notification feed.

9. **Visit settings screen**

The settings screen includes functionality to further customise the application to the user. Here you can toggle the application's colour scheme between light and dark mode. Feel free to change the language of the application - the whole application contains translations for English and Norwegian, as well as date and time localisation for British English, American English, and Norwegian. Additionally, you can change your country to the United Kingdom or Norway. Changing your country gives you the option to reset the default notification parameters in order to reduce the time spent by the user setting up notifications.

Furthermore, you can change your desired measurement preferences. Do you prefer viewing hive weight sensor data as ounces instead of grams, or weather forecasts in Fahrenheit instead of Celsius? No problem - just choose a new value from the dropdown menu. All values in the application (including user input) automatically adjust based on your measurement preferences.

You can also manage your device permissions on this screen, together with toggling the notification method. As of now only mobile push notifications are supported. Additionally, global notification type toggles are available here, as described in action #6.

Finally, you can log out or delete your account from this screen. If you logged in using an anonymous account then you can click the 'Register email' button in order to create an account in order to provide access over several devices.
