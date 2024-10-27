import React from 'react';
import MainNav from './Screen/MainNav';
import { AuthProvider } from './Screen/AuthContext';
import { GestureHandlerRootView } from 'react-native-gesture-handler'
export default function App() {
  return (
    <>
      <GestureHandlerRootView style={{ flex: 1 }}>
          <AuthProvider>
            <MainNav />
          </AuthProvider>
      </GestureHandlerRootView>

    </>
  );
}
