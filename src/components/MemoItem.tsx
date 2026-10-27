import { StyleSheet, Text, TextInput, View } from 'react-native';

type MemoProps = {
  id: number;
  content: string;
  isEdit: boolean;
  onChangeContent: (id: number, content: string) => void;
};

export default function MemoItem({
  id,
  content,
  isEdit,
  onChangeContent,
}: MemoProps) {
  return (
    <View style={styles.container}>
      {isEdit ? (
        <TextInput
          style={styles.input}
          placeholder="메모를 입력하세요"
          value={content}
          onChangeText={(text) => onChangeContent(id, text)}
        />
      ) : (
        <Text>{content}</Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginRight: 10,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 12,
    backgroundColor: '#fff',
  },
});