
import { useState } from 'react';
import {
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';

export default function HomeScreen() {
  // 사용자가 입력 중인 메모
  const [memo, setMemo] = useState('');

  // 저장 버튼을 눌렀을 때 표시할 메모
  const [savedMemo, setSavedMemo] = useState('');

  // 저장 버튼 이벤트
  const handleSave = () => {
    setSavedMemo(memo);
    setMemo('');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>
        나의 메모장
      </Text>

      <Text style={styles.description}>
        React Native 첫 번째 실습
      </Text>

      <TextInput
        style={styles.input}
        placeholder="메모를 입력하세요"
        value={memo}
        onChangeText={setMemo}
      />

      <Pressable
        style={styles.button}
        onPress={handleSave}
      >
        <Text style={styles.buttonText}>
          메모 저장
        </Text>
      </Pressable>

      <Text style={styles.result}>
        {savedMemo || '작성한 메모가 여기에 표시됩니다.'}
      </Text>
    </View>
  );
}

// React Native 스타일 정의
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    paddingTop: 60,
    backgroundColor: '#f5f5f5',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  description: {
    fontSize: 14,
    color: '#666',
    marginBottom: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 12,
    backgroundColor: '#fff',
    marginBottom: 15,
  },
  button: {
    backgroundColor: '#2563eb',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  result: {
    marginTop: 25,
    fontSize: 16,
  },
});
