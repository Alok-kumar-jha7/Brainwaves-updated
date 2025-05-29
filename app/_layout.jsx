import { Stack } from "expo-router";
import { useFonts } from "expo-font";
// import { Toast } from "react-native-toast-message/lib/src/Toast";
import { UserDetailContext } from "./../context/UserDetailsContext";
import { useState } from "react";

export default function RootLayout() {
  useFonts({
    'outfit': require('../assets/fonts/Outfit-Regular.ttf'),
    'outfit-bold': require('../assets/fonts/Outfit-Bold.ttf'),
  });

  const [userDetail, setUserDetail] = useState();

  return (
    <UserDetailContext.Provider value={{ userDetail, setUserDetail }}>
      <>
        <Stack screenOptions={{ headerShown: false }} />
        {/* <Toast />  */}
        
        
       

      </>
    </UserDetailContext.Provider>
  );
}
