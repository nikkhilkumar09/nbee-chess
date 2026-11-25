# NBee Chess – Multiplayer Chess Platform

---

## 1. Project Vision
Build a polished, cross-platform chess platform for web and mobile, combining standard chess gameplay, AI opponents, real-time multiplayer, social features, creative interactions, and intelligent chess assistance.

---

## 2. Technology Stack
- **Web**: React.js (JavaScript)
- **Routing**: react-router-dom
- **Styling**: Tailwind CSS + Vanilla Global CSS (for custom animations, effects & root tokens)
- **State Management**: Zustand
- **Mobile**: React Native
- **Backend**: Node.js, Express.js (JavaScript)
- **Database**: MongoDB
- **Real-time**: Socket.IO
- **Chess Engine**: chess.js
- **3D**: Three.js, React Three Fiber, Drei
- **AI**: LLM, RAG, Generative AI

### Frontend Architecture & Folder Structure
```text
client/src/
├── assets/             # Chess SVGs, piece themes, icons, audio files
├── components/         # Reusable UI elements (Navbar, Modal, Button, Clock)
├── game/               # Pure chess rules & helper algorithms
│   ├── engine.js       # chess.js wrapper & move validation
│   └── constants.js    # Starting positions, piece values
├── hooks/              # Custom React hooks (useClock.js, useSocketEvents.js)
├── pages/              # Screen views (LobbyPage.jsx, GamePage.jsx, LoginPage.jsx)
├── services/           # External world communication & subsystems
│   ├── api/
│   │   ├── client.js   # Global Base URL, default headers & JWT interceptor
│   │   ├── authApi.js  # Auth endpoints (login, register, guestLogin)
│   │   └── gameApi.js  # Game endpoints (history, leaderboards, puzzles)
│   ├── socket/
│   │   └── socketClient.js # Socket.IO connection instance & emitters
│   ├── audio/
│   │   └── soundService.js # Game audio manager (moves, captures, check alerts)
│   └── storage/
│       └── localStorage.js # Safe browser storage helpers
├── store/              # Domain-specific Zustand stores
│   ├── useAuthStore.js # User profile, token, guest status
│   ├── useGameStore.js # Active game FEN, turn, clocks, move history
│   └── useUIStore.js   # Board themes, volume, mute toggle, active modals
├── App.jsx             # Main router & layout shell
├── index.css           # Global CSS & Tailwind directives
└── main.jsx            # React root entry
```

### Backend Architecture & Folder Structure
```text
server/
├── src/
│   ├── config/             # DB connection, env variables, CORS setup
│   │   ├── db.js           # Mongoose MongoDB connection
│   │   └── env.js          # Validated environment variables (PORT, MONGO_URI, JWT_SECRET)
│   ├── constants/          # Status codes, game states, socket event names
│   ├── controllers/        # HTTP Request/Response handlers
│   │   ├── authController.js
│   │   ├── gameController.js
│   │   └── userController.js
│   ├── middlewares/        # Express middlewares (JWT auth, error handler, rate limit)
│   │   ├── authMiddleware.js
│   │   └── errorMiddleware.js
│   ├── models/             # Mongoose schemas & data models
│   │   ├── userModel.js    # User credentials and profile
│   │   └── gameModel.js    # Stored matches, move history, players, results
│   ├── routes/             # Express API route declarations
│   │   ├── authRoutes.js
│   │   ├── gameRoutes.js
│   │   └── userRoutes.js
│   ├── services/           # Reusable business logic (shared between HTTP & WebSockets)
│   │   ├── authService.js         # Login, register, token generation, guest ID
│   │   ├── chessEngineService.js  # Server-authoritative move validation via chess.js
│   │   ├── gameService.js         # Matchmaking, room management, ELO updates
│   │   └── userService.js         # Profile and leaderboard queries
│   ├── sockets/            # Real-time Socket.IO event handlers
│   │   ├── socketManager.js       # Main socket connection & room routing
│   │   └── gameSocketHandler.js   # Live move sync, server-authoritative clock delta
│   └── app.js              # Express application configuration & middleware stack
├── server.js               # Entry point: HTTP server + Socket.IO server + DB connect
└── package.json
```

### Backend Architectural Decisions
- **Architecture Pattern**: Controller-Service-Model architecture with strict separation between HTTP transport and business logic.
- **Shared Game Logic**: Sockets and HTTP routes share the same `chessEngineService.js` and `gameService.js`.
- **Authentication**: JWT (JSON Web Tokens) with 1-click Guest mode (instant play) and persistent user accounts.
- **Database**: MongoDB with Mongoose (schemas for Users, Games, and Match History).
- **Multiplayer & Networking**: Socket.IO room-based matches (`game:<id>`) with server-authoritative move validation and latency-compensated server clocks.

---

## 3. Core Features
- Complete chess rules: legal moves, check, checkmate, stalemate, castling, en passant and promotion.
- Interactive 2D/3D boards with drag-and-drop, click-to-move and legal move hints.
- Single-player mode with AI difficulties: Noob, Easy, Medium, Hard and Expert.
- Online multiplayer, random matchmaking, private rooms and friend invitations.
- Friend lists, real-time chat, online presence and game notifications.
- Chess clocks: Bullet, Blitz, Rapid and Classical.
- Profiles, basic statistics (wins/losses/draws), and achievements (ELO/rating deferred).
- Game history, PGN, replay, spectators, draw offers, resignations and rematches.
- Daily puzzles, tactical challenges, puzzle streaks and blindfold chess.
- Reconnection and recovery after network interruptions.

---

## 4. Creative & Entertainment Features
Make chess more fun through:
- AI opponents with unique personalities, playing styles and funny reactions.
- Sarcastic commentary, humorous celebrations and unexpected AI behaviour.
- Dramatic captures, check/checkmate effects, animations and sound effects.
- Custom boards, piece themes and expressive piece interactions.
- Creative game modes, historical chess personalities, easter eggs and seasonal events.

*Keep these features optional and preserve fair chess rules and competitive integrity.*

---

## 5. AI & Generative AI
Build an AI chess assistant that can:
- Explain moves, openings, mistakes and missed opportunities.
- Suggest better moves with beginner-friendly explanations.
- Detect blunders and provide post-game analysis.
- Create personalized improvement plans.
- Answer chess questions using RAG.
- Generate entertaining match commentary.

*Use a chess engine for move generation and position evaluation; use LLMs for explanations, personality and conversation.*

---

## 6. Technical Engineering
Focus on scalable architecture, secure authentication, server-authoritative move validation, real-time synchronization, event-driven communication, accurate server-side clocks, latency handling, concurrency, consistent APIs and reliable game-state management.

---

## 7. Development Roadmap
Build progressively, following a professional development workflow:
1. Architecture and technology decisions.
2. Repository setup and folder structure.
3. Web setup, CSS framework and styling architecture.
4. Chessboard UI and piece rendering.
5. Chess engine and move validation.
6. State management and chess clocks.
7. Single-player mode and AI opponents.
8. Backend, APIs and database schema.
9. Authentication and player profiles.
10. WebSocket communication and multiplayer synchronization.
11. Matchmaking, private rooms and invitations.
12. Friends, chat and online presence.
13. History, rankings and leaderboards.
14. 3D board, animations and sound.
15. LLM, RAG and AI assistant.
16. React Native mobile application.
17. Testing, security and optimization.
18. Deployment, monitoring and scalability.

---

## 8. Code Quality
- **Minimal & Essential Code Only**: Write minimal, concise, and focused code. Do not add unnecessary boilerplate, over-engineering, or extra fluff that causes confusion. Keep every file short, clean, readable, and strictly purposeful.
- Use clean, modern JavaScript (ES6+), clean architecture, reusable components, modular services, proper error handling, logging and automated tests.
- Separate chess logic, UI, game state and networking.
- Run Prettier before finalizing:
  ```bash
  npx prettier --write .
  ```

---

## 9. Step-by-Step Development Approach
Do not generate the entire codebase at once or skip ahead.
First, prepare the complete roadmap and make essential architectural decisions covering folder structure, styling, state management, packages, chess engine, rendering, APIs, database, authentication, multiplayer, AI, testing and deployment.

**For every step:**
1. Explain what we are building and why.
2. Compare available approaches and recommend one.
3. Explain important packages and architectural decisions.
4. Show the required folder and file structure.
5. Let me implement and understand the code.
6. Review my implementation and explain corrections.
7. Move forward only after completing the current step.

*Treat this as a real-world professional development project, not a code-generation exercise. Help me understand the reasoning behind every decision.*

---

## 10. Creative Freedom
Think beyond traditional chess. Proactively suggest unusual, funny and innovative features, even if they sound crazy. Explain how each idea works, its technical complexity and whether it belongs in the MVP or a future release.
Keep the core chess experience fair, reliable and enjoyable.

---

## Final Goal
Build NBee Chess into a technically impressive, scalable and entertaining cross-platform chess platform that demonstrates strong software engineering, real-time systems, AI integration and creative product thinking—and is genuinely enjoyable to play.

**Try something new like funny/exaggerate playing to hook users.**
