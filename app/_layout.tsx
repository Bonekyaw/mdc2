import { Slot } from "expo-router";
import { SessionProvider } from "@/providers/ctx";
import { Provider } from "react-redux";
import { store } from "@/services/redux/store";
import { RootSiblingParent } from "react-native-root-siblings";

export default function Root() {
  return (
    <Provider store={store}>
      <RootSiblingParent>
        <SessionProvider>
          <Slot />
        </SessionProvider>
      </RootSiblingParent>
    </Provider>
  );
}
