import * as Battery from 'expo-battery';
import { useEffect, useState } from 'react';
import { Text, View } from 'react-native';

export default function BatteryTest() {
    const [level, setLevel] = useState<number | null>(null);
    const [batteryState, setBatteryState] = useState<string>('확인 중');

    useEffect(() => {
        // 최초 배터리 상태 조회
        const loadBattery = async () => {
            const currentLevel = await Battery.getBatteryLevelAsync();
            const currentState = await Battery.getBatteryStateAsync();

            setLevel(currentLevel);
            setBatteryState(Battery.BatteryState[currentState]);
        };

        loadBattery().catch(console.error);

        // 배터리 잔량 변경 감지
        const levelSubscription =
            Battery.addBatteryLevelListener(({ batteryLevel }) => {
                setLevel(batteryLevel);
            });

        // 충전 상태 변경 감지
        const stateSubscription =
            Battery.addBatteryStateListener(({ batteryState }) => {
                setBatteryState(Battery.BatteryState[batteryState]);
            });

        return () => {
            levelSubscription.remove();
            stateSubscription.remove();
        };
    }, []);

    return (
        <View style={{ padding: 20, gap: 15 }}>
            <Text style={{ fontSize: 22, fontWeight: 'bold' }}>
                배터리 상태 테스트
            </Text>

            <Text>
                배터리 잔량: {
                    level === null || level < 0
                        ? '확인 불가'
                        : `${Math.round(level * 100)}%`
                }
            </Text>

            <Text>충전 상태: {batteryState}</Text>
        </View>
    );
}