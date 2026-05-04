# 🚀 Konwersja React → Android (Capacitor) - INSTRUKCJA

## ✅ Wymagania systemowe

Przed rozpoczęciem upewnij się, że masz zainstalowane:

### 1. **Java Development Kit (JDK 17+)**
   - Pobierz: https://www.oracle.com/java/technologies/downloads/
   - Lub użyj: `choco install openjdk17` (jeśli masz Chocolatey)
   
   **Sprawdzenie instalacji:**
   ```powershell
   java -version
   ```

### 2. **Android Studio**
   - Pobierz: https://developer.android.com/studio
   - Instalacja zawiera SDK i emulator
   
   **Podczas instalacji zaznacz:**
   - Android SDK
   - SDK Tools
   - Emulator

### 3. **Android SDK**
   - Pobierz przez Android Studio Manager
   - Wymagana wersja: API 21+ (najnowsza: API 35)
   
   **Zmienne środowiskowe (Windows):**
   ```
   ANDROID_HOME = C:\Users\[Twoja nazwa]\AppData\Local\Android\Sdk
   ```
   Dodaj do PATH: `%ANDROID_HOME%\tools;%ANDROID_HOME%\tools\bin;%ANDROID_HOME%\platform-tools`

### 4. **Node.js** (już masz ✓)
   - Wersja: 18+ LTS

---

## 📝 Konfiguracja (JUŻ WYKONANA)

✅ Zainstalowałem:
- Capacitor Core
- Capacitor CLI  
- Capacitor Android Platform
- TypeScript

✅ Stworzył:
- `capacitor.config.ts` - konfiguracja aplikacji
- Folder `android/` - projekt Android Studio
- Build scripts w `package.json`

---

## 🔨 Jak zbudować APK (4 kroki)

### Krok 1: Upewnij się, że Java i Android SDK są ustawione

```powershell
java -version
echo $env:ANDROID_HOME
```

### Krok 2: Przygotuj build

```powershell
cd "C:\Users\mateu\Documents\GitHub\my-frist-react-app"
npm run build:android
```

### Krok 3: Otwórz w Android Studio (opcjonalnie ale POLECAM)

```powershell
npm run open:android
```

W Android Studio:
1. Poczekaj na Gradle sync (1-2 minuty)
2. Kliknij: Build → Build Bundle(s) / APK(s) → Build APK(s)

### Krok 4: Zbuduj APK

**Opcja A: Via Terminal (automatycznie)**
```powershell
npm run build:apk
```

**Opcja B: Via Android Studio**
1. W Android Studio kliknij: Build → Build Bundle(s) / APK(s) → Build APK(s)
2. Poczekaj na zakończenie
3. Otrzymasz plik: `android/app/build/outputs/apk/debug/app-debug.apk`

---

## 📱 Jak uruchomić aplikację

### Na emulatorze Android:

```powershell
# 1. Uruchom emulator z Android Studio (Device Manager)
# 2. Sprawdź czy urządzenie jest dostępne:
adb devices

# 3. Zainstaluj APK:
adb install "android\app\build\outputs\apk\debug\app-debug.apk"

# 4. Uruchom aplikację:
adb shell am start -n com.tasksapp.mobile/.MainActivity
```

### Na telefonie fizycznym:

```powershell
# 1. Włącz tryb USB debugging na telefonie:
#    - Ustawienia → O telefonie → Dotknij "Numer kompilacji" 7 razy
#    - Wróć: Ustawienia → Opcje dla deweloperów → Debugowanie USB
# 2. Podłącz telefon USB kablem
# 3. Sprawdź czy urządzenie widoczne:
adb devices

# 4. Zainstaluj:
adb install "android\app\build\outputs\apk\debug\app-debug.apk"

# 5. Uruchom na telefonie
```

---

## 🔄 Cykl deweloperski

**Gdy zmienisz kod React:**

```powershell
# 1. Rebuild
npm run build:android

# 2. Zainstaluj na urządzeniu/emulatorze
adb install -r "android\app\build\outputs\apk\debug\app-debug.apk"
```

---

## 📦 Przygotowanie do publikacji (Google Play)

Gdy będziesz gotów do wydania:

### 1. Zbuduj Release APK/AAB:

```powershell
npm run build:aab
```

Plik znajduje się w: `android/app/build/outputs/bundle/release/app-release.aab`

### 2. Podpisz aplikację:

```powershell
cd android
./gradlew bundleRelease
```

### 3. Wrzuć do Google Play Console:
- https://play.google.com/console
- Utwórz nową aplikację
- Wrzuć AAB w sekcji "Production"

---

## 🐛 Rozwiązywanie problemów

### Problem: "Java nie znaleziona"
```powershell
$env:JAVA_HOME = "C:\Program Files\Java\jdk-17"
[Environment]::SetEnvironmentVariable("JAVA_HOME", $env:JAVA_HOME, "User")
```

### Problem: "ANDROID_HOME nie znaleziony"
```powershell
$env:ANDROID_HOME = "C:\Users\[TwojaNazwa]\AppData\Local\Android\Sdk"
[Environment]::SetEnvironmentVariable("ANDROID_HOME", $env:ANDROID_HOME, "User")
```

### Problem: Gradle sync timeout
```powershell
cd android
./gradlew --stop
./gradlew clean
```

### Problem: APK nie instaluje się
```powershell
# Odinstaluj starą wersję
adb uninstall com.tasksapp.mobile

# Zainstaluj nową
adb install "android\app\build\outputs\apk\debug\app-debug.apk"
```

---

## ✨ Następne kroki

1. **Zmień ikonę aplikacji:** Zamień plik w `android/app/src/main/res/drawable/icon.png`
2. **Zmień nazwę:** Edytuj `capacitor.config.ts` → zmień `appName`
3. **Zmień ID aplikacji:** Edytuj `capacitor.config.ts` → zmień `appId`
4. **Dodaj uprawnienia:** Edytuj `android/app/src/main/AndroidManifest.xml`

---

## 🎉 Gotowe!

Twoja aplikacja React jest teraz androiden! 🎊

**Podsumowanie:**
- Aplikacja React w 100% zachowana
- Pełny dostęp do API Android
- Profesjonalne rozwiązanie
- Łatwo aktualizować i deployować
