
import { Button } from 'expo-router/build/react-navigation';
import { useEffect, useState } from 'react';
import {
  FlatList,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';

// 메모 데이터 타입 정의
type Memo = {
  id: number;
  content: string;
};

export default function HomeScreen() {
  // 입력 중인 메모
  const [memo, setMemo] = useState('');

  // 메모 목록
  const [memos, setMemos] = useState<Memo[]>([
    { id: 1, content: 'React Native 공부하기' },
    { id: 2, content: 'FlatList 이해하기' },
    { id: 3, content: '메모 앱 만들기' },
  ]);

  // 메모 추가
  const handleSave = () => {
    if (memo.trim() === '') return;

    const newMemo: Memo = {
      id: Date.now(),
      content: memo.trim(),
    };

    // 기존 목록에 새 메모 추가
    setMemos((prev) => [newMemo, ...prev]);

    // 입력창 초기화
    setMemo('');
  };

  useEffect(()=>{
    console.log(memos); //나중에 뭐 콜백 이벤트..
  }, [memos])

  const runConfirm =(item : Memo)=>{
    console.log(item)
    if(!confirm('삭제할꺼야?')) return;
    const id = item.id;
    setMemos((prev) => prev.filter((arg) => arg.id !== id));

  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>나의 메모장</Text>

      <TextInput
        style={styles.input}
        placeholder="메모를 입력하세요"
        value={memo}
        onChangeText={setMemo}
      />

      <Pressable style={styles.button} onPress={handleSave}>
        <Text style={styles.buttonText}>메모 추가</Text>
      </Pressable>

      <Text style={styles.count}>
        전체 메모: {memos.length}개
      </Text>

      {/* 리엑트의 map 처럼 데이터 배열 표현 FlatList */}
      <FlatList
        data={memos}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.memoItem}>
            <Text>{item.content}</Text>
            <Button onPress={() => runConfirm(item)}>x</Button>
            <Pressable
              onPress={() => runConfirm(item)}
              style={{
                backgroundColor: '#ef4444',
                padding: 10,
                borderRadius: 8,
              }}
            >
              <Text style={{ color: '#fff' }}>삭제</Text>
            </Pressable>            
          </View>
        )}
        ListEmptyComponent={
          <Text>등록된 메모가 없습니다.</Text>
        }
      />
    </View>
  );
}

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
    fontWeight: 'bold',
  },
  count: {
    marginTop: 20,
    marginBottom: 10,
    fontSize: 14,
    color: '#666',
  },
  memoItem: {
    padding: 15,
    backgroundColor: '#fff',
    borderRadius: 8,
    marginBottom: 10,
    display: 'flex',
    justifyContent : 'space-between',
    flexDirection : 'row',
    alignItems : 'center'
  },
});
