import Constants from 'expo-constants';
import * as ExpoLinking from 'expo-linking';
import { Button, View } from 'react-native';

export default function DeepLinkTest() {

    const openLink = async () => {
        let url: string;

        if (__DEV__) {
            // 개발 환경 (npm run start)
            const hostUri = Constants.expoConfig?.hostUri;

            if (!hostUri) {
                console.log('Expo 개발 서버 주소가 없습니다.');
                return;
            }

            url = `exp://${hostUri}/--/deepLink`;
        } else {
            // 배포 환경
            url = ExpoLinking.createURL('/deepLink');
        }

        console.log('실행 환경:', __DEV__ ? '개발' : '배포');
        console.log('딥링크 URL:', url);

        try {
            await ExpoLinking.openURL(url);
        } catch (error) {
            console.error('딥링크 실행 실패:', error);
        }
    };

    return (
        <View style={{ padding: 20 }}>
            <Button
                title="딥링크로 deepLink 열기"
                onPress={openLink}
            />
        </View>
    );
}