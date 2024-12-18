import React, { useState } from "react";
import { Input } from "../ui/Input";

interface AddressSearchProps {
  onAddressSelect: (address: {
    street: string;
    city: string;
    postal_code: string;
    validated_address: string;
    raw_coordinates: { lat: string; lon: string };
  }) => void;
  defaultValue?: string;
  isDark?: boolean;
}

export const AddressSearch = ({
  onAddressSelect,
  defaultValue = "",
  isDark = false,
}: AddressSearchProps) => {
  const [address, setAddress] = useState(defaultValue);
  const [error, setError] = useState<string | null>(null);
  const [isValidating, setIsValidating] = useState(false);

  const validateAndSubmit = async () => {
    setError(null);
    setIsValidating(true);

    try {
      // Utiliser l'API adresse.data.gouv.fr
      const searchResponse = await fetch(
        `https://api-adresse.data.gouv.fr/search/?q=${encodeURIComponent(address)}&limit=1&postcode=81990`
      );

      if (!searchResponse.ok) {
        throw new Error("Erreur lors de la recherche de l'adresse");
      }

      const data = await searchResponse.json();

      if (!data.features || data.features.length === 0) {
        setError("Adresse non trouvée. Veuillez vérifier l'adresse saisie.");
        return;
      }

      const result = data.features[0];
      const properties = result.properties;

      // Vérifier si l'adresse est dans le Tarn (81)
      if (!properties.postcode.startsWith('81')) {
        setError("L'adresse doit être située dans le Tarn (code postal 81...)");
        return;
      }

      // Construire l'adresse finale
      const finalStreet = properties.name;
      
      onAddressSelect({
        street: finalStreet,
        city: properties.city,
        postal_code: properties.postcode,
        validated_address: `${finalStreet}, ${properties.postcode} ${properties.city}`,
        raw_coordinates: {
          lat: result.geometry.coordinates[1].toString(),
          lon: result.geometry.coordinates[0].toString(),
        },
      });
    } catch (error) {
      console.error("Erreur lors de la validation de l'adresse:", error);
      setError("Erreur lors de la validation de l'adresse");
    } finally {
      setIsValidating(false);
    }
  };

  return (
    <div className="space-y-2">
      <div className="flex gap-2">
        <Input
          type="text"
          value={address}
          onChange={(e) => {
            setAddress(e.target.value);
            setError(null);
          }}
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              validateAndSubmit();
            }
          }}
          placeholder="Saisir une adresse..."
          className="flex-1"
          isDark={isDark}
        />
        <button
          onClick={validateAndSubmit}
          disabled={isValidating}
          className={`px-4 py-2 rounded-md text-white ${
            isDark 
              ? "bg-blue-600 hover:bg-blue-700 disabled:bg-blue-800" 
              : "bg-blue-500 hover:bg-blue-600 disabled:bg-blue-400"
          }`}
        >
          {isValidating ? "Validation..." : "Valider"}
        </button>
      </div>
      {error && (
        <p className="text-sm text-red-500">
          {error}
        </p>
      )}
    </div>
  );
};
