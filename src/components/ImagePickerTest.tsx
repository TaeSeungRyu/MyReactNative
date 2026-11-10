import * as ImagePicker from 'expo-image-picker';
import { useState } from 'react';
import { Alert, Button, Image, View } from 'react-native';

export default function ImagePickerTest() {
    const [imageUri, setImageUri] = useState<string | null>(null);

    const pickImage = async () => {
        // 1. 갤러리 열기
        const result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ['images'],
            allowsEditing: true,
            quality: 0.8,
        });

        // 2. 사용자가 사진을 선택했는지 확인
        if (result.canceled) {
            console.log('사진 선택 취소');
            return;
        }

        // 3. 선택한 사진 URI 저장
        const uri = result.assets[0]?.uri;

        if (!uri) {
            Alert.alert('오류', '사진 정보를 가져오지 못했습니다.');
            return;
        }

        setImageUri(uri);
        console.log('선택한 사진:', uri);
    };

    return (
        <View style={{ padding: 20, gap: 20 }}>
            <Button
                title="갤러리에서 사진 선택"
                onPress={pickImage}
            />

            {imageUri && (
                <Image
                    source={{ uri: imageUri }}
                    style={{
                        width: 250,
                        height: 250,
                        borderRadius: 10,
                    }}
                />
            )}
        </View>
    );
}