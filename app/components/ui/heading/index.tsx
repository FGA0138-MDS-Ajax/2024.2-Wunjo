import { Text } from "../text";

interface HeadingProps {
  children: React.ReactNode;
  className?: string;
  size?: "5xl" | "4xl" | "3xl" | "2xl" | "xl" | "lg" | "md" | "sm" | "xs";
}

export const Heading = ({
  children,
  className,
  size,
  ...props
}: HeadingProps) => {
  const sizes = {
    "5xl": "text-6xl",
    "4xl": "text-5xl",
    "3xl": "text-4xl",
    "2xl": "text-3xl",
    xl: "text-2xl",
    lg: "text-xl",
    md: "text-lg",
    sm: "text-base",
    xs: "text-sm",
  };

  return (
    <Text
      className={`text-typography-900 font-itim ${
        sizes[size as keyof typeof sizes]
      }  ${className}`}
      {...props}
    >
      {children}
    </Text>
  );
};
