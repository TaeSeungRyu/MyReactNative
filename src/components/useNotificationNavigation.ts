import * as Notifications from 'expo-notifications';
import { useRouter } from 'expo-router';
import { useEffect } from 'react';

export default function useNotificationNavigation() {
    const router = useRouter();

    useEffect(() => {
        //addNotificationResponseReceivedListener : 알림을 탭 하는 이벤트 수신
        const subscription =
            Notifications.addNotificationResponseReceivedListener(
                (response) => {
                    const data =
                        response.notification.request?.content?.data;

                    console.log('알림 클릭:', data);

                    if (data?.screen === '/board') {
                        router.push('/board');
                    }
                }
            );

        return () => subscription.remove();
    }, [router]);
}