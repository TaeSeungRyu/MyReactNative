import Header from '@/components/Header';
import useAppLifecycle from '@/hooks/use-app-lifecycle';
import { Slot, usePathname } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect, useState } from 'react';

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {

  const pathname: string = usePathname();
  const [currentPath, setCurrentPath] = useState('');
  const [isReady, setIsReady] = useState(false);
  useEffect(() => {
    console.log('페이지 이동 감지:', pathname);
    if (pathname) setCurrentPath(pathname)
  }, [pathname]);

  useEffect(() => {
    const initialize = async () => {
      try {
        // 앱 초기화 작업 테스트를 위한 강제 2초 대기!
        await new Promise((resolve) => setTimeout(resolve, 2000));
      } finally {
        setIsReady(true);
      }
    };

    initialize();
  }, []);

  useEffect(() => {
    if (isReady) {
      // 초기화 완료 후 시작 화면 종료
      SplashScreen.hideAsync();
    }
  }, [isReady]);

  /////앱 상태
  useAppLifecycle()

  return <>
    <Header pathName={currentPath}></Header>
    <Slot />
  </>;
}
