# TrainerToolkit 🎯

A lightweight, modern web application built with Next.js App Router and TypeScript, providing essential tools for presenters, trainers, and facilitators.

## ✨ Features

### 🎯 QR Code Generator
- Create QR codes for URLs, text, vCard contacts, and WiFi credentials
- Save generated codes with names and timestamps
- Download as PNG images
- Share via unique URLs (e.g., `/qr/abc123`)
- Persistent storage with localStorage

### ⏲️ Countdown Timer
- Set custom timers (5/10/15/30 minutes or manual input)
- Fullscreen display for projection
- Visual and audio alerts on time-up
- Save frequently used presets locally
- Pause, resume, and reset functionality

### 🎡 Random Picker / Spinner
- Input lists of names or items
- Spin to pick 1+ winners randomly
- Option to remove picked names after selection
- Fullscreen spinner mode
- Manage multiple lists

### 📝 Note Board / Slide Helper
- Add simple Markdown or bullet notes
- Auto-save functionality
- Fullscreen mode for displaying during sessions
- Search and organize notes
- Real-time preview with Markdown rendering

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ 
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd trainer-toolkit
```

2. Install dependencies:
```bash
npm install
```

3. Run the development server:
```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser.

## 🛠️ Tech Stack

- **Framework**: Next.js 15 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS v4
- **State Management**: Zustand with persistence
- **Icons**: Lucide React
- **QR Codes**: qrcode.react
- **Deployment**: Vercel (recommended)

## 📁 Project Structure

```
trainer-toolkit/
├── src/
│   ├── app/                 # Next.js App Router pages
│   │   ├── page.tsx         # Dashboard
│   │   ├── qr/              # QR Code Generator
│   │   ├── timer/           # Countdown Timer
│   │   ├── picker/          # Random Picker
│   │   └── notes/           # Note Board
│   ├── components/          # Reusable components
│   │   └── Header.tsx       # Shared header component
│   └── lib/                 # Utilities and stores
│       └── store.ts         # Zustand store with persistence
├── public/                  # Static assets
└── package.json
```

## 🎨 Design Features

- **Modern UI**: Clean, distraction-free interface inspired by v0, Cursor, and ChatGPT
- **Responsive Design**: Works seamlessly on desktop, tablet, and mobile
- **Offline-First**: All tools work without internet connection
- **Data Persistence**: Automatic localStorage saving across sessions
- **Fullscreen Support**: Perfect for presentations and projections

## 🔧 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint

## 🌟 Key Benefits

### For Trainers & Presenters
- **Lightning Fast**: Instant tool access with no loading delays
- **Works Offline**: All tools function without internet connection
- **Data Persistence**: Your data is saved locally and persists across sessions
- **Professional**: Clean, modern interface perfect for presentations

### For Workshop Facilitators
- **QR Code Sharing**: Quickly share resources, links, and contact information
- **Time Management**: Keep sessions on track with custom timers
- **Engagement**: Random picker for interactive activities
- **Notes**: Display key points and session materials

## 🔮 Future Features

- [ ] Audience polling tool with real-time feedback
- [ ] Custom QR styling and themes
- [ ] Export notes or poll results to PDF/CSV
- [ ] Session tagging and history view
- [ ] Supabase integration for cloud sync
- [ ] Authentication with magic link login
- [ ] Collaborative features

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- Built with [Next.js](https://nextjs.org/)
- Styled with [Tailwind CSS](https://tailwindcss.com/)
- Icons from [Lucide](https://lucide.dev/)
- QR Code generation with [qrcode.react](https://github.com/zpao/qrcode.react)

---

**TrainerToolkit** - Essential tools for modern presenters and trainers. 🎯
