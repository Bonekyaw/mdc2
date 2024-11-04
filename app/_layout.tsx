import { Slot } from "expo-router";
import { SessionProvider } from "@/providers/ctx";

export default function Root() {
  return (
    <SessionProvider>
      <Slot />
    </SessionProvider>
  );
}
