import { Stack } from "expo-router";
import { useFonts } from "expo-font";
import { UserDetailContext } from "../context/UserDetailsContext";
import { useState } from "react";
import Toast, { BaseToast } from 'react-native-toast-message';

export default function RootLayout() {
  useFonts({
    'outfit': require('../assets/fonts/Outfit-Regular.ttf'),
    'outfit-bold': require('../assets/fonts/Outfit-Bold.ttf'),
    
    
  });
  const toastConfig = {
warning: (props) => (
      <BaseToast
        {...props}
        style={{ borderLeftColor: 'orange', borderLeftWidth: 5 }}
        text1Style={{ fontSize: 16, fontWeight: 'bold', color: 'orange' }}
        text2Style={{ fontSize: 14 }}
      />
    ),
Waiting: (props) => (
    <BaseToast
      {...props}
      style={{ borderLeftColor: '#e8000d', borderLeftWidth: 5 }}
      text1Style={{ fontSize: 16, fontWeight: 'bold', color: '#e8000d' }}
      text2Style={{ fontSize: 14 }}
    
  />
  ),

}

  const [userDetail, setUserDetail] = useState();

  return (
    <UserDetailContext.Provider value={{ userDetail, setUserDetail }}>
      
        <Stack screenOptions={{ headerShown: false }} />
         <Toast config={toastConfig} />
        
       

      
     </UserDetailContext.Provider>
  );
}
