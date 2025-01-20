import {
  Pressable,
  View,
  Text,
  StyleSheet,
  StyleProp,
  ViewStyle,
} from 'react-native';
import { ButtonSpinner } from '../button';
import { Colors } from '@/constants/Colors';
import colors from 'tailwindcss/colors';

const defaultStyle = StyleSheet.create({
  wide: {
    height: '100%',
    width: '100%',
    borderRadius: 22.5,
    maxHeight: 50,
  },
  circle: {
    height: 75,
    width: 75,
    borderRadius: 75,
    maxHeight: 75,
  },
});

export function Button({
  label,
  children,
  onPress,
  variant = 'wide',
  style,
  isLoading,
}: {
  label?: string;
  children?: React.ReactNode;
  onPress: () => void;
  variant?: 'wide' | 'circle';
  style?: StyleProp<ViewStyle>;
  isLoading?: boolean;
}) {
  return (
    <Pressable
      onPress={onPress}
      style={[
        {
          width: defaultStyle[variant].width,
        },
        style,
        {
          position: 'relative',
          height: defaultStyle[variant].maxHeight,
        },
      ]}
    >
      <View
        style={{
          ...defaultStyle[variant],
          backgroundColor: '#0F2D89',
          position: 'absolute',
          bottom: -4,
        }}
      />
      <View
        style={{
          ...defaultStyle[variant],
          backgroundColor: '#173CAC',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        {isLoading && <ButtonSpinner color={colors.white} />}
        {!isLoading && label && (
          <Text
            className="font-raleway-bold"
            style={{
              color: 'white',
              fontSize: 15,
            }}
          >
            {label}
          </Text>
        )}
        {children}
      </View>
    </Pressable>
  );
}
