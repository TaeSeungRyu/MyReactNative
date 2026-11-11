import * as SecureStore from 'expo-secure-store';
import { Alert, Button, View } from 'react-native';

const TOKEN_KEY = 'access_token';

export default function SecureStoreTest() {

    const saveToken = async () => {
        await SecureStore.setItemAsync(
            TOKEN_KEY,
            'sample-token-123'
        );

        Alert.alert('저장 완료');
    };

    const getToken = async () => {
        const token = await SecureStore.getItemAsync(TOKEN_KEY);

        Alert.alert('저장된 토큰', token ?? '없음');
    };

    const deleteToken = async () => {
        await SecureStore.deleteItemAsync(TOKEN_KEY);

        Alert.alert('삭제 완료');
    };

    return (
        <View style={{ gap: 10, padding: 20 }}>
            <Button title="토큰 저장" onPress={saveToken} />
            <Button title="토큰 조회" onPress={getToken} />
            <Button title="토큰 삭제" onPress={deleteToken} />
        </View>
    );
}