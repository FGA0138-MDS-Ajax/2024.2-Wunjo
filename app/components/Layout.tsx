import { View, ViewProps } from "react-native";

interface IProps extends ViewProps {}

export default function Layout({ children, ...props }: IProps) {
  return (
    <View style={{ paddingHorizontal: 20 }} {...props}>
      {children}
    </View>
  );
}
