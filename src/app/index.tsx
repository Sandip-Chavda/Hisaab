import { useEffect, useState } from "react";
import { Pressable, View } from "react-native";

import { Button } from "@/shared/ui/Button";
import { Input } from "@/shared/ui/Input";
import { Screen } from "@/shared/ui/Screen";
import { Text } from "@/shared/ui/Text";

import { useMilkBookStore } from "@/modules/milk-book/store/useMilkBookStore";
import { useRouter } from "expo-router";

export default function HomeScreen() {
  const [name, setName] = useState("");

  const { milkBooks, loadMilkBooks, addMilkBook } = useMilkBookStore();

  const router = useRouter();

  useEffect(() => {
    loadMilkBooks();
  }, []);

  function handleAddMilkBook() {
    if (!name.trim()) return;

    addMilkBook(name);

    setName("");
  }

  return (
    <Screen>
      <Text className="mt-8 text-3xl font-bold">Hishaab</Text>

      <Text className="mt-1 text-gray-500">Your milk books</Text>

      <View className="mt-8 gap-3">
        <Input
          placeholder="Milk book name"
          value={name}
          onChangeText={setName}
        />

        <Button title="Create Milk Book" onPress={handleAddMilkBook} />
      </View>

      <View className="mt-10 gap-3">
        {milkBooks.map((book) => (
          <Pressable
            key={book.id}
            onPress={() => router.push(`/milk-book/${book.id}`)}
            className="rounded-2xl border border-gray-200 p-4"
          >
            <Text className="text-lg font-semibold">{book.name}</Text>
          </Pressable>
        ))}
      </View>
    </Screen>
  );
}
