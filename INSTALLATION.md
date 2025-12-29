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
   - **Action Type**: Wybierz typ akcji:
     - **📱 Open Application**: Otwórz aplikację
     - **⚙️ System Command**: Wykonaj komendę systemową
     - **⚡ Raycast Command**: Uruchom komendę Raycast
   - W zależności od typu akcji, wybierz konkretną opcję

4. Zatwierdź (Enter)

### Typy akcji

#### 📱 Aplikacje

Extension automatycznie wykrywa **wszystkie zainstalowane aplikacje** na Twoim Macku. Lista zawiera:
- Wszystkie aplikacje z folderu `/Applications/`
- Aplikacje z ikonami (natywne ikony z systemu)
- Wyszukiwanie i filtrowanie w czasie rzeczywistym
- Sortowanie alfabetyczne

**Przykład:**
- Time Value: `10`
- Time Unit: `Seconds`
- Action Type: `📱 Open Application`
- Application: `Safari` (wybierz z listy)

#### ⚙️ Komendy Systemowe

Komendy systemowe są pogrupowane w kategorie:

**Power (Zarządzanie energią)**
- 🔒 Lock Screen - Zablokuj ekran
- 😴 Sleep - Uśpij komputer
- 🔴 Shutdown - Wyłącz komputer
- 🔄 Restart - Uruchom ponownie
- 🚪 Log Out - Wyloguj użytkownika

**Audio (Dźwięk)**
- 🔊 Volume Up - Zwiększ głośność
- 🔉 Volume Down - Zmniejsz głośność
- 🔇 Mute/Unmute - Wycisz/Włącz dźwięk

**Display (Wyświetlacz)**
- ☀️ Brightness Up - Zwiększ jasność
- 🌙 Brightness Down - Zmniejsz jasność

**System**
- 🗑️ Empty Trash - Opróżnij kosz
- 🖥️ Show Desktop - Pokaż pulpit

**Przykład:**
- Time Value: `30`
- Time Unit: `Minutes`
- Action Type: `⚙️ System Command`
- System Command: `🔴 Shutdown`

#### ⚡ Komendy Raycast

Możesz uruchomić dowolną komendę Raycast po upływie timera!

**Jak znaleźć nazwę komendy:**
1. Otwórz Raycast Settings
2. Przejdź do Extensions
3. Znajdź interesującą Cię komendę
4. Nazwa komendy znajduje się w szczegółach (np. `toggle-system-appearance`)

**Popularne komendy:**
- `toggle-system-appearance` - Przełącz tryb ciemny/jasny
- `empty-trash` - Opróżnij kosz
- `toggle-hidden-files` - Pokaż/ukryj ukryte pliki
- `caffeinate` - Zapobiegaj uśpieniu
- `copy-path` - Skopiuj ścieżkę
- I wiele innych z Twoich zainstalowanych extensions!

**Przykład:**
- Time Value: `1`
- Time Unit: `Hours`
- Action Type: `⚡ Raycast Command`
- Raycast Command Name: `toggle-system-appearance`

### Przykłady użycia

#### Przykład 1: Uruchomienie Safari po 10 sekundach
- Time Value: `10`
- Time Unit: `Seconds`
- Action Type: `📱 Open Application`
- Application: `Safari`

#### Przykład 2: Wyłączenie komputera po 30 minutach
- Time Value: `30`
- Time Unit: `Minutes`
- Action Type: `⚙️ System Command`
- System Command: `🔴 Shutdown`

#### Przykład 3: Blokada ekranu po 2 godzinach
- Time Value: `2`
- Time Unit: `Hours`
- Action Type: `⚙️ System Command`
- System Command: `🔒 Lock Screen`

#### Przykład 4: Zwiększenie głośności po 5 minutach
- Time Value: `5`
- Time Unit: `Minutes`
- Action Type: `⚙️ System Command`
- System Command: `🔊 Volume Up`

#### Przykład 5: Przełączenie trybu ciemnego po 30 minutach
- Time Value: `30`
- Time Unit: `Minutes`
- Action Type: `⚡ Raycast Command`
- Raycast Command Name: `toggle-system-appearance`

### Komenda: Manage Timers

1. Otwórz Raycast
2. Wpisz "Manage Timers"
3. Zobaczysz listę aktywnych timerów z:
   - Nazwą timera
   - Akcją do wykonania
   - Pozostałym czasem (odliczanie w czasie rzeczywistym)
   - Całkowitym czasem trwania

#### Akcje dostępne dla każdego timera:

- **Cancel Timer**: Anuluj timer (Delete lub Cmd+Backspace)
- **Refresh**: Odśwież listę timerów (Cmd+R)

Lista automatycznie odświeża się co sekundę, pokazując aktualny czas pozostały.

## Funkcje zaawansowane

### Auto-uzupełnienia

Wszystkie pola z listami (aplikacje, komendy) mają wbudowane wyszukiwanie:
- Wpisz kilka liter, aby filtrować listę
- Aplikacje wyświetlają się z oryginalnymi ikonami
- Sortowanie alfabetyczne

### Zapisywanie wartości

Extension zapamiętuje Twoje ostatnie wybory:
- Ostatnio używane aplikacje
- Preferowane jednostki czasu
- Typ akcji

### Powiadomienia

System powiadomień informuje o:
- Pomyślnym ustawieniu timera
- Wykonaniu akcji
- Błędach (jeśli wystąpią)

## Rozwiązywanie Problemów

### Timer nie uruchamia aplikacji

- Extension automatycznie wykrywa aplikacje - jeśli aplikacji nie ma na liście, sprawdź czy jest zainstalowana w `/Applications/`
- Sprawdź czy Raycast ma odpowiednie uprawnienia systemowe

### Komendy systemowe nie działają

- Raycast może wymagać uprawnień dostępu w Preferencjach Systemowych
- Przejdź do: **System Settings → Privacy & Security → Accessibility**
- Dodaj Raycast do listy dozwolonych aplikacji

### Komendy Raycast nie działają

- Upewnij się, że nazwa komendy jest poprawna (sprawdź w Raycast Settings → Extensions)
- Komenda musi być dostępna i włączona w Raycast
- Niektóre komendy wymagają dodatkowych uprawnień

### Aplikacja nie pojawia się na liście

- Extension automatycznie skanuje folder `/Applications/`
- Jeśli aplikacja jest zainstalowana w innym miejscu, może nie być widoczna
- Spróbuj przeładować extension (`npm run dev`)

### Testy nie przechodzą

```bash
# Wyczyść cache i node_modules
rm -rf node_modules package-lock.json coverage
npm install
npm test
```

## Wsparcie

W razie problemów lub pytań:
1. Sprawdź logi w Raycast (Cmd+Shift+D w Raycast)
2. Uruchom testy: `npm test`
3. Sprawdź czy wszystkie zależności są zainstalowane: `npm install`

## API Reference

Extension korzysta z następujących API Raycast:
- `getApplications()` - Pobieranie listy zainstalowanych aplikacji
- `launchCommand()` - Uruchamianie komend Raycast
- `LocalStorage` - Przechowywanie aktywnych timerów
- `showToast()` / `showHUD()` - Powiadomienia

Więcej informacji: [Raycast API Documentation](https://developers.raycast.com/)
