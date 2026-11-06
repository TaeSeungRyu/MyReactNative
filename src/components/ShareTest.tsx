import { Button, Share, View } from 'react-native';

export default function ShareTest() {

    const handleShare = async () => {
        try {
            const result = await Share.share({
                message: 'React Native 공유 테스트입니다!',
            });

            console.log('공유 결과:', result);
        } catch (error) {
            console.error('공유 오류:', error);
        }
    };

    return (
        <View style={{ padding: 20 }}>
            <Button
                title="공유하기"
                onPress={handleShare}
            />
        </View>
    );
}