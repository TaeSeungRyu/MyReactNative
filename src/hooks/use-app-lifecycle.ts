import { useEffect, useState } from 'react';
import { AppState, Platform } from 'react-native';

type LifecycleLog = {
    id: number;
    event: string;
    time: string;
};

export default function useAppLifecycle() {
    const [appState, setAppState] = useState<string | null>(
        AppState.currentState ?? null
    );

    const [isFocused, setIsFocused] = useState(true);
    const [logs, setLogs] = useState<LifecycleLog[]>([]);

    useEffect(() => {
        const addLog = (event: string) => {
            const time = new Date().toLocaleTimeString();

            console.log(`[AppLifecycle] ${time} - ${event}`);

            setLogs((prev) => [
                {
                    id: Date.now() + Math.random(),
                    event,
                    time,
                },
                ...prev,
            ].slice(0, 20));
        };

        // 앱 활성화 / 백그라운드 감지
        const changeSubscription = AppState.addEventListener(
            'change',
            (nextState) => {
                setAppState(nextState);
                addLog(`change: ${nextState}`);

                if (nextState === 'active') {
                    console.log('앱 활성화');
                }

                if (nextState === 'background') {
                    console.log('앱 백그라운드 진입');
                }
            }
        );

        // Android 포커스 감지
        let focusSubscription: ReturnType<typeof AppState.addEventListener> | undefined;
        let blurSubscription: ReturnType<typeof AppState.addEventListener> | undefined;

        if (Platform.OS === 'android') {
            focusSubscription = AppState.addEventListener('focus', () => {
                setIsFocused(true);
                addLog('focus');
            });

            blurSubscription = AppState.addEventListener('blur', () => {
                setIsFocused(false);
                addLog('blur');
            });
        }

        return () => {
            changeSubscription.remove();
            focusSubscription?.remove();
            blurSubscription?.remove();
        };
    }, []);

    return {
        appState,
        isActive: appState === 'active',
        isFocused,
        logs,
    };
}