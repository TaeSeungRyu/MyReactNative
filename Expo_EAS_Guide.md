# Expo EAS 학습 및 실습 정리

> 프로젝트: `myReactNative` · 환경: Windows 11 / VS Code / pnpm / Expo / Android 실기기  
> 학습 범위: EAS 클라우드 APK 빌드 및 직접 배포 완료, OTA 업데이트는 다음 학습 예정

## 1. EAS란?

**EAS(Expo Application Services)**는 Expo 프로젝트의 앱 빌드·업데이트·스토어 제출 등을 지원하는 서비스다.

| 도구 | 역할 | 이번 학습에서 사용 여부 |
|---|---|---|
| **EAS CLI** | 터미널에서 EAS 서비스를 조작 | 사용 |
| **EAS Build** | 클라우드에서 Android/iOS 앱 빌드 | 사용 |
| **EAS Update** | 호환되는 설치 앱에 JavaScript 및 리소스 업데이트 전달 | 다음 학습 |
| **EAS Submit** | 앱 스토어에 빌드 제출 | 사용하지 않음 |

**핵심:** 마켓에 올리지 않아도 Android APK를 생성하고 휴대폰에 직접 설치할 수 있다.

## 2. 이번 실습에서 완료한 흐름

```text
Windows 개발 PC (myReactNative)
  ↓ EAS CLI 로그인 및 프로젝트 연결
Expo EAS Build (클라우드)
  ↓ Android APK 생성
Expo 대시보드 > Builds
  ↓ APK 다운로드 / 설치 링크
Android 실기기 설치 및 실행
```

완료한 항목:

- [x] EAS CLI 실행 확인
- [x] Expo 계정 로그인
- [x] `eas build:configure`로 프로젝트 연결
- [x] EAS 클라우드 Android APK 빌드
- [x] Expo 대시보드에서 빌드 결과 확인
- [x] Android 휴대폰에서 앱 실행 확인
- [ ] EAS Update(OTA) 설정 및 실제 업데이트 실습

## 3. EAS CLI 실행과 로그인

프로젝트 루트 디렉터리에서 실행한다.

```bash
pnpm dlx eas-cli --version
pnpm dlx eas-cli login
pnpm dlx eas-cli whoami
```

- `pnpm dlx`: CLI를 전역 설치하지 않고 실행하는 방법.
- `login`: Expo 계정 인증.
- `whoami`: 현재 로그인 계정 확인.

### pnpm에서 패키지 빌드 허용 질문이 나온 경우

실습 중 다음 질문이 나타났다.

```text
Choose which packages to build (<space> to select, <enter> to confirm):
  [ ] dtrace-provider
> [ ] protobufjs
```

이는 pnpm이 의존성 패키지의 **설치 스크립트 실행을 허용할지** 묻는 화면이다. 실습에서는 `protobufjs`를 선택하고 진행했다. 모든 패키지를 무조건 허용하지 말고 출처와 필요성을 확인해야 한다.

## 4. EAS 프로젝트 연결

```bash
pnpm dlx eas-cli build:configure
```

실습에서 확인한 완료 메시지:

```text
🎉 Your project is ready to build.
```

일반적으로 프로젝트 루트에 `eas.json`이 생성되고, `app.json`의 `expo.extra.eas.projectId`에 프로젝트 연결 정보가 추가된다. **실제 파일 구조는 프로젝트별로 다를 수 있으므로 기존 설정을 유지해야 한다.**

## 5. APK 빌드 설정

`eas.json`의 `build` 항목에 APK용 프로필을 설정한다. 아래는 **핵심 설정만 보여주는 예시**이며, 이미 생성된 다른 설정은 함부로 삭제하지 않는다.

```json
{
  "build": {
    "preview": {
      "distribution": "internal",
      "android": {
        "buildType": "apk"
      }
    }
  }
}
```

| 설정 | 의미 |
|---|---|
| `preview` | 빌드 프로필 이름. 임의로 정할 수 있음 |
| `distribution: internal` | 내부/직접 배포용 빌드 |
| `android.buildType: apk` | 직접 설치 가능한 APK 생성 |

**APK와 AAB의 차이**

- **APK**: Android 기기에 직접 설치할 수 있는 파일.
- **AAB**: 주로 Google Play 배포용 앱 번들. 일반적으로 APK처럼 바로 설치하지 않는다.

이번 목적은 마켓 배포가 아니므로 APK를 사용한다.

## 6. EAS 클라우드 빌드 실행

```bash
pnpm dlx eas-cli build --platform android --profile preview
```

빌드 중에는 의존성 설치, 네이티브 Android 빌드, 서명 및 APK 생성 등이 진행된다. 첫 빌드는 수 분에서 수십 분까지 걸릴 수 있으며 대기열과 프로젝트 환경에 따라 달라진다.

처음 Android 빌드 시 **Keystore(서명 키)** 생성 여부를 물을 수 있다. 별도의 키가 없다면 EAS가 생성·관리하도록 선택할 수 있다. 이후 **같은 앱을 업데이트 설치하려면 앱 식별자와 서명 키의 일관성**이 중요하다.

### 에뮬레이터 설치 질문

실습 중 다음 메시지가 나타났다.

```text
Install and run the Android build on an emulator? ... yes
Downloading app (10.7 MB / 117 MB)
```

이는 **이미 생성된 APK를 PC에 내려받아 에뮬레이터에 설치하려는 단계**다. 실제 휴대폰에 설치할 목적이라면 에뮬레이터 설치는 필수가 아니다. Expo 대시보드에서 APK를 직접 내려받거나 설치 링크를 사용하면 된다.

## 7. Expo 대시보드에서 APK 다운로드 및 설치

1. https://expo.dev/ 에 로그인한다.
2. `myReactNative` 프로젝트를 선택한다.
3. **Builds** 메뉴에서 성공한 Android 빌드를 선택한다.
4. 상세 화면에서 APK 다운로드 또는 설치 링크/QR 코드를 찾는다.
5. Android 휴대폰에서 APK를 내려받아 설치한다.
6. 필요하다면 Android의 **알 수 없는 앱 설치 허용** 권한을 부여한다.

설치 후에는 **Expo Go 없이 독립적인 앱**으로 실행할 수 있다. 일반적인 배포용 APK는 개발 PC의 Metro 서버 없이 실행된다. 단, 앱이 외부 API를 호출한다면 해당 서버와 네트워크는 정상적으로 접근 가능해야 한다.

> 실습 결과: EAS 프로젝트 연결, 클라우드 빌드, APK 확인 및 휴대폰 실행까지 완료했다.

## 8. EAS Build와 EAS Update 차이

| 비교 | EAS Build | EAS Update |
|---|---|---|
| 목적 | 설치 가능한 앱 생성 | 설치된 앱의 JS·리소스 업데이트 |
| 결과물 | APK/AAB 등 | 업데이트 번들 및 리소스 |
| 신규 앱 설치 | 가능 | 불가능 |
| 화면 문구·JS 로직 변경 | 가능 | 가능(호환되는 빌드에 한함) |
| 새로운 네이티브 모듈 추가 | 새 빌드로 가능 | OTA만으로 불가능 |
| 마켓 등록 | 필수 아님 | 필수 아님 |

**중요:** OTA는 이미 설치된 앱에 업데이트 기능이 구성되어 있어야 동작한다. 기존 APK에 OTA 설정이 없다면 설정 후 **새 APK를 한 번 다시 빌드·설치**해야 한다.

## 9. 다음 학습: EAS Update(OTA)

아래는 **앞으로 진행할 실습 절차**이며, 아직 수행 완료된 내용이 아니다.

### 9-1. 업데이트 설정

```bash
pnpm dlx eas-cli update:configure
```

이 명령은 프로젝트의 EAS Update 설정을 구성한다. `expo-updates` 의존성, 업데이트 URL, 런타임 버전 등의 실제 설정을 확인한다. SDK 및 기존 설정에 따라 추가 조치가 필요할 수 있다.

### 9-2. 빌드 프로필과 업데이트 채널 연결

예시:

```json
{
  "build": {
    "preview": {
      "distribution": "internal",
      "channel": "preview",
      "android": {
        "buildType": "apk"
      }
    }
  }
}
```

OTA 설정을 포함한 APK를 다시 빌드하고 휴대폰에 설치한다.

```bash
pnpm dlx eas-cli build --platform android --profile preview
```

### 9-3. JS 코드 수정 후 업데이트 배포

예를 들어 화면 문구를 `버전 1`에서 `버전 2`로 수정한 뒤:

```bash
pnpm dlx eas-cli update --channel preview --message "화면 문구 변경"
```

**주의:** 채널과 브랜치의 연결, `runtimeVersion` 호환성, 앱의 업데이트 확인 정책에 따라 실제 수신·적용 여부가 결정된다. 일반적으로 업데이트가 다운로드되어도 재시작 후 적용될 수 있다. 명령 실행만으로 모든 설치 앱에 즉시 반영되는 것은 아니다.

### OTA로 처리할 수 없는 대표 사례

- 새로운 네이티브 라이브러리 추가 또는 네이티브 코드 변경
- Android 권한/Manifest 등 네이티브 설정 변경
- 호환되지 않는 네이티브 런타임으로의 변경

이 경우 새 APK를 빌드하고 배포해야 한다.

## 10. 명령어 치트시트

| 명령어 | 용도 |
|---|---|
| `pnpm dlx eas-cli --version` | EAS CLI 버전 확인 |
| `pnpm dlx eas-cli login` | Expo 로그인 |
| `pnpm dlx eas-cli whoami` | 로그인 계정 확인 |
| `pnpm dlx eas-cli build:configure` | EAS 빌드 프로젝트 구성 |
| `pnpm dlx eas-cli build --platform android --profile preview` | Android APK 클라우드 빌드 |
| `pnpm dlx eas-cli build:list` | 빌드 목록 확인 |
| `pnpm dlx eas-cli update:configure` | OTA 업데이트 설정 |
| `pnpm dlx eas-cli update --channel preview --message "수정 내용"` | 지정 채널로 OTA 업데이트 배포 |

## 11. 기억할 핵심 5가지

1. **EAS Build = 앱 설치 파일 생성**, **EAS Update = 호환되는 설치 앱의 JS/리소스 업데이트**.
2. 마켓에 올리지 않을 Android 앱은 `preview` 프로필의 **APK 직접 배포**로 학습할 수 있다.
3. **Expo Go와 직접 설치한 APK는 다르다.** APK는 독립적으로 실행된다.
4. **네이티브 코드가 변경되면 재빌드가 필요**하며, OTA로 대체할 수 없다.
5. OTA는 **업데이트 설정이 포함된 빌드, 채널/브랜치, 런타임 호환성**을 함께 관리해야 한다.

---

참고 문서:
- EAS Build: https://docs.expo.dev/build/introduction/
- APK 빌드: https://docs.expo.dev/build-reference/apk/
- EAS Update: https://docs.expo.dev/eas-update/introduction/
