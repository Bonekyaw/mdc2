import { Slot } from "expo-router";
import { SessionProvider } from "@/providers/ctx";
import { Provider } from "react-redux";
import { store } from "@/services/redux/store";
import { RootSiblingParent } from "react-native-root-siblings";
import { GestureHandlerRootView } from "react-native-gesture-handler";

export default function Root() {
  return (
    <Provider store={store}>
      <RootSiblingParent>
        <GestureHandlerRootView>
          <SessionProvider>
            <Slot />
          </SessionProvider>
        </GestureHandlerRootView>
      </RootSiblingParent>
    </Provider>
  );
}
