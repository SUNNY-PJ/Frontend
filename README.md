# SUNNY 절약 대결 앱

이 프로젝트는 친구들과 경쟁하며 재미있게 절약할 수 있는 플랫폼입니다. 사용자는 절약 목표를 설정하고, 지출 현황을 시각화하여 목표 달성을 쉽게 관리할 수 있습니다. 또한, 커뮤니티 기능을 통해 다른 사용자와 절약 팁을 공유하고 서로를 응원할 수 있습니다.

<br/>
<br/>

## Frontend 기술 스택

이 프로젝트는 다음과 같은 기술 스택을 사용합니다:

- ![React Native](https://img.shields.io/badge/React%20Native-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
- ![Expo](https://img.shields.io/badge/Expo-000020?style=for-the-badge&logo=expo&logoColor=white)
- ![JavaScript](https://img.shields.io/badge/JavaScript-323330?style=for-the-badge&logo=javascript&logoColor=F7DF1E)
- ![REST API](https://img.shields.io/badge/REST-02569B?style=for-the-badge&logo=rest&logoColor=white)

[![runs with Expo Go](https://img.shields.io/badge/Runs%20with%20Expo%20Go-000.svg?style=flat-square&logo=EXPO&labelColor=f3f3f3&logoColor=000)](https://expo.dev/client)
[![runs with Expo Go](https://img.shields.io/badge/Runs%20with%20Expo%20Go-4630EB.svg?style=flat-square&logo=EXPO&labelColor=f3f3f3&logoColor=000)](https://expo.dev/client)

Expo Go 앱을 설치하면 디바이스에서 SUNNY를 확인할 수 있습니다.

<br/>

## 🏛️ 아키텍처

### 📦 모듈화
- 기능별로 컴포넌트를 분리하고, 재사용 가능한 UI 컴포넌트와 비즈니스 로직을 분리하여 관리

### 🚦 네비게이션
- React Navigation을 사용하여 탭 네비게이션 및 스택 네비게이션 구현

### 🔄 상태 관리
- 글로벌 상태 관리(사용자 정보, 절약 목표 등)는 Redux를 통해 관리하고, 로컬 상태(폼 입력 등)는 useState 훅을 사용

<br/>

## 🌟 주요 구현 사항

### 🔔 알림 시스템
- `expo-notifications`를 사용하여 푸시 알림 구현. 백엔드 서버에서 푸시 알림을 트리거하여 사용자가 절약 목표에 근접할 때 알림을 받도록 설정

### 🔄 실시간 데이터 업데이트
- 사용자 간의 절약 대결 결과를 실시간으로 반영하기 위해 WebSocket 또는 Firebase Realtime Database 사용

### 📊 지출 현황 시각화
- `react-native-svg`와 `d3.js`를 사용하여 지출 데이터를 시각화. Pie 차트, 바 차트 등을 통해 지출 현황을 한눈에 파악할 수 있도록 구현

### 👥 커뮤니티 기능
- 사용자 간의 소셜 인터랙션을 위해 Firebase Firestore 또는 MongoDB를 사용하여 게시글 및 댓글 기능 구현

### 🎯 절약 목표 설정
- 사용자가 절약 목표를 설정하고, 해당 목표에 대한 진행 상황을 시각적으로 확인할 수 있도록 Progress Bar와 같은 UI 컴포넌트 구현

<br/>

## 📚 사용된 주요 라이브러리

- **React Navigation**: 내비게이션 및 라우팅 관리
- **Redux / Context API**: 애플리케이션 상태 관리
- **expo-notifications**: 푸시 알림 기능
- **axios 또는 fetch**: API 통신을 위한 HTTP 클라이언트
- **react-native-svg, d3.js**: 데이터 시각화를 위한 라이브러리
- **AsyncStorage, SecureStore**: 로컬 데이터 저장 및 보안 데이터 관리

<br/>

## 🚀 배포 및 테스트

### 🧪 테스트
- Jest 및 React Native Testing Library를 사용하여 단위 테스트 및 통합 테스트 구현

### 🔄 CI/CD
- GitHub Actions 또는 GitLab CI를 사용하여 지속적인 통합 및 배포 파이프라인 구축

### 📱 배포
- Expo Managed Workflow를 통해 iOS와 Android 플랫폼 모두에 손쉽게 배포

<br/>
<br/>

## 프로젝트 구조

```plaintext
.
├── api/                   # REST API 호출 관련 코드
├── assets/                # 이미지, 폰트 등 정적 자원
├── components/            # 재사용 가능한 컴포넌트
├── constant/              # 상수 값들
├── context/               # 전역 상태 관리
├── data/                  # 데이터 및 모델
├── hook/                  # 커스텀 훅
├── screen/                # 화면 컴포넌트
├── test/                  # 테스트 코드
├── .gitignore             # Git 무시 파일 목록
├── App.js                 # 애플리케이션의 진입점
├── ChatScreen.js          # 채팅 화면 컴포넌트
├── KakaoScreen.js         # 카카오톡 연동 화면 컴포넌트
├── MainScreen.js          # 메인 화면 컴포넌트
├── Navigation.js          # 네비게이션 설정
└── README.md              # 프로젝트에 대한 설명


