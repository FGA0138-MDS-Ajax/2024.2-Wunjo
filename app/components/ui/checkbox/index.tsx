import { useState } from "react";
import { View, Pressable } from "react-native";
import SVGCheck from "@/assets/images/check";

export function CheckBox ({ onPress }: { onPress: (checked: boolean) => void }) {

    const [checked, setChecked] = useState(false);

    return (
        <View style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            paddingTop: 3
        }}>
            <Pressable
                onPress={() => {
                    setChecked(!checked);
                    onPress(checked);
                }}
                style={{
                    borderRadius: 4,
                    width: 14,
                    aspectRatio: 1,
                    backgroundColor: "#D9D9D9",
                    borderWidth: 1,
                    borderColor: "#9B9797"
                }}
            >
                {checked ? <SVGCheck size={10} color="black" /> : ""}
            </Pressable>
        </View>
    )
}