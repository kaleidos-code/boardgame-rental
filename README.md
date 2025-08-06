# Brettspiel-Verleihsystem

Ein modernes, quelloffenes Brettspiel-Verleihsystem basierend auf Next.js, GraphQL und PostgreSQL. Perfekt für Spielecafés, Verleihgeschäfte und Gemeindebibliotheken, die ihr Brettspiel-Inventar und Verleihvorgänge effizient verwalten möchten.

## 🎯 Funktionen

- **Benutzerverwaltung**: Vollständige Benutzerregistrierung, Authentifizierung und rollenbasierte Zugriffskontrolle
- **Inventarverwaltung**: Hinzufügen, Bearbeiten und Verfolgen von Brettspielen mit detaillierten Informationen
- **Verleihsystem**: Umfassende Verleihverwaltung mit Buchung, Rückgabe und Verfügbarkeitsverfolgung
- **Mehrsprachige Unterstützung**: Eingebaute Internationalisierung (i18n)
- **E-Mail-Benachrichtigungen**: Automatisiertes E-Mail-System für Verleihbestätigungen und Erinnerungen
- **Moderne Benutzeroberfläche**: Saubere, responsive Oberfläche mit Mantine UI-Komponenten
- **GraphQL API**: Typsichere, effiziente API mit Apollo GraphQL
- **Datenbank**: PostgreSQL mit Prisma ORM für zuverlässige Datenverwaltung

## 🛠 Technologie-Stack

- **Frontend**: Next.js 14, React 18, TypeScript
- **Backend**: GraphQL mit Type-GraphQL, Apollo Server
- **Datenbank**: PostgreSQL mit Prisma ORM
- **Authentifizierung**: NextAuth.js
- **UI Framework**: Mantine UI
- **Styling**: SCSS, PostCSS
- **E-Mail**: React Email mit Nodemailer
- **Entwicklung**: Docker, ESLint, Husky

## 📋 Voraussetzungen

Stellen Sie vor dem Start sicher, dass Folgendes installiert ist:

- Node.js (>= 18.17.0)
- Yarn (>= 4.2.2)
- Docker und Docker Compose
- Git

## 🚀 Erste Schritte

### 1. Repository klonen

```bash
git clone https://github.com/your-username/web-boardgame-rental-open-source.git
cd web-boardgame-rental-open-source
```

### 2. Abhängigkeiten installieren

```bash
yarn install
```

### 3. Umgebung einrichten

Kopieren Sie die Beispiel-Umgebungsdatei und konfigurieren Sie Ihre Einstellungen:

```bash
cp env.example .env
```

Bearbeiten Sie die `.env` Datei mit Ihrer spezifischen Konfiguration:

```env
# Datenbank-Konfiguration
POSTGRES_USER=ihr_benutzer
POSTGRES_PASSWORD=ihr_passwort
POSTGRES_DB=boardgame_rental

# Anwendungseinstellungen
APP_URL=http://localhost:3000
APP_NAME='Brettspiel Verleihsystem'

# E-Mail-Konfiguration
MAIL_FROM_EMAIL=noreply@ihredomain.de
MAIL_HOST=ihr_smtp_host
MAIL_USER=ihr_smtp_benutzer
MAIL_PASSWORD=ihr_smtp_passwort

# Authentifizierung
NEXTAUTH_SECRET=ihr_nextauth_secret
NEXTAUTH_URL=http://localhost:3000
```

### 4. Datenbank starten

**Wichtig**: Sie müssen den Datenbank-Container vor dem Entwicklungsserver starten:

```bash
yarn docker:dev
```

Dieser Befehl startet einen PostgreSQL-Container mit Docker Compose.

### 5. Datenbank einrichten

Prisma Client generieren und Migrationen ausführen:

```bash
yarn prisma:generate
npx prisma migrate deploy
```

### 6. Datenbank befüllen

Befüllen Sie die Datenbank mit Anfangsdaten einschließlich Rollen, Berechtigungen und Beispielbenutzern:

```bash
yarn seed
```

Dies erstellt:
- Standard-Benutzerrollen und Berechtigungen
- Beispiel-Benutzerkonten
- Beispiel-Brettspieldaten (falls verfügbar)

### 7. Entwicklungsserver starten

```bash
yarn dev
```

Öffnen Sie [http://localhost:3000](http://localhost:3000) in Ihrem Browser, um die Anwendung zu sehen.

## 📁 Projektstruktur

```
├── prisma/              # Datenbankschema und Migrationen
│   ├── schema.prisma    # Prisma Schema-Definition
│   ├── migrations/      # Datenbankmigrationen
│   └── seeds/          # Datenbank-Seed-Dateien
├── src/
│   ├── app/            # Next.js App-Verzeichnis (Seiten und Layouts)
│   ├── api/            # API-Route-Handler
│   ├── features/       # Feature-basierte Komponenten und Logik
│   ├── graphql/        # GraphQL-Schema und Resolver
│   ├── hooks/          # Benutzerdefinierte React-Hooks
│   ├── services/       # Geschäftslogik und externe Services
│   ├── shared/         # Geteilte Komponenten und Utilities
│   ├── theme/          # Mantine Theme-Konfiguration
│   └── locales/        # Internationalisierungsdateien
├── docker-compose.db.yml # Datenbank-Container-Konfiguration
└── package.json        # Projektabhängigkeiten und Scripts
```

## 🗄️ Datenbank

Die Anwendung verwendet PostgreSQL als primäre Datenbank mit Prisma als ORM. Die Datenbank enthält Tabellen für:

- Benutzer und Authentifizierung
- Rollen und Berechtigungen
- Brettspiel-Inventar
- Verleih-Transaktionen
- E-Mail-Benachrichtigungen
- Systemeinstellungen

## 🎨 Entwicklung

### Verfügbare Scripts

**Entwicklung:**
- `yarn dev` - Entwicklungsserver starten
- `yarn docker:dev` - Nur den Datenbank-Container starten
- `yarn seed` - Datenbank mit Anfangsdaten befüllen
- `yarn email:dev` - E-Mail-Entwicklungsserver starten

**Produktion & Docker:**
- `yarn build` - Anwendung für Produktion bauen
- `yarn start` - Produktionsserver starten
- `yarn docker:build` - Docker-Image bauen
- `yarn docker:app` - App + Datenbank starten
- `yarn docker:full` - Gleich wie docker:app (für Kompatibilität)
- `yarn docker:down` - Alle Docker-Services stoppen
- `yarn docker:logs` - Logs aller Container anzeigen

**Entwicklungstools:**
- `yarn lint` - ESLint ausführen
- `yarn codegen` - GraphQL-Typen generieren

### Code-Generierung

Das Projekt verwendet GraphQL Code Generator, um TypeScript-Typen aus dem GraphQL-Schema zu erstellen:

```bash
yarn codegen
```

### E-Mail-Entwicklung

Zur Entwicklung und Vorschau von E-Mails:

```bash
yarn email:dev
```

Dies startet einen Entwicklungsserver auf `http://localhost:3001` zur Vorschau von E-Mail-Templates.

## 🔐 Authentifizierung & Autorisierung

Das System beinhaltet ein umfassendes rollenbasiertes Zugriffskontrollsystem:

- **Admin**: Vollzugriff auf das System
- **Renter**: Inventar- und Verleihverwaltung
- **User**: Self-Service-Verleihbuchung

## 🌍 Internationalisierung

Die Anwendung unterstützt mehrere Sprachen standardmäßig. Sprachdateien befinden sich in `src/locales/`.

## 🚀 Deployment

### Option 1: Traditionelles Deployment

```bash
yarn build
yarn start
```

### Option 2: Docker Deployment (Empfohlen)

#### Entwicklung mit Docker
```bash
# Nur die Datenbank starten
yarn docker:dev

# Dann die App lokal ausführen
yarn dev
```

#### Produktions-Setup
```bash
# App mit Datenbank bauen und starten
yarn docker:app

# Logs überprüfen
yarn docker:logs

# Services stoppen
yarn docker:down
```

**Wichtige Hinweise:**
- Erstellen Sie eine `.env.production` Datei für Produktions-Umgebungsvariablen
- Die App ist unter `http://localhost:3000` verfügbar
- Datenbankdaten werden in Docker-Volumes persistiert
- Für automatisierte geplante Aufgaben, deployen Sie den separaten Scheduler-Service

## 🕒 Geplante Aufgaben & Cron Jobs

Die Anwendung enthält eingebaute Cron-Job-Endpunkte für automatisierte Aufgaben:

### Verfügbare Cron-Endpunkte

- **`/api/cron/dueDate`** - Verarbeitet überfällige Verleihvorgänge und sendet Benachrichtigungen
- **`/api/cron/orphans`** - Bereinigt verwaiste Daten und erhält die Datenbankintegrität

### Manuelles Auslösen

Sie können diese Cron-Jobs manuell auslösen, indem Sie POST-Anfragen an die Endpunkte senden:

```bash
# Fälligkeitsdatum-Verarbeitung auslösen
curl -X POST http://localhost:3000/api/cron/dueDate \
  -H "Authorization: Bearer IHR_CRON_SECRET"

# Waisen-Bereinigung auslösen
curl -X POST http://localhost:3000/api/cron/orphans \
  -H "Authorization: Bearer IHR_CRON_SECRET"
```

**Sicherheit**: Die Cron-Endpunkte sind durch die `CRON_SECRET` Umgebungsvariable geschützt.

### Externer Scheduler

Für automatisierte Ausführung empfehlen wir die Verwendung des separaten Scheduler-Services:

#### Verwandte Projekte
- **Scheduler**: [board-game-rental-scheduler](https://github.com/your-org/board-game-rental-scheduler) (separates Repository)

Der Scheduler-Service kann konfiguriert werden, um diese Endpunkte in regelmäßigen Abständen aufzurufen (z.B. täglich für Fälligkeitsprüfungen, wöchentlich für Waisen-Bereinigung).

## 📄 Lizenz

Dieses Projekt ist unter der MIT-Lizenz lizenziert - siehe die [LICENSE](LICENSE) Datei für Details.

## 🆘 Support

Falls Sie auf Probleme stoßen oder Fragen haben:

1. Überprüfen Sie die [Issues](https://github.com/your-username/web-boardgame-rental-open-source/issues) Seite
2. Erstellen Sie ein neues Issue, falls Ihr Problem noch nicht behandelt wurde
3. Geben Sie detaillierte Informationen über Ihre Umgebung und das Problem an

## 🙏 Danksagungen

- Erstellt mit [Next.js](https://nextjs.org/)
- UI-Komponenten von [Mantine](https://mantine.dev/)
- Datenbankverwaltung mit [Prisma](https://prisma.io/)
- Icons von [Material Icons](https://material.io/icons/)

---

**Mit ❤️ erstellt von [kaleidos:code GmbH](https://kaleidoscode.de)**
