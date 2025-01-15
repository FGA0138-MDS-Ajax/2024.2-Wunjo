import { Platform } from "react-native";

export function mapFonts(style: any) {
  const fontWeights: any = {
    "100": "Thin",
    "200": "ExtraLight",
    "300": "Light",
    "400": "Regular",
    "500": "Medium",
    "600": "SemiBold",
    "700": "Bold",
    "800": "ExtraBold",
    "900": "Black",
    "950": "ExtraBlack",
  };
  const regex = /^([^_]*_){1,2}[^_]*$/;

  // Check if the fontFamily matches the regex pattern
  if (style.fontFamily.match(regex)) {
    delete style.fontWeight;
    delete style.fontStyle;
    return;
  }

  let fontFamilyValue = style.fontFamily
    .replace(/ /g, "")
    .replace(/^\w/, (c: any) => c.toUpperCase());
  const originalFontFamily = fontFamilyValue;

  const getFontWeight = (weight: any) => {
    if (typeof weight === "string" && !isNaN(Number(weight))) {
      return fontWeights[weight];
    }
    if (typeof weight === "number") {
      return fontWeights[weight];
    }
    return weight;
  };

  if (Platform.OS === "ios") {
    let currentFontWeight = getFontWeight(style.fontWeight) || "Regular";
    fontFamilyValue += `-${currentFontWeight}`;

    // Append the fontStyle to the fontFamilyValue
    if (style.fontStyle && style.fontStyle !== "normal") {
      const fontStyle = style.fontStyle.replace(/^\w/, (c: any) =>
        c.toUpperCase()
      );
      fontFamilyValue +=
        currentFontWeight === "Regular" ? `-${fontStyle}` : fontStyle;
    }
  } else {
    if (style.fontWeight) {
      const fontWeightString = getFontWeight(style.fontWeight);
      fontFamilyValue += `_${style.fontWeight}${fontWeightString}`;
    } else {
      fontFamilyValue += "_400Regular";
    }

    // Append the fontStyle to the fontFamilyValue
    if (style.fontStyle && style.fontStyle !== "normal") {
      const fontStyle = style.fontStyle.replace(/^\w/, (c: any) =>
        c.toUpperCase()
      );
      fontFamilyValue += `_${fontStyle}`;
    }
  }

  // Update the style's fontFamily property
  style.fontFamily = fontFamilyValue;
  delete style.fontWeight;
  delete style.fontStyle;
}
