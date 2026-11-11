import ImagePickerTest from '@/components/ImagePickerTest';
import SecureStoreTest from '@/components/SecureStoreTest';
import { Text, View } from 'react-native';

export default function DeepLinkScreen() {
    return (
        <View style={{ padding: 20 }}>
            <Text>딥링크로 화면에 도착했습니다!</Text>
             <ImagePickerTest />
             <SecureStoreTest/>
        </View>
    );
}