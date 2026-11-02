import { useEffect } from 'react';
import {
    Alert,
    BackHandler,
    Text,
    View,
} from 'react-native';

export default function BackHandlerTest() {

    useEffect(() => {
        const subscription = BackHandler.addEventListener(
            'hardwareBackPress',
            () => {
                Alert.alert(
                    '종료 확인',
                    '앱을 종료하시겠습니까?',
                    [
                        { text: '취소', style: 'cancel' },
                        {
                            text: '종료',
                            onPress: () => BackHandler.exitApp(),
                        },
                    ]
                );

                return true;
            }
        );

        return () => subscription.remove();
    }, []);

    return (
        <View style={{ padding: 20 }}>
            <Text>Android 뒤로 가기 버튼을 눌러보세요.</Text>
        </View>
    );
}