import { useRouter } from "expo-router";
import { Pressable, Text, TextInput, View } from "react-native";
import { BackHeader } from "@/components/ui/backheader";
import { Button } from "@/components/ui/button2";
import SVGPhotoIcon from "@/assets/images/PhotoIcon";
import SVGGalleryIcon from "@/assets/images/GalleryIcon";
import UserIcon from "@/assets/images/UserIcon";

export default function Screen() {

  const router = useRouter();

  return <View
    style={{
      height: "100%",
    }}
  >
    <BackHeader
      onPress={() => router.back()}
      label=""
    >
        <Button
          onPress={() => router.push("/(app)/(home)/(post)/(tag)")}
          style={{
            width: 100,
            height: 25,
            padding: 0,
            maxHeight: 25,
            marginLeft: "auto",
            marginRight: 15,
          }}
          label="Publicar"
        />
    </BackHeader>

    <View
      style={{
        // backgroundColor: "green",
        flex: 5
      }}
    >
      <View
        style={{
          flex: 1,
          flexDirection: "row",
          alignItems: 'center'
        }}
      >
        <UserIcon
          width={58}
          height={58}
          style={{
            // backgroundColor: "red",
            margin: 20,
            alignSelf: 'flex-start',
          }}
        />
        <TextInput
          className="font-raleway"
          placeholderTextColor="#969696" 
          style={{
            height: "90%",
            // backgroundColor: 'red',
            flex: 1,
            textAlignVertical: 'top',
            color: "#000"
          }}
          multiline={true}
          numberOfLines={25}
          placeholder="Digite aqui sua dúvida..."
        />
      </View>

      <View
        style={{
          borderTopWidth: 1,
          borderColor: "rgba(18,18,20, 0.1)",
          // backgroundColor: "red",
          height: 50,
          flexDirection: "row",
          alignItems: "center",
          columnGap: 20,
          paddingHorizontal: 20,
        }}
      >
        <SVGPhotoIcon/>
        <SVGGalleryIcon/>
      </View>
    </View>
  </View>
}