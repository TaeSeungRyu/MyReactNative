import { Button, Vibration, View } from 'react-native';

export default function VibrationTest() {
    return (
        <View style={{ padding: 20 }}>
            <Button
                title="진동 테스트"
                onPress={() => Vibration.vibrate(500)}
            />
        </View>
    );
}