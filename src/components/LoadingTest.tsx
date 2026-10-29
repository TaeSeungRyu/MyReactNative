import { useState } from 'react';
import {
    ActivityIndicator,
    Pressable,
    StyleSheet,
    Text,
    View
} from 'react-native';

export default function LoadingTest() {
    const [isLoading, setIsLoading] = useState(false);

    const handleLoading = async () => {
        setIsLoading(true);

        // 서버 응답을 기다리는 상황을 가정
        await new Promise<void>((resolve) => {
            setTimeout(resolve, 2000);
        });

        setIsLoading(false);
    };

    return (
        <View style={styles.container}>
            <Pressable
                onPress={handleLoading}

            >
                <Text >데이터 불러오기</Text>
            </Pressable>
            {isLoading && (
                <ActivityIndicator
                    size="large"
                    color="#007AFF"
                    style={{ marginTop: 20 }}
                />
            )}
            {!isLoading && (
                <Text style={{ marginTop: 20 }}>
                    로딩이 완료되었습니다.
                </Text>
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
});