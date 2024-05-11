import { Linking, Platform, TouchableOpacity, View } from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import { AntDesign } from "@expo/vector-icons";
import styled from "styled-components";
import useThemeContext from "~/hooks/useThemeContext";
import Map from "~/components/Map";
import { useCallback, useLayoutEffect } from "react";

export default function MapDetails() {
    let {
        params: { eventData, itemData },
    } = useRoute<any>();
    const { theme } = useThemeContext();
    const { setOptions: setNavigationOptions } = useNavigation<any>();

    let data = eventData || itemData;

    const openDirections = useCallback(() => {
        const latitude = data[0].latitude;
        const longitude = data[0].longitude;
        const scheme = Platform.select({
            ios: "maps:0,0?q=",
            android: "geo:0,0?q=",
        });
        const label = "Location";
        const url = Platform.select({
            ios: `${scheme}${label}@${latitude},${longitude}`,
            android: `${scheme}${latitude},${longitude}(${label})`,
        });

        Linking.openURL(url!);
    }, [data]);

    const MapDetailsRightHeader = useCallback(() => {
        return (
            <TouchableOpacity onPress={openDirections}>
                <AntDesign name="enviromento" size={24} color="white" />
            </TouchableOpacity>
        )
    }, [openDirections])

    useLayoutEffect(() => {
        setNavigationOptions({
            headerRight: MapDetailsRightHeader
        })
    }, [])

    return (
        <MainContainer color={theme.colors.primary}>
            <Map
                currentLocation={{
                    latitude: data[0].latitude!,
                    longitude: data[0].longitude!,
                }}
                events={eventData}
                items={itemData}
                showInfo={true}
            />
        </MainContainer>
    );
}

// prettier-ignore
const MainContainer = styled(View) <{ color: string }>`
    height: 100%;
    background-color: ${(props) => props.color};
`;
// prettier-ignore
const HeaderContainer = styled(View)`
    width: 100%;
    height: 60px; /* TODO this should be consistent across the app */
    justify-content: space-between;
    padding: 0 20px;
    flex-direction: row;
    align-items: center
`;
