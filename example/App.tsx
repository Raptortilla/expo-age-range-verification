import { useState } from "react";
import { View, Button, Text, Platform } from "react-native";
import { requestDeclaredAgeRange, isAtLeastAge } from "expo-age-verification";

export default function App() {
  const [output, setOutput] = useState("Press a button to test");

  async function handleRequest() {
    try {
      if (Platform.OS !== "ios") {
        setOutput("Declared Age Range only exists on iOS.");
        return;
      }
      const res = await requestDeclaredAgeRange([13, 16, 18]);
      setOutput(JSON.stringify(res, null, 2));
    } catch (e: any) {
      setOutput(`Error: ${e?.message ?? String(e)}`);
    }
  }

  async function handleCheck18() {
    try {
      const ok = await isAtLeastAge(18);
      setOutput(
        ok ? "User is at least 18" : "User is NOT at least 18 / declined"
      );
    } catch (e: any) {
      setOutput(`Error: ${e?.message ?? String(e)}`);
    }
  }

  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        gap: 12,
      }}
    >
      <Button title="Request Declared Age Range" onPress={handleRequest} />
      <Button title="Check if user is 18+" onPress={handleCheck18} />
      <Text style={{ marginTop: 16, paddingHorizontal: 16 }} selectable>
        {output}
      </Text>
    </View>
  );
}
