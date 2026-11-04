import { useCameraPermissions } from 'expo-camera';
import { Alert, Button, Linking, Text, View } from 'react-native';

export default function PermissionTest() {
    const [permission, requestPermission] = useCameraPermissions();

    const handleRequest = async () => {
        // 1. 현재 권한 상태 확인
        if (!permission) {
            Alert.alert('알림', '권한 상태를 확인 중입니다.');
            return;
        }

        // 2. 이미 권한이 있는 경우
        if (permission.granted) {
            Alert.alert('알림', '이미 카메라 권한이 허용되어 있습니다.');
            return;
        }

        // 3. 권한이 없고 다시 요청할 수 없는 경우
        if (!permission.canAskAgain) {
            Alert.alert(
                '권한 필요',
                '카메라 권한이 차단되어 있습니다. 설정에서 허용해 주세요.',
                [
                    { text: '취소', style: 'cancel' },
                    {
                        text: '설정 열기',
                        onPress: () => {
                            Linking.openSettings().catch(console.error);
                        },
                    },
                ]
            );
            return;
        }

        // 4. 권한이 없는 경우 사용자에게 요청
        const result = await requestPermission();

        if (result.granted) {
            Alert.alert('성공', '카메라 권한이 허용되었습니다.');
        } else {
            Alert.alert('거부', '카메라 권한이 허용되지 않았습니다.');
        }
    };

    return (
        <View style={{ padding: 20, gap: 15 }}>
            <Text style={{ fontSize: 20 }}>
                카메라 권한 테스트
            </Text>

            <Text>
                현재 권한: {permission?.status ?? '확인 중'}
            </Text>

            <Text>
                권한 허용: {permission?.granted ? 'YES' : 'NO'}
            </Text>

            <Button
                title="카메라 권한 확인 및 요청"
                onPress={handleRequest}
                disabled={!permission}
            />
        </View>
    );
}