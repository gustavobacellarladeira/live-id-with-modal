import React from "react";
import {View, Modal, StyleSheet, Text, ActivityIndicator} from 'react-native';

export default function Loading({visible}) {
    return (
        <Modal 
        animationType="fade"
        transparent={true}
        visible={visible}
        statusBarTranslucent={true}
        >
            <View style={{flex: 1, justifyContent: "center", alignItems: "center"}}>
                <ActivityIndicator size="large" color={"blue"}></ActivityIndicator>
            </View>

        </Modal>
    );
}