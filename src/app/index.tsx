import { Screen } from "@/shared/ui/Screen";
import { Text } from "@/shared/ui/Text";

export default function HomeScreen() {
  return (
    <Screen>
      <Text className="text-3xl font-bold text-red-600">Hishaab</Text>

      <Text className="mt-2 text-base text-gray-500">
        Personal Milk Billing Tracker
      </Text>
    </Screen>
  );
}
