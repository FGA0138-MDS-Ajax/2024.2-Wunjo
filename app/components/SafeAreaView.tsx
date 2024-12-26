import {
  SafeAreaView as NEWSafeAreaView,
  SafeAreaViewProps,
} from "react-native-safe-area-context";

interface IProps extends SafeAreaViewProps {}

export default function SafeAreaView({ children, ...props }: IProps) {
  return <NEWSafeAreaView {...props}>{children}</NEWSafeAreaView>;
}
