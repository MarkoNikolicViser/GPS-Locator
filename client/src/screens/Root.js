import React, { useEffect } from 'react'
import { View, Text, PermissionsAndroid } from 'react-native'
import ReactNativeForegroundService from '@supersami/rn-foreground-service';
import RNLocation from 'react-native-location';

RNLocation.configure({
    distanceFilter: 0, // Meters
    desiredAccuracy: {
        ios: 'best',
        android: 'balancedPowerAccuracy',
    },
    // Android only
    androidProvider: 'auto',
    interval: 5000, // Milliseconds
    fastestInterval: 10000, // Milliseconds
    maxWaitTime: 5000, // Milliseconds
    // iOS Only
    activityType: 'other',
    allowsBackgroundLocationUpdates: false,
    headingFilter: 1, // Degrees
    headingOrientation: 'portrait',
    pausesLocationUpdatesAutomatically: false,
    showsBackgroundLocationIndicator: false,
});
let locationSubscription = null;
let locationTimeout = null;

export default function Root() {
    useEffect(() => {
        console.log('stoooooooooo')
        const Funkcija = async () => {
            const backgroundgranted = await PermissionsAndroid.request(
                PermissionsAndroid.PERMISSIONS.ACCESS_BACKGROUND_LOCATION,
                {
                    title: 'Background Location Permission',
                    message:
                        'We need access to your location ' +
                        'so you can get live quality updates.',
                    buttonNeutral: 'Ask Me Later',
                    buttonNegative: 'Cancel',
                    buttonPositive: 'OK',
                },
            );
            console.log('-----------------')
                console.log(backgroundgranted)
            console.log('-----------------')
            if (backgroundgranted === PermissionsAndroid.RESULTS.GRANTED) {
                //do your thing!
                console.log('-----perm granted-----')
              
                ReactNativeForegroundService.add_task(
                    () => {
                        RNLocation.requestPermission({
                            ios: 'whenInUse',
                            android: {
                                detail: 'fine',
                            },
                        }).then((granted) => {
                            console.log('Location Permissions: ', granted);
                            // if has permissions try to obtain location with RN location
                            if (granted) {
                                locationSubscription && locationSubscription();
                                locationSubscription = RNLocation.subscribeToLocationUpdates(
                                    ([locations]) => {
                                        locationSubscription();
                                        locationTimeout && clearTimeout(locationTimeout);
                                        console.log(locations);
                                    },
                                );
                            } else {
                                locationSubscription && locationSubscription();
                                locationTimeout && clearTimeout(locationTimeout);
                                console.log('no permissions to obtain location');
                            }
                        });
                    },
                    {
                        delay: 1000,
                        onLoop: true,
                        taskId: 'taskid',
                        onError: (e) => console.log('Error logging:', e),
                    },
                );
             }
        }
        Funkcija()
    }, [])

    return (
        <View>
            <Text>Lociran si</Text>
        </View>
    )
}