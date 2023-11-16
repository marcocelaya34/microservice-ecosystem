# App Mobile

The Transaction App is a mobile application developed using React Native, and it facilitates the creation of transactions by communicating with the API through the GraphQL SDK for React Native.

## Key Features

1. Transaction Creation
   Users can create new transactions, providing details such as amount, description, and recipient information.

2. GraphQL SDK Integration
   The app utilizes the GraphQL SDK for React Native to streamline communication with the API. This ensures efficient and structured data retrieval and submission.

# Getting Started

> **Note**: Make sure you have completed the [React Native - Environment Setup](https://reactnative.dev/docs/environment-setup) instructions till "Creating a new application" step, before proceeding.

## Step 1: Start the Metro Server

First, you will need to start **Metro**, the JavaScript _bundler_ that ships _with_ React Native.

To start Metro, run the following command from the _root_ of your React Native project:

```bash
# using npm
npm start

# OR using Yarn
yarn start
```

## Step 2: Start your Application

Let Metro Bundler run in its _own_ terminal. Open a _new_ terminal from the _root_ of your React Native project. Run the following command to start your _Android_ or _iOS_ app:

### For Android

```bash
# using npm
npm run android

# OR using Yarn
yarn android
```

### For iOS

```bash
# using npm
npm run ios

# OR using Yarn
yarn ios
```

If everything is set up _correctly_, you should see your new app running in your _Android Emulator_ or _iOS Simulator_ shortly provided you have set up your emulator/simulator correctly.

This is one way to run your app — you can also run it directly from within Android Studio and Xcode respectively.

## Authors

- **Marco Antonio Celaya Ordaz** - _Initial work_ - [Marco Celaya - Linkeding](https://github.com/marcocelaya34)
