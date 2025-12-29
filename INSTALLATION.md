# Instrukcja Instalacji i Użytkowania

## Wymagania

- macOS
- Node.js (v18 lub nowszy)
- npm (v8 lub nowszy)
- Raycast (zainstalowany na macOS)

## Instalacja

### 1. Instalacja zależności

```bash
npm install
```

### 2. Uruchomienie w trybie deweloperskim

```bash
npm run dev
```

Po uruchomieniu, otwórz Raycast i znajdziesz extension "Timer Runner" na liście dostępnych komend.

### 3. Budowanie dla produkcji

```bash
npm run build
```

## Testowanie

### Uruchomienie wszystkich testów

```bash
npm test
```

### Uruchomienie testów w trybie watch

```bash
npm run test:watch
```

### Sprawdzenie pokrycia kodu testami

```bash
npm run test:coverage
```

## Użytkowanie

### Komenda: Set Timer

1. Otwórz Raycast (domyślnie: `Cmd + Space`)
2. Wpisz "Set Timer"
3. Wypełnij formularz:
   - **Timer Name** (opcjonalne): Nazwa timera dla łatwiejszej identyfikacji
   - **Time Value**: Liczba (np. 10, 30, 2)
   - **Time Unit**: Wybierz jednostkę czasu (sekundy, minuty, godziny)
   - **Action Type**: Wybierz typ akcji
     - **Open Application**: Otwórz aplikację
     - **System Command**: Wykonaj komendę systemową
   - **Application/System Command**: Wybierz konkretną aplikację lub komendę

4. Zatwierdź (Enter)

#### Przykłady użycia:

**Przykład 1: Uruchomienie Chrome po 10 sekundach**
- Time Value: `10`
- Time Unit: `Seconds`
- Action Type: `Open Application`
- Application: `Google Chrome`

**Przykład 2: Wyłączenie komputera po 30 minutach**
- Time Value: `30`
- Time Unit: `Minutes`
- Action Type: `System Command`
- System Command: `🔴 Shutdown`

**Przykład 3: Blokada ekranu po 2 godzinach**
- Time Value: `2`
- Time Unit: `Hours`
- Action Type: `System Command`
- System Command: `🔒 Lock Screen`

### Komenda: Manage Timers

1. Otwórz Raycast
2. Wpisz "Manage Timers"
3. Zobaczysz listę aktywnych timerów z:
   - Nazwą timera
   - Akcją do wykonania
   - Pozostałym czasem
   - Całkowitym czasem trwania

#### Akcje dostępne dla każdego timera:

- **Cancel Timer**: Anuluj timer (Delete lub Cmd+Backspace)
- **Refresh**: Odśwież listę timerów (Cmd+R)

## Dostępne Aplikacje

Extension zawiera predefiniowaną listę popularnych aplikacji:
- Google Chrome, Safari, Firefox
- Visual Studio Code
- Spotify, Slack, Discord
- Notion, Terminal, iTerm
- Calendar, Mail, Messages
- Zoom, Microsoft Teams
- Microsoft Office (Word, Excel, PowerPoint)
- Adobe Creative Cloud (Photoshop, Illustrator)
- Figma, Sketch
- i więcej...

## Dostępne Komendy Systemowe

- 🔒 **Lock Screen**: Zablokuj ekran
- 😴 **Sleep**: Uśpij komputer
- 🔴 **Shutdown**: Wyłącz komputer
- 🔄 **Restart**: Uruchom ponownie komputer
- 🚪 **Log Out**: Wyloguj użytkownika

## Rozwiązywanie Problemów

### Timer nie uruchamia aplikacji

- Upewnij się, że nazwa aplikacji jest poprawna i aplikacja znajduje się w folderze `/Applications/`
- Sprawdź czy Raycast ma odpowiednie uprawnienia systemowe

### Komendy systemowe nie działają

- Raycast może wymagać uprawnień dostępu w Preferencjach Systemowych > Prywatność i Bezpieczeństwo
- Nadaj Raycast uprawnienia do "Accessibility" i "Automation"

### Testy nie przechodzą

```bash
# Wyczyść cache i node_modules
rm -rf node_modules package-lock.json
npm install
npm test
```

## Wsparcie

W razie problemów lub pytań:
1. Sprawdź logi w Raycast (Cmd+Shift+D w Raycast)
2. Uruchom testy: `npm test`
3. Sprawdź czy wszystkie zależności są zainstalowane: `npm install`
