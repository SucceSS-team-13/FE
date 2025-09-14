# 🌱 AI 심리 상담 서비스 "오늘 어땠어"

<div align="center">
  <img src="https://github.com/user-attachments/assets/093697af-0ccf-49a2-88ea-d2b453ddde19" width="25%">
</div>

- 배포 URL : https://hairwhere.vercel.app](https://how-was-your-day.vercel.app

⚠️ 현재는 랜딩 페이지(로그인 전 화면)만 열람하실 수 있습니다.

<br>

## 프로젝트 소개

오늘 어땠어는 마음속 이야기를 편하게 털어놓을 수 있는 AI 심리 상담 서비스입니다.<br>
대표 아이콘인 **루미**는 빛에 반사된 깨진 유리 조각을 형상화했으며, 이는 각기 다른 모양의 조각처럼 사람마다 품고 있는 고민도 저마다 다르다는 의미를 담고 있습니다.

서비스 속 루미는 접속할 때마다 조금씩 다른 형태로 표현됩니다. 이는 각자의 고민이 다르듯, 루미 역시 늘 같은 모습이 아니라는 것을 상징합니다.

오늘 어땠어는 말하기 어려운 감정을 AI에게 솔직하게 전하고, 따뜻한 공감과 위로를 받을 수 있도록 돕습니다.<br>
인간관계의 부담 없이 자신의 감정을 정리하고, 필요한 조언과 해결책을 얻을 수 있도록 AI 루미가 함께합니다.

작은 대화 하나가 더 나은 하루를 만드는 데 도움이 되기를 바랍니다.
언제든 오늘 어땠어는 당신의 이야기를 들어줄 준비가 되어 있습니다.

<br>

## 팀원 구성

<h3 align="center">Frontend</h3>

<div align="center">

| **김산호** | **이만재** |
| :------: |  :------: |
| [<img src="https://github.com/coral0723.png" height=150 width=150> <br/> @coral0723](https://github.com/coral0723) | [<img src="https://github.com/leemanjae02.png" height=150 width=150> <br/> @leemanjae02](https://github.com/leemanjae02) | 
</div>

<br>

## 1. 개발 스택

<br>

<div align="center">
  <img src="https://img.shields.io/badge/React-61DAFB?style=for-the-badge&logo=react&logoColor=black" alt="React" />
  <img src="https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white" alt="TypeScript" />
  <img src="https://img.shields.io/badge/TanStack%20Query-FF4154?style=for-the-badge&logo=react-query&logoColor=white" alt="TanStack Query" />
  <img src="https://img.shields.io/badge/Zustand-333333?style=for-the-badge&logo=zustand&logoColor=white" alt="Zustand" />
  <img src="https://img.shields.io/badge/Less-1D365D?style=for-the-badge&logo=less&logoColor=white" alt="Less" />
  <img src="https://img.shields.io/badge/MSW-84A3FD?style=for-the-badge&logo=mock-service-worker&logoColor=white" alt="Mock Service Worker" />
  <img src="https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=white" alt="Vite" />
<img src="https://img.shields.io/badge/Axios-5A29E4?style=for-the-badge&logo=axios&logoColor=white" alt="Axios" />
  <img src="https://img.shields.io/badge/Vercel-000000?style=for-the-badge&logo=vercel&logoColor=white" alt="Vercel" />
  <img src="https://img.shields.io/badge/Kakao%20API-FFCD00?style=for-the-badge&logo=kakao&logoColor=black" alt="Kakao API" />
</div>

<br>

## 2. 브랜치 전략

- Git-flow 전략을 기반으로 main, develop 브랜치와 feature, fix, style 등의 보조 브랜치를 운용했습니다.
- main, develop 브랜치로 나누고 develop 브랜치에서 이슈의 종류에 맞는 브랜치를 다시 나누어 개발을 하였습니다.
    - **main** 브랜치는 배포 단계에서만 사용하는 브랜치입니다.
    - **develop** 브랜치는 개발 단계에서 git-flow의 master 역할을 하는 브랜치입니다.
    - **feature**, **fix**, **style** 브랜치는 기능 단위로 독립적인 개발 환경을 위하여 사용하고 merge 후 각 브랜치를 삭제해주었습니다.

<br>

## 3. 담당 기능

### 💪이만재

- **로그인 페이지**
  - 카카오 소셜 로그인 구현
- **랜딩 페이지**
  - Three.js를 사용한 3D 로고 구현
  - Help, Product, Features, Growth, Developer, Guide 컴포넌트 구현
  - Header, Footer 컴포넌트 구현
- **채팅 페이지**
  - SideBar 컴포넌트 구현 및 인피니트 스크롤 적용
  - 채팅 검색 모달 컴포넌트 구현 및 인피니트 스크롤, 디바운스 적용
- **전역 상태 관리**
  - 로그인 상태 관리
  - SideBar 상태 관리
  - 테마 상태 관리
- **다크모드 구현**

<br>

### 🪸김산호
- **설문조사 페이지**
    - 나이, 거주지, 성향, 취미 설문 조사 컴포넌트 구현
- **설문조사 분석 결과 페이지**
    - 3D 로고를 사용한 로딩 컴포넌트 구현
    - 설문조사 분석 결과 컴포넌트 구현
- **채팅 페이지**
    - 채팅 전송 기능 구현
    - 채팅 내역 인피니트 스크롤링 적용
    - 카카오 맵 API를 활용한 솔루션 기능 구현
- **MSW 환경 구축**
- **Vercel을 사용한 배포**
    
    
<br>

## 4. 주요 기능

### [📝 맞춤형 초기 설문 페이지]

회원가입 후 가장 먼저 진행하는 단계로, 사용자의 나이, 주소, 성향, 취미를 입력받습니다.<br>
이는 단순히 대화를 이어가는 데 그치지 않고, 사용자에게 실질적인 맞춤형 솔루션을 제공하기 위해 필요한 과정입니다. 

<br>
<br>

<p align="center">
  <img width="1442" height="608" alt="Image" src="https://github.com/user-attachments/assets/9cdb38db-2418-4061-8aee-43b56c84150a" />
</p>

- 사용자의 연령대를 10대, 20대, 30대, 40대, 50대+ 중에서 입력받습니다.
- 연령대 정보를 기반으로, 각 나이대가 즐겨 하는 활동이나 선호도를 반영한 맞춤형 솔루션을 제공합니다.

<br>

<p align="center">
  <img width="1444" height="395" alt="Image" src="https://github.com/user-attachments/assets/19c175b8-bcfe-4b9e-8b58-e8569930ef31" />
</p>

- 사용자의 주소를 입력받아, 거주지와 가까운 활동 장소나 도움 받을 수 있는 공간을 추천합니다.
- 이를 통해 상담이 단순한 위로에 그치지 않고, 실제 생활에 도움이 되는 솔루션을 제공합니다.

<br>

<p align="center">
  <img width="1445" height="764" alt="Image" src="https://github.com/user-attachments/assets/add86b2c-1dfc-425f-bd7d-1d6477812a1f" />
</p>

- **에너지 방향** : 외향형(활동적·사교적) / 내향형(개인적·조용한 활동)
- **판단 방식** : 감정형(공감·위로 중심) / 이성형(현실적·해결 중심)
- 성향 입력을 통해, 외향형 사용자는 외부 활동 중심 솔루션을, 내향형 사용자는 혼자 즐길 수 있는 활동을 제안합니다.
- 감정형은 따뜻한 위로 중심의 대답을, 이성형은 현실적이고 실질적인 조언을 받을 수 있습니다.

<br>

<p align="center">
  <img width="1444" height="764" alt="Image" src="https://github.com/user-attachments/assets/35bd3baa-2f38-41c9-b509-571e83258cc1" />
</p>

- 운동, 여행, 독서, 영화, 게임, 공예 등 다양한 취미 카테고리 중 선택할 수 있습니다.
- 입력된 취미에 따라, 사용자에게 보다 개인화된 추천과 솔루션을 제공합니다.

<br>

<div align="center">
  <img src="https://github.com/user-attachments/assets/06f83029-cd11-4555-8cb4-2c4051d13529" width="100%">
</div>

- 사용자가 입력한 정보를 바탕으로 루미가 성향 분석 결과를 제공합니다.
- 이를 통해 이후에는 루미와 본격적인 상담을 진행할 수 있습니다.



