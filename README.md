# React Native Memo Practice

React Native와 Expo를 활용하여 모바일 앱 개발을 학습하기 위한 개인 스터디 프로젝트입니다.

간단한 메모 앱을 직접 구현하면서 React Native의 기본 UI 구성, 상태 관리, HTTP API 통신을 단계적으로 학습합니다.

## 1. 개발 환경

| 구분 | 기술 |
|---|---|
| OS | Windows 11 |
| Framework | React Native |
| Development Tool | Expo |
| Language | TypeScript |
| Editor | Visual Studio Code |
| Node.js | 24.x |
| Package Manager | npm |
| HTTP Client | Fetch API |
| Test Device | Android (Expo Go) |

## 2. 주요 기능

간단한 메모 앱의 CRUD 기능을 구현합니다.

- 메모 목록 조회
- 메모 작성
- 메모 수정
- 메모 삭제
- HTTP API 서버 연동
- 로딩 및 오류 처리

## 3. 프로젝트 실행

### 패키지 설치

```bash
npm install
```

### 개발 서버 실행

```bash
npm start
```

또는

```bash
npx expo start
```

### Android 실행

1. Android 스마트폰에 Expo Go 앱을 설치합니다.
2. PC와 스마트폰을 동일한 Wi-Fi에 연결합니다.
3. 개발 서버 실행 후 터미널에 표시된 QR 코드를 확인합니다.
4. Expo Go에서 QR 코드를 스캔하여 앱을 실행합니다.

서로 다른 네트워크를 사용하는 경우 터널 모드로 실행할 수 있습니다.

```bash
npx expo start --tunnel
```

## 4. 스터디 계획

| 단계 | 학습 내용 | 상태 |
|---|---|---|
| 1 | Expo 개발 환경 구성 및 Android 실행 | 진행 중 |
| 2 | 기본 UI 컴포넌트 학습 | 예정 |
| 3 | 메모 목록 화면 구현 | 예정 |
| 4 | 메모 작성 및 삭제 | 예정 |
| 5 | 메모 수정 기능 | 예정 |
| 6 | HTTP API 연동 | 예정 |
| 7 | 로딩 및 예외 처리 | 예정 |
| 8 | 프로젝트 구조 정리 | 예정 |

## 5. 학습할 주요 개념

### React Native UI

- View
- Text
- TextInput
- Pressable
- FlatList
- StyleSheet

### React Hooks

- useState
- useEffect

### HTTP API

| Method | Endpoint | Description |
|---|---|---|
| GET | /memos | 메모 목록 조회 |
| POST | /memos | 메모 작성 |
| PUT | /memos/:id | 메모 수정 |
| DELETE | /memos/:id | 메모 삭제 |

API는 학습을 위한 예시이며, 추후 실제 서버와 연동할 예정입니다.

## 6. 학습 방향

- React Native의 기본 구조와 동작 원리 이해
- 웹 React와 모바일 React Native의 차이점 학습
- 복잡한 라이브러리보다 기본 API와 Hooks 우선 활용
- 기능별 단계적 구현
- Android 실기기를 통한 테스트

## 7. 참고 자료

- [React Native 공식 문서](https://reactnative.dev/)
- [Expo 공식 문서](https://docs.expo.dev/)
- [TypeScript 공식 문서](https://www.typescriptlang.org/)

---

개인 학습 및 React Native 개발 역량 향상을 위한 프로젝트입니다.