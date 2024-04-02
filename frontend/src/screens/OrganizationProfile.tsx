import { useEffect, useState } from 'react';
import { StyleSheet, ScrollView, View, TouchableOpacity, Image, Dimensions } from 'react-native';
import { Text } from 'react-native-paper';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import useAuthContext from '~/hooks/useAuthContext';
import useProfileContext from '~/hooks/useProfileContext';
import useThemeContext from '~/hooks/useThemeContext';
import { MaterialIcons, Ionicons } from "@expo/vector-icons";
import { generateImageURL } from '~/lib/CDNFunctions';
import { useRoute } from '@react-navigation/native';
import ProfileTabs from '~/navigation/LandingGroup/BottomTabsGroup/ProfileGroup/ProfileTabs';

type HeaderProps = {
    name: string,
    uri?: string
}
const Header = ({ uri, name }: HeaderProps) => {
    const { theme } = useThemeContext();

    return (
        <View style={styles.headerCard}>
            <View style={styles.upperSection}>
                <TouchableOpacity style={{
                    shadowColor: "grey",
                    shadowOffset: { width: 0, height: 2 },
                    shadowOpacity: 0.2,
                    shadowRadius: 2,
                }}>
                   <View 
                        style={[
                            styles.profilePicContainer,
                            { backgroundColor: theme.colors.profilePicContainer },
                        ]}
                    >
                        {uri ?
                            <Image 
                                style={{ width: "100%", height: "100%" }}
                                source={{ uri }}
                            />
                            :<MaterialIcons name="person" size={50} color="grey" />
                        }
                   </View>
                </TouchableOpacity>
                <View style={styles.miniInfoContainer}>
                    <Text style={styles.profileInfoItem}>5</Text>
                    <Text style={styles.profileInfoItem}>Following</Text>
                </View>
                <TouchableOpacity style={styles.miniInfoContainer}>
                    <Ionicons name="menu-outline" size={40} color={theme.colors.text} />
                </TouchableOpacity>
            </View>
            <View style={styles.lowerSection}>
                <Text style={{ fontWeight: "bold", fontSize: 20 }}>
                    {name}
                </Text>
            </View>
        </View>
    );
}


export default function OrganizationProfile() {
    const { params: { id, name, image } } = useRoute<any>();

    return (
        <ScrollView>
            <Header name={name} uri={image} />
            <View style={{ minHeight: Dimensions.get("window").height * 0.8, backgroundColor: 'red' }}>
            </View>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    headerCard: {
        paddingTop: 20,
        paddingHorizontal: 20,
        height: Dimensions.get("window").height * 0.2
    },
    upperSection: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
    },
    profilePicContainer: {
        width: 84,
        height: 84,
        borderRadius: 50,
        backgroundColor: "#FFF",
        justifyContent: "center",
        alignItems: "center",
        overflow: "hidden",
    },
    miniInfoContainer: {
        alignItems: "center",
    },
    profileInfoItem: {
        fontSize: 16,
        fontWeight: "bold",
    },
    lowerSection: {
        marginTop: 10,
      },
});