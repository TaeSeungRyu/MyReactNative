import * as SecureStore from 'expo-secure-store';
import { Alert, Button, View } from 'react-native';
import api from '../services/api';

export default function RefreshTokenTest() {

    const prepare = async () => {
        await SecureStore.setItemAsync(
            'access_token',
            'expired-token'
        );

        await SecureStore.setItemAsync(
            'refresh_token',
            'valid-refresh-token'
        );

        Alert.alert('준비 완료', '만료된 토큰 저장');
    };

    const test = async () => {
        try {
            const response = await api.get('/users');

            Alert.alert(
                '조회 성공',
                JSON.stringify(response.data)
            );
        } catch {
            Alert.alert('조회 실패', '로그인이 필요합니다.');
        }
    };

    const clear = async () => {
        await SecureStore.deleteItemAsync('access_token');
        await SecureStore.deleteItemAsync('refresh_token');

        Alert.alert('토큰 삭제 완료');
    };

    return (
        <View style={{ padding: 20, gap: 10 }}>
            <Button title="1. 만료 토큰 저장" onPress={prepare} />
            <Button title="2. API 요청" onPress={test} />
            <Button title="3. 토큰 삭제" onPress={clear} />
        </View>
    );
}