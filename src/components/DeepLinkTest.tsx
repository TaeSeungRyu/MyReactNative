import Constants, { ExecutionEnvironment } from 'expo-constants';
import { Button, Linking, View } from 'react-native';

export default function DeepLinkTest() {

    const openBoard = async () => {
        let url: string;

        // Expo Go 환경
        if (
            Constants.executionEnvironment ===
            ExecutionEnvironment.StoreClient
        ) {
            const hostUri = Constants.expoConfig?.hostUri;
            if (!hostUri) {
                console.log('Expo 서버 주소가 없습니다.');
                return;
            }
            url = `exp://${hostUri}/--/board`;
        }
        // Development Build 또는 배포 앱
        else {
            url = 'myapp://board';
        }
        console.log('실행 URL:', url);
        await Linking.openURL(url);
    };
    return (
        <View style={{ padding: 20 }}>
            <Button
                title="딥링크로 deepLink 열기"
                onPress={openBoard}
            />
        </View>
    );
}