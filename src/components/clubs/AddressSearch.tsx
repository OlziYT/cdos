import { useEffect, useState } from "react";
import { Input } from "../ui/Input";

interface Address {
  display_name: string;
  address: {
    road?: string;
    house_number?: string;
    postcode?: string;
    city?: string;
    town?: string;
    village?: string;
  };
  lat: string;
  lon: string;
}

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
  const [search, setSearch] = useState(defaultValue);
  const [suggestions, setSuggestions] = useState<Address[]>([]);
  const [loading, setLoading] = useState(false);
  const [isSelected, setIsSelected] = useState(false);

  useEffect(() => {
    const searchAddress = async () => {
      if (isSelected) {
        return;
      }

      if (search.length < 3) {
        setSuggestions([]);
        return;
      }

      setLoading(true);
      try {
        const response = await fetch(
          `https://nominatim.openstreetmap.org/search?` +
            `q=${encodeURIComponent(search + ", Tarn, France")}&` +
            `format=json&` +
            `addressdetails=1&` +
            `limit=5&` +
            `countrycodes=fr`
        );

        if (!response.ok) {
          throw new Error("Erreur réseau");
        }

        const data = await response.json();
        setSuggestions(data);
      } catch (error) {
        console.error("Erreur de recherche:", error);
      }
      setLoading(false);
    };

    const timer = setTimeout(searchAddress, 300);
    return () => clearTimeout(timer);
  }, [search, isSelected]);

  const handleSelect = (address: Address) => {
    const formattedAddress = {
      street: [address.address.house_number, address.address.road]
        .filter(Boolean)
        .join(" "),
      city:
        address.address.city ||
        address.address.town ||
        address.address.village ||
        "",
      postal_code: address.address.postcode || "",
      validated_address: address.display_name,
      raw_coordinates: {
        lat: address.lat,
        lon: address.lon,
      },
    };

    setIsSelected(true);
    onAddressSelect(formattedAddress);
    setSearch(address.display_name);
    setSuggestions([]);
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setIsSelected(false);
    setSearch(e.target.value);
  };

  return (
    <div className="address-search">
      <Input
        type="text"
        value={search}
        onChange={handleSearchChange}
        placeholder="Rechercher une adresse..."
        isDark={isDark}
      />

      {loading && <div className="loading">Recherche en cours...</div>}

      {!isSelected && suggestions.length > 0 && (
        <ul className="suggestions-list">
          {suggestions.map((address, index) => (
            <li
              key={index}
              onClick={() => handleSelect(address)}
              className="suggestion-item"
            >
              {address.display_name}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};
