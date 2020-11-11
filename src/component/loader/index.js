import React, { useContext } from 'react'
import {
    ActivityIndicator,
    Text,
    StyleSheet,
    Dimensions,
    Platform,
    View,
} from 'react-native'
import { color } from "../../utility";
import { Store } from "../../context/store";

const { height, width } = Dimensions.get("window");

const Loader = () => {
    // const globalState = useContext(Store);
    // const { mapLoaderState } = globalState;
    // const { loading } = mapLoaderState;
    let loading= true;
    return loading ? (
        <View style={styles.loaderContainer}>
            <View style={styles.indicator}>
                <ActivityIndicator
                    size="large"
                    animating={loading}
                    color={color.WHITE}
                    style={{
                        left: Platform.OS === 'ios' ? 1.3 : 0,
                        right: Platform.OS === 'ios' ? 1 : 0,
                    }} x />
            </View>
        </View>
    ) : null;
};

const styles = StyleSheet.create({
    loaderContainer: {
        zIndex: 1,
        elevation: 2,
        height,
        width,
        position: 'absolute',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: color.SEMI_TRANSPARENT,
    },
    indicator: {
        backgroundColor: color.DARK_GRAY,
        height: 44,
        width: 44,
        borderRadius: 22,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        alignContent: 'center',
    },
});
export default Loader;
