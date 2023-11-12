import {View} from "react-native";
import {ThemedText} from "~/components/ThemedComponents";
import React from "react";

export default function NotificationSettings() {
    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <ThemedText>Notification Settings</ThemedText>
        </View>
    )
}