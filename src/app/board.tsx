
import {
    StyleSheet,
    Text,
    View
} from 'react-native';

export default function HomeScreen() {

    return (
        <View style={styles.container}>
            <Text>board...</Text>
        </View>
    );
}



const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        paddingTop: 60,
        backgroundColor: '#f5f5f5',
    }
});
