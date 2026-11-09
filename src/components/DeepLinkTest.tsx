import Constants from 'expo-constants';
import { Button, Linking, View } from 'react-native';

export default function DeepLinkTest() {
    const openBoard = async () => {
        const baseUrl = Constants.expoConfig?.hostUri;

        if (!baseUrl) {
            console.log('Expo 개발 서버 주소를 찾을 수 없습니다.');
            return;
        }

        const url = `exp://${baseUrl}/--/deepLink`;

        console.log('딥링크:', url);

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