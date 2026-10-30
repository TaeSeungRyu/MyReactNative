import LoadingTest from '@/components/LoadingTest';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useEffect, useState } from 'react';

import {
    ActivityIndicator,
    Alert,
    Button,
    FlatList,
    StyleSheet,
    Text,
    TextInput,
    View,
} from 'react-native';

const STORAGE_KEY = 'board_posts';

type BoardPost = {
    id: string;
    content: string;
};

export default function HomeScreen() {
    const [content, setContent] = useState('');
    const [posts, setPosts] = useState<BoardPost[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    // 앱 화면 진입 시 저장된 게시글 불러오기
    useEffect(() => {
        loadPosts();
    }, []);

    // 게시글 불러오기
    const loadPosts = async () => {
        try {
            setIsLoading(true);

            const saved = await AsyncStorage.getItem(STORAGE_KEY);

            if (saved) {
                setPosts(JSON.parse(saved) as BoardPost[]);
            }
        } catch (error) {
            console.error('게시글 불러오기 실패:', error);
            Alert.alert('오류', '게시글을 불러오지 못했습니다.');
        } finally {
            setIsLoading(false);
        }
    };

    // 게시글 저장
    const addPost = async () => {
        if (!content.trim()) {
            Alert.alert('알림', '내용을 입력하세요.');
            return;
        }

        const newPost: BoardPost = {
            id: Date.now().toString(),
            content: content.trim(),
        };

        const updatedPosts = [newPost, ...posts];

        try {
            await AsyncStorage.setItem(
                STORAGE_KEY,
                JSON.stringify(updatedPosts)
            );

            setPosts(updatedPosts);
            setContent('');
        } catch (error) {
            console.error('게시글 저장 실패:', error);
            Alert.alert('오류', '게시글 저장에 실패했습니다.');
        }
    };

    // 전체 게시글 삭제
    const clearPosts = async () => {
        try {
            await AsyncStorage.removeItem(STORAGE_KEY);
            setPosts([]);
        } catch (error) {
            console.error('게시글 삭제 실패:', error);
            Alert.alert('오류', '게시글 삭제에 실패했습니다.');
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Board</Text>

            <TextInput
                style={styles.input}
                placeholder="게시글 내용을 입력하세요"
                value={content}
                onChangeText={setContent}
            />

            <Button
                title="게시글 저장"
                onPress={addPost}
                disabled={isLoading}
            />

            <View style={styles.buttonArea}>
                <Button
                    title="전체 삭제"
                    onPress={clearPosts}
                    disabled={isLoading}
                />
            </View>

            {isLoading ? (
                <ActivityIndicator size="large" />
            ) : (
                <FlatList
                    data={posts}
                    keyExtractor={(item) => item.id}
                    renderItem={({ item }) => (
                        <View style={styles.post}>
                            <Text>{item.content}</Text>
                        </View>
                    )}
                    ListEmptyComponent={
                        <Text>등록된 게시글이 없습니다.</Text>
                    }
                />
            )}

            <LoadingTest />
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
        backgroundColor: '#fff',
        padding: 12,
        marginBottom: 10,
        borderRadius: 8,
    },
    buttonArea: {
        marginVertical: 10,
    },
    post: {
        padding: 15,
        backgroundColor: '#fff',
        borderRadius: 8,
        marginBottom: 10,
    },
});