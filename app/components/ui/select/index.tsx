import { View, Text, Pressable, Modal, TextInput, Keyboard } from "react-native";
import GestureRecognizer from 'react-native-swipe-gestures';
import { Input } from "../input2";

export function Select ({
    label,
    placeholder,
    value,
    modalVisible,
    setModalVisible,
    children
}: {
    label: string,
    placeholder: string,
    value?: string,
    modalVisible: boolean,
    setModalVisible: (value: boolean) => void,
    children?: React.ReactNode
}) {

    return <View style={{
        display: "flex",
        flexDirection: "row",
        rowGap: 2,
    }}>
        <Input
            showSoftInputOnFocus={false}
            onPress={() => {
                setModalVisible(true);
                Keyboard.dismiss();
            }}
            label={label}
            placeholder={placeholder}
            value={value}
        />
        <GestureRecognizer
                onSwipeDown={() => setModalVisible(false)}
            >
                <Modal
                    visible={modalVisible}
                    onRequestClose={() => setModalVisible(false)}
                    animationType="slide"
                    transparent
                    style={{
                        height: "100%",
                        borderRadius: 0,
                    }}
                >
                    <Pressable
                        style={{
                            flex: 1.75,
                            backgroundColor: "rgba(0, 0, 0, 0.05)"
                        }}
                        onPress={() => setModalVisible(false)}
                    ></Pressable>
                    <View
                        style={{
                            flex: 1,
                            backgroundColor: "#FFFFFF",
                            borderTopLeftRadius: 20,
                            borderTopRightRadius: 20,
                        }}
                    >
                        <View
                            style={{
                                height: 20,
                                display: "flex",
                                justifyContent: "center",
                                alignItems: "center",
                            }}
                        >
                            <View
                                style={{
                                    height: 3,
                                    width: "50%",
                                    backgroundColor: "#E1E1E6",
                                    borderRadius: 2,
                                }}
                            >

                            </View>
                        </View>
                        <View>
                            {children}
                        </View>
                    </View>
                </Modal>
        </GestureRecognizer>
    </View>
}