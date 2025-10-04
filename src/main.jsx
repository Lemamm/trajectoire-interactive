import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import { injectSpeedInsights } from '@vercel/speed-insights';
import { inject } from '@vercel/analytics';

// ⚙️ Injection avec anonymisation
injectSpeedInsights({
  sampleRate: 0.5, // moins de données collectées
  endpoint: '/api/insights', // optionnel, pour auto-hébergement
});

inject({
  mode: 'auto',
  debug: false,
  consent: 'granted', // empêche collecte avant consentement
  privacy: {
    anonymizeIP: true,
    disableCookies: true,
  },
});

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
