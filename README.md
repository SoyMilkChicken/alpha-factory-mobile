# Alpha Factory Mobile 📱

iOS app for SEC Filing Analysis & Backtesting - ported from the Next.js web dashboard.

## Features

- 📊 **SEC Filing Viewer** - Browse 10-K and 10-Q filings
- 🔍 **Diff Analysis** - See text changes between consecutive filings with novelty scores
- 💰 **Fundamentals** - View extracted financial metrics
- 💡 **Investment Tips** - AI-generated insights (Beginner-friendly)
- 🌐 **Bilingual** - English and Mandarin Chinese support
- 🎓 **Beginner Mode** - Simplified explanations for new investors

## Tech Stack

- **Framework:** Expo SDK 50+ with Expo Router v3
- **Language:** TypeScript
- **Styling:** NativeWind (Tailwind CSS for React Native)
- **State:** React Context + AsyncStorage
- **Backend:** FastAPI (separate repository)

## Project Structure

```
alpha-factory-mobile/
├── app/                    # Expo Router screens
│   ├── (tabs)/            # Tab navigation screens
│   │   ├── _layout.tsx    # Tabs layout
│   │   ├── index.tsx      # Dashboard
│   │   ├── companies.tsx  # Companies list
│   │   ├── backtest.tsx   # Backtest runner
│   │   └── settings.tsx   # Settings
│   ├── companies/
│   │   └── [ticker].tsx   # Company detail with tabs
│   └── _layout.tsx        # Root layout
├── components/
│   └── DiffViewer.tsx     # Diff rendering component
├── contexts/
│   └── SettingsContext.tsx # App settings provider
├── lib/
│   └── i18n.ts            # Internationalization
├── types/
│   └── index.ts           # TypeScript interfaces
├── mocks/
│   └── data.ts            # Mock data for development
├── tailwind.config.js     # NativeWind config
├── app.json               # Expo config
└── package.json
```

## Getting Started

### Prerequisites

- Node.js 18+
- Expo CLI (`npm install -g expo-cli`)
- iOS Simulator (Xcode) or Expo Go app

### Installation

```bash
# Clone the repository
git clone https://github.com/SoyMilkChicken/alpha-factory-mobile.git
cd alpha-factory-mobile

# Install dependencies
npm install

# Start the development server
npx expo start
```

### Running on iOS

**Option 1: iOS Simulator (requires Mac + Xcode)**
```bash
npx expo run:ios
```

**Option 2: Expo Go app**
1. Install Expo Go from App Store
2. Run `npx expo start`
3. Scan the QR code with your iPhone camera

## Design System

### Colors
| Token | Value | Usage |
|-------|-------|-------|
| Background | `#ffffff` | Main background |
| Foreground | `#000000` | Primary text |
| Diff Added | `#dcfce7` | Added text highlight |
| Diff Removed | `#fee2e2` | Removed text highlight |

### Typography
- **System Font:** San Francisco (iOS default)
- **Monospace:** Menlo (for code/diffs)

## Screens

### Dashboard
Overview with portfolio stats and quick actions.

### Companies
Searchable list of tracked companies with filing counts.

### Company Detail
Tabbed view with:
- **Filings** - SEC filings list
- **Diffs** - Text change analysis
- **Fundamentals** - Financial metrics
- **Tips** - AI-generated insights

### Backtest
Run strategy simulations (connects to FastAPI backend).

### Settings
- Toggle Analyst/Beginner mode
- Switch language (EN/中文)
- Notification preferences

## Internationalization

Supports English and Traditional Chinese (Taiwan):

```typescript
import { useSettings } from '../contexts/SettingsContext';

function MyComponent() {
  const { t, settings } = useSettings();
  
  return <Text>{t('nav.companies')}</Text>;
  // English: "Companies"
  // Chinese: "公司"
}
```

## Building for App Store

```bash
# Install EAS CLI
npm install -g eas-cli

# Login to Expo
eas login

# Configure build
eas build:configure

# Build for iOS
eas build --platform ios

# Submit to App Store
eas submit --platform ios
```

## API Integration

The app expects a FastAPI backend at:
- Development: `http://localhost:8000`
- Production: Configure in `lib/api.ts`

See the main Alpha Factory repo for backend setup.

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

## License

MIT License

---

Built with ❤️ by Stan Feng
