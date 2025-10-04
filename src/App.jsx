import React from "react";
import TrajectoireInteractive from "./TrajectoireInteractive";

export default function App() {
  return (
    <div className="min-h-screen">
      <TrajectoireInteractive />
      <footer className="text-center text-gray-500 text-xs mt-8 mb-4">
  Ce site respecte votre vie privée : aucune donnée personnelle, cookie ou
  traceur n’est utilisé. Statistiques anonymisées via Vercel Analytics 🌿
</footer>
    </div>
  );
}
