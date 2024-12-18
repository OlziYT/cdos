import React, { useState } from "react";

interface AddressSearchProps {
  defaultValue?: string;
  onAddressSelect: (address: {
    street: string;
    city: string;
    postal_code: string;
    validated_address: string;
    raw_coordinates?: {
      lat: string;
      lon: string;
    };
  }) => void;
}

export const AddressSearch: React.FC<AddressSearchProps> = ({
  defaultValue = "",
  onAddressSelect,
}) => {
  const [address, setAddress] = useState(defaultValue);

  const handleSubmit = () => {
    // Envoyer l'adresse exactement comme elle a été saisie
    onAddressSelect({
      street: address,
      city: "",  // Ces champs sont vides car nous gardons l'adresse complète dans street
      postal_code: "",
      validated_address: address,
      raw_coordinates: {
        lat: "0",  // Coordonnées par défaut
        lon: "0"
      }
    });
  };

  return (
    <div className="address-search">
      <div className="input-container" style={{ display: 'flex', gap: '8px' }}>
        <input
          type="text"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              handleSubmit();
            }
          }}
          placeholder="Saisir une adresse..."
          className="address-input"
          style={{ flex: 1 }}
        />
        <button
          onClick={handleSubmit}
          className="submit-button"
          style={{
            padding: '8px 16px',
            backgroundColor: '#4CAF50',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer'
          }}
        >
          Valider
        </button>
      </div>
    </div>
  );
};
