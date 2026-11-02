import NetInfo from '@react-native-community/netinfo';
import { useEffect, useState } from 'react';
import { Button, Text, View } from 'react-native';

//인터넷 연결 확인용
export default function NetInfoTest() {
    const [isConnected, setIsConnected] = useState<boolean | null>(null);
    const [isInternetReachable, setIsInternetReachable] = useState<boolean | null>(null);
    const [connectionType, setConnectionType] = useState<string>('unknown');

    useEffect(() => {
        // 네트워크 상태 변경 감지
        const unsubscribe = NetInfo.addEventListener((state) => {
            console.log('네트워크 상태:', state);

            setIsConnected(state.isConnected);
            setIsInternetReachable(state.isInternetReachable);
            setConnectionType(state.type);
        });

        return () => unsubscribe();
    }, []);

    // 현재 네트워크 상태 직접 조회
    const checkNetwork = async () => {
        const state = await NetInfo.fetch();

        console.log('현재 네트워크:', state);
    };

    const displayStatus = (value: boolean | null) =>
        value === null ? '확인 중' : value ? '연결됨' : '연결 안 됨';

    return (
        <View style={{ padding: 20, gap: 15 }}>
            <Text style={{ fontSize: 22, fontWeight: 'bold' }}>
                NetInfo 테스트
            </Text>

            <Text>네트워크 연결: {displayStatus(isConnected)}</Text>

            <Text>
                인터넷 접근: {displayStatus(isInternetReachable)}
            </Text>

            <Text>연결 유형: {connectionType}</Text>

            <Button
                title="현재 네트워크 확인"
                onPress={checkNetwork}
            />
        </View>
    );
}