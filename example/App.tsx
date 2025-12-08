import React from "react";
import { Button, Text, View } from "react-native";
import AgeVerification from "expo-age-verification";
// or: import AgeVerification, { getPlayAgeSignals } from 'expo-age-verification';

export default function App() {
  const [result, setResult] = React.useState<string | null>(null);
  const [error, setError] = React.useState<string | null>(null);

  const onRequestPlayAgeSignals = async () => {
    setResult(null);
    setError(null);

    try {
      console.log("AgeVerification module:", AgeVerification);
      const res = await AgeVerification.getPlayAgeSignals();
      console.log("getPlayAgeSignals result:", res);
      setResult(JSON.stringify(res, null, 2));
    } catch (e: any) {
      console.error("getPlayAgeSignals error:", e);
      setError(e?.message ?? String(e));
    }
  };

  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Button
        title="Request Play Age Signals"
        onPress={onRequestPlayAgeSignals}
      />
      {result && <Text>Result: {result}</Text>}
      {error && <Text style={{ color: "red" }}>Error: {error}</Text>}
    </View>
  );
}
