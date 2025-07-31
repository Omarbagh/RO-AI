import { useState } from "react";

interface SummaryAIFieldProps {
  onFill: (text: string) => void; 
}

export function SummaryAIField({ onFill }: SummaryAIFieldProps) {
  const [loading, setLoading] = useState(false);

  const handleAIClick = async () => {
    const userInput = prompt("Waar moet de beschrijving over gaan?");
    if (!userInput) return;
    setLoading(true);
    const res = await fetch("/api/ai-generate", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        prompt: `Schrijf een professionele beschrijving voor een cv op basis van deze informatie: "${userInput}". Geef het antwoord als één mooie lopende tekst zonder opsommingen of enters, alleen één alinea.`,
        context: "Je bent een professionele internationale CV-schrijver."
      })
    });
    const text = await res.text();
    onFill(text); 
    setLoading(false);
  };


  return (
    <button
      type="button"
      className="text-xs px-3 py-1 rounded bg-gradient-to-r from-indigo-500 to-purple-500 text-white"
      onClick={handleAIClick}
      disabled={loading}
    >
      {loading ? "AI schrijft..." : "Laat AI genereren"}
    </button>
  );
}
