import * as Notifications from 'expo-notifications';
import { useEffect } from 'react';
import { Alert, Button, Platform, View } from 'react-native';

// 알림이 도착했을 때 표시하도록 설정
Notifications.setNotificationHandler({
    handleNotification: async () => ({
        shouldShowBanner: true,
        shouldShowList: true,
        shouldPlaySound: true,
        shouldSetBadge: false,
    }),
});

export default function NotificationTest() {

useEffect(() => {
    const init = async () => {
        if (Platform.OS !== 'android') return;

        try {
            await Notifications.setNotificationChannelAsync('default', {
                name: '기본 알림',
                importance: Notifications.AndroidImportance.HIGH,
                vibrationPattern: [0, 250, 250, 250],
                lightColor: '#FF231F7C',
            });

            console.log('알림 채널 생성 성공');
        } catch (error) {
            console.log('알림 채널 생성 오류:', String(error));
        }
    };

    init();
}, []);

    const handleNotification = async () => {
        try {
            // 1. 현재 권한 확인
            let permission = await Notifications.getPermissionsAsync();

            // 2. 권한이 없다면 요청
            if (!permission.granted) {
                if (!permission.canAskAgain) {
                    Alert.alert('알림', '설정에서 알림 권한을 허용해 주세요.');
                    return;
                }

                permission = await Notifications.requestPermissionsAsync();
            }

            // 3. 권한 거부
            if (!permission.granted) {
                Alert.alert('알림', '알림 권한이 없습니다.');
                return;
            }

            // 4. 5초 후 로컬 알림 예약
            await Notifications.scheduleNotificationAsync({
                content: {
                    title: '새로운 게시글',
                    body: '게시글을 확인해 보세요!',
                    data: {
                        screen: '/board',
                    },
                },
                trigger: {
                    type: Notifications.SchedulableTriggerInputTypes.TIME_INTERVAL,
                    seconds: 5,
                    channelId: 'default',
                },
            });

            Alert.alert('성공', '5초 후 알림이 도착합니다.');
        } catch (error) {
            console.error(error);
            Alert.alert('오류', '알림 예약에 실패했습니다.');
        }
    };

    return (
        <View style={{ padding: 20 }}>
            <Button
                title="5초 후 알림 보내기"
                onPress={handleNotification}
            />
        </View>
    );
}