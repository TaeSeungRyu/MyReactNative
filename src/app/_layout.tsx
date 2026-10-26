import Header from '@/components/Header';
import { Slot, usePathname } from 'expo-router';
import { useEffect, useState } from 'react';

//SplashScreen.preventAutoHideAsync();

export default function RootLayout() {

  const pathname: string = usePathname();
  const [currentPath, setCurrentPath] = useState('');

  useEffect(() => {
    console.log('페이지 이동 감지:', pathname);
    if (pathname) setCurrentPath(pathname)
  }, [pathname]);

  return <>
    <Header pathName={currentPath}></Header>
    <Slot />
  </>;
}
