import messaging from "@react-native-firebase/messaging";
import { useEffect, useState } from "react";
import { Platform, PermissionsAndroid } from "react-native";
export const PushNotification = () => {
    useEffect(() => {
        const NotificationPermission = () => {
            console.log("nema")

            const checkApplicationPermission = async () => {
                if (Platform.OS === 'android') {
                    try {
                        await PermissionsAndroid.request(
                            PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS,
                        );
                    } catch (error) {
                    }
                }
            };
            checkApplicationPermission()

        }

        NotificationPermission();
    }, [])
    const getUserPermission = async () => {
        const authStatus = await messaging().requestPermission();
        const enabled =
            authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
            authStatus === messaging.AuthorizationStatus.PROVISIONAL;
    }
    messaging().subscribeToTopic("Blog")
    const getToken = async () => {
        const token = await messaging().getToken();
    }
    messaging().setBackgroundMessageHandler(async remoteMessage => {
        console.log('Message handled in the background!', remoteMessage);
    });
    useEffect(() => {
        getUserPermission();
        getToken()
    }, [])

} 