import { Alert, Button, View } from 'react-native';
import api from '../services/api';

export default function ApiTest() {

    const getUsers = async () => {
        try {
            const response = await api.get('/users');

            console.log('사용자 목록:', response.data);
            Alert.alert('성공', `${response.data.length}명 조회`);
        } catch (error) {
            Alert.alert('오류', '사용자 조회 실패');
        }
    };

    return (
        <View style={{ padding: 20 }}>
            <Button
                title="사용자 목록 조회"
                onPress={getUsers}
            />
        </View>
    );
}