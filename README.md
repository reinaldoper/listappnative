# 📋 TodoListApp

1. Aplicativo de lista de tarefas construído com **React Native**, **Firebase Firestore** e **Gluestack UI**.  
2. Permite adicionar, listar, concluir e remover tarefas com animações suaves e interface intuitiva.
3. Cria e loga usuário na aplicação, com email e senha.

---

## 🚀 Funcionalidades

- ✅ Adicionar tarefas com título e descrição
- 📋 Listar tarefas em tempo real (integração com Firebase Firestore)
- ✔️ Marcar tarefas como concluídas
- ❌ Remover tarefas
- 💅 Interface com Gluestack UI
- 📱 Navegação entre telas com React Navigation
- 🎬 Animações suaves com Reanimated

---

## 📂 Estrutura de Pastas

```bash
TodoListApp/
├── android
│   ├── app
│   ├── build
│   ├── build.gradle
│   ├── gradle
│   ├── gradle.properties
│   ├── gradlew
│   ├── gradlew.bat
│   └── settings.gradle
├── app.json
├── babel.config.cjs
├── Gemfile
├── index.js
├── ios
│   ├── Podfile
│   ├── TodoListApp
│   └── TodoListApp.xcodeproj
├── jest.config.js
├── package.json
├── package-lock.json
├── README.md
├── src
│   ├── App.tsx
│   ├── constants
│   ├── components
│   ├── hooks
│   ├── styles
│   ├── firebase
│   ├── screens
│   └── types
├── __tests__
│   └── App.test.tsx
│   ├── index.js
└── tsconfig.json

```


---

## 🧑‍💻 Como rodar o projeto

### 1. Clonar o repositório

```bash
git clone https://github.com/seu-usuario/listappnative.git
cd listappnative
&&
npm install
##ou
yarn install

```

---

### 2. Configurar o Firebase

1. Criar um projeto no Firebase Console
- Acesse o site do Firebase (firebase.google.com) e crie uma conta, caso ainda não tenha.

- No Firebase Console, crie um novo projeto.

- Dentro do projeto, habilite os métodos de autenticação que pretende usar, por exemplo, e-mail e senha, em Authentication > Sign-in method.

- Registre sua aplicação para as plataformas desejadas (iOS e/ou Android), fornecendo o identificador do app (exemplo: com.reactnativefirebase).

---

2. Baixe os arquivos de configuração gerados:

- Para Android: google-services.json

- Para iOS: GoogleService-Info.plist

- Copie suas credenciais do Firebase Web SDK

- Crie um .env na raiz do projeto e coloque as credenciais do firebase:

```env

FIREBASE_API_KEY="apiKey"
FIREBASE_AUTH_DOMAIN="authDomain"
FIREBASE_PROJECT_ID="projectId"
FIREBASE_STORAGE_BUCKET="storageBucket"
FIREBASE_MESSAGING_SENDER_ID="messagingSenderId",
FIREBASE_APP_ID="appId"
MEASUREMENT_ID="measurementId"
```
---

📱 Rodar no Android
- Certifique-se de estar com um emulador ou dispositivo conectado.

```bash
npx react-native run-android
```

---

### 3. 🛠️ Gerar APK de Debug local

```bash
cd android
./gradlew assembleDebug
```

1. Depois disso, o APK estará gerado em:

⚠️ Atenção: o APK de debug não é assinado para a Play Store — ele serve apenas para instalar manualmente em aparelhos para testes.

```bash
android/app/build/outputs/apk/debug/app-debug.apk
```


---

### 4. 🧪 Comandos úteis

```bash
npx react-native start --reset-cache            
npm run android                
```



---

### 5. 📦 Tecnologias utilizadas

- React Native

- Firebase Firestore

- React Navigation

- Gluestack UI

- react-hook-form

- react-native-reanimated

- Nodejs >=18


---

### 6. 🧑 Autor
- Desenvolvido por: Reinaldo Pereira dos Santos
- 📍 Dourados - MS
- 📧 reinaldoper83@gmail.com