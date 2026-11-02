import { useEffect, useState } from 'react';
import {
    Keyboard,
    Text,
    TextInput,
    View,
} from 'react-native';

export default function KeyboardTest() {
    const [isKeyboardOpen, setIsKeyboardOpen] = useState(false);

    useEffect(() => {
        const showSubscription = Keyboard.addListener(
            'keyboardDidShow',
            () => {
                console.log('키보드 열림');
                setIsKeyboardOpen(true);
            }
        );

        const hideSubscription = Keyboard.addListener(
            'keyboardDidHide',
            () => {
                console.log('키보드 닫힘');
                setIsKeyboardOpen(false);
            }
        );

        return () => {
            showSubscription.remove();
            hideSubscription.remove();
        };
    }, []);

    return (
        <View style={{ padding: 20, gap: 20 }}>
            <Text>
                키보드 상태: {isKeyboardOpen ? '열림' : '닫힘'}
            </Text>

            <TextInput
                placeholder="여기를 눌러보세요"
                style={{
                    borderWidth: 1,
                    borderColor: '#aaa',
                    padding: 12,
                }}
            />

            <Text onPress={() => Keyboard.dismiss()}>
                키보드 닫기
            </Text>
        </View>
    );
}