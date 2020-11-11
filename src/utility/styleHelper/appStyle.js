import { Dimensions } from "react-native";
import * as color from "../colors"
import { smallDeviceHeight } from "../constants";

export const {
    height: deviceHeight,
    width: deviceWidth
} = Dimensions.get("window");

const getFieldDimensions = () => {
    if (deviceHeight > smallDeviceHeight) {
        return {
            fieldHeight: 50,
            fieldMarginVertical: 50,
            btnMarginVertical: 20,
            btnBorderRadius: 10,
            btnHeight: 50,
        };
    } else {
        return {
            fieldHeight: 40,
            fieldMarginVertical: 8,
            btnMarginVertical: 16,
            btnBorderRadius: 8,
            btnHeight: 40,
        };
    }
};

export const fieldBgColor = color.DARK_GRAY;
export const feildTextColor = color.WHITE;
export const logoBgColor = color.DARK_GRAY;
export const feildHeight = getFieldDimensions().feildHeight;
export const fieldMarginVertical = getFieldDimensions().fieldMarginVertical;
export const btnMarginVertical = getFieldDimensions().btnMarginVertical;
export const btnBorderRadius = getFieldDimensions().btnBorderRadius;
export const btnHeight = getFieldDimensions().btnHeight;
