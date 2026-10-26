import { usePathname, useRouter } from 'expo-router';
import { Pressable, StyleSheet, Text, View } from 'react-native';

type HeaderProps = {
    pathName: string;
};

export default function Header({ pathName }: HeaderProps) {
    const router = useRouter();
    const pathname = usePathname();

    // 화면 이동
    const movePage = (path: '/' | '/board') => {
        router.navigate(path);
    };

    return (
        <>
            <View>
                <Text>여긴 누구 : {pathName}</Text>
            </View>
            <View style={styles.container}>
                <Pressable
                    onPress={() => movePage('/')}
                    style={[
                        styles.menu,
                        pathname === '/' && styles.activeMenu,
                    ]}
                >
                    <Text style={styles.text}>Home</Text>
                </Pressable>
                <Pressable
                    onPress={() => movePage('/board')}
                    style={[
                        styles.menu,
                        pathname === '/board' && styles.activeMenu,
                    ]}
                >
                    <Text style={styles.text}>Board</Text>
                </Pressable>
            </View>
        </>
    );
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        backgroundColor: '#fff',
        padding: 15,
        justifyContent: 'center',
        gap: 20,
        borderBottomWidth: 1,
        borderBottomColor: '#ddd',
    },
    menu: {
        paddingHorizontal: 20,
        paddingVertical: 10,
        borderRadius: 8,
    },
    activeMenu: {
        backgroundColor: '#2563eb',
    },
    text: {
        fontSize: 16,
        fontWeight: 'bold',
    },
});