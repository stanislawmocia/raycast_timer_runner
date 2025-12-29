# Timer Runner for Raycast

Rozbudowana komenda do ustawiania timerów, które uruchamiają aplikacje, komendy systemowe i inne komendy Raycast.

## ✨ Funkcje

- ⏰ **Elastyczne ustawianie czasu** - sekundy, minuty, godziny
- 📱 **Dynamiczne aplikacje** - wybierz spośród WSZYSTKICH zainstalowanych aplikacji na Twoim Macku
- ⚙️ **Rozbudowane komendy systemowe**:
  - 🔴 Shutdown, Restart, Sleep, Lock Screen, Log Out
  - 🔊 Kontrola głośności (Volume Up/Down/Mute)
  - ☀️ Kontrola jasności (Brightness Up/Down)
  - 🗑️ Empty Trash, Show Desktop
- ⚡ **Integracja z Raycast** - uruchamiaj inne komendy Raycast po upływie timera
- 📝 **Auto-uzupełnienia** - wszystkie aplikacje z ikonami i wyszukiwaniem
- 👀 **Zarządzanie timerami** - podgląd aktywnych timerów z odliczaniem w czasie rzeczywistym
- ❌ **Anulowanie timerów** - łatwe zarządzanie aktywnymi timerami

## 🚀 Nowe możliwości

### Wszystkie aplikacje systemowe
Zamiast statycznej listy aplikacji, extension automatycznie wykrywa WSZYSTKIE zainstalowane aplikacje na Twoim systemie, wyświetlając je z ich oryginalnymi ikonami.

### Komendy Raycast
Możesz teraz ustawić timer do uruchomienia dowolnej komendy Raycast! Przykłady:
- `toggle-system-appearance` - przełącz tryb ciemny/jasny
- `empty-trash` - opróżnij kosz
- Dowolna inna komenda z Twoich extensions

### Grupowane komendy systemowe
Komendy są teraz zorganizowane w kategorie:
- **Power**: Shutdown, Restart, Sleep, Lock Screen, Log Out
- **Audio**: Volume Up, Volume Down, Mute/Unmute
- **Display**: Brightness Up, Brightness Down
- **System**: Empty Trash, Show Desktop

## 📋 Przykłady użycia

### Aplikacje
- `Timer: 10 sec → Safari` - otwórz Safari po 10 sekundach
- `Timer: 5 min → Visual Studio Code` - uruchom VS Code po 5 minutach
- `Timer: 1 h → Spotify` - włącz Spotify po godzinie

### Komendy systemowe
- `Timer: 30 min → Shutdown` - wyłącz komputer po 30 minutach
- `Timer: 2 h → Lock Screen` - zablokuj ekran po 2 godzinach
- `Timer: 15 min → Volume Mute` - wycisz dźwięk po 15 minutach
- `Timer: 1 h → Brightness Down` - zmniejsz jasność po godzinie

### Komendy Raycast
- `Timer: 30 min → toggle-system-appearance` - przełącz tryb ciemny po 30 minutach
- `Timer: 1 h → play-pause` - zapauzuj muzykę po godzinie

## 🛠️ Instalacja

1. Sklonuj repozytorium
2. Uruchom `npm install`
3. Uruchom `npm run dev` aby testować lokalnie
4. Otwórz Raycast i wyszukaj "Set Timer"

Szczegółowa instrukcja: [INSTALLATION.md](INSTALLATION.md)

## 📊 Testy

```bash
npm test              # Uruchom wszystkie testy
npm run test:watch    # Tryb watch
npm run test:coverage # Pokrycie kodu
```

✅ **22/22 testy przechodzą**

## 🎯 Komendy

### Set Timer
Główna komenda do ustawiania timerów. Wyświetla interaktywny formularz z:
- Polem czasu (wartość + jednostka)
- Wyborem typu akcji (Aplikacja / Komenda systemowa / Komenda Raycast)
- Dynamiczną listą z auto-uzupełnieniami

### Manage Timers
Zarządzanie aktywnymi timerami:
- Lista wszystkich aktywnych timerów
- Odliczanie w czasie rzeczywistym
- Możliwość anulowania
- Auto-odświeżanie co sekundę

## 🔧 Technologie

- TypeScript
- React
- Raycast API
- Jest (testy)
- Node.js

## 📝 Struktura projektu

```
src/
├── set-timer.tsx          # Komenda do ustawiania timerów
├── manage-timers.tsx      # Zarządzanie timerami
├── types.ts               # Typy TypeScript
├── utils.ts               # Funkcje pomocnicze
├── storage.ts             # LocalStorage
├── actions.ts             # Wykonywanie akcji
├── __tests__/             # Testy
└── __mocks__/             # Mocki dla testów
```

## 🤝 Wkład

Pull requesty są mile widziane! Dla większych zmian, proszę najpierw otwórz issue.

## 📄 Licencja

MIT
