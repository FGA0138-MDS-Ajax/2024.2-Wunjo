import {
  Pressable,
  View,
  Text,
  StyleSheet,
  StyleProp,
  ViewStyle,
} from 'react-native';
import { ButtonSpinner } from '../button';

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
  outline: {
    height: '100%',
    width: '100%',
    borderRadius: 22.5,
    maxHeight: 50,
    borderWidth: 2,
    borderColor: '#173CAC'
  },
});

const colors = {
    blue: {
        primary: "#0F2D89",
        secondary: "#173CAC"
    },
    black: {
        primary: "#1A1A2D",
        secondary: "#000000"
    },
    white: '#F2F2F2'
}

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
  variant?: 'wide' | 'circle' | 'outline';
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
      {
      variant !== 'outline' && <View
          style={{
            ...defaultStyle[variant],
            backgroundColor: '#0F2D89',
            position: 'absolute',
            bottom: -4,
          }}
        />
      }
      <View
        style={{
          ...defaultStyle[variant],
          backgroundColor: variant === 'outline' ? colors.white : colors.blue.secondary,
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
              color: variant === 'outline' ? colors.blue.secondary : colors.white,
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
