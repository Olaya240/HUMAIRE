# HUMAIRE Frontend Client

This is the frontend client for the **HUMAIRE** platform, a human-first ethical AI tool. It is built with React, Tailwind CSS, and heavy focus on a premium, minimalist user interface.

## 🛠️ Tech Stack

-   **Framework**: [React](https://reactjs.org/) (Vite)
-   **Styling**: [Tailwind CSS](https://tailwindcss.com/)
-   **Icons**: [Lucide React](https://lucide.dev/)
-   **UI Components**: [Radix UI](https://www.radix-ui.com/) (Primitives) & Custom Components
-   **HTTP Client**: Axios

## 🚀 Getting Started

### Prerequisites

-   Node.js (v16 or higher)
-   npm or yarn

### Installation

1.  Navigate to the frontend directory:
    ```bash
    cd frontend
    ```
2.  Install dependencies:
    ```bash
    npm install
    ```

### Development

Start the local development server:

```bash
npm run dev
```

The application will be available at `http://localhost:5173` (or the port shown in your terminal).

### Building for Production

To build the application for deployment:

```bash
npm run build
```

## 📂 Project Structure

```
frontend/
├── src/
│   ├── app/
│   │   ├── components/    # Reusable UI components (Header, Buttons, etc.)
│   │   ├── pages/         # Page components (Landing, Dashboard, etc.)
│   │   └── services/      # API services (auth, analysis endpoints)
│   ├── contexts/          # React Contexts (AuthContext)
│   ├── styles/            # Global styles (index.css, theme.css, fonts.css)
│   └── App.jsx            # Main App entry point
├── public/                # Static assets
└── vite.config.js         # Vite configuration
```

## 🎨 Key Features

-   **Ultra-Minimal Design**: Establishing a premium, distraction-free environment.
-   **Ethical AI Feedback**: Visual components for displaying bias warnings and rewrite suggestions.
-   **Interactive Uploads**: specialized file upload with drag-and-drop support.
-   **Animated UI**: Subtle slide-ups and fade-ins for a modern feel.

## 🤝 Contribution

This project follows strict design guidelines. Please ensure any new components match the existing "Premium Minimal" aesthetic defined in `styles/theme.css`.