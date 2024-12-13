import { useState } from "react";
import { Club } from "../services/club";
import "../styles/AddressSearch.css";
import { AddressSearch } from "./AddressSearch";

export const ClubForm = () => {
  const [formData, setFormData] = useState<Omit<Club, "id" | "location">>({
    name: "",
    committee_id: "",
    siret: "",
    rna: "",
    email: "",
    phone: "",
    street: "",
    city: "",
    postal_code: "",
    tags: [],
    handicap_access: false,
    sport_health: false,
    total_members: 0,
  });

  const handleAddressSelect = (address) => {
    setFormData((prev) => ({
      ...prev,
      street: address.street,
      city: address.city,
      postal_code: address.postal_code,
      validated_address: address.validated_address,
      raw_coordinates: address.raw_coordinates,
    }));
  };

  return (
    <div className="club-form">
      <h1>Nouveau Club</h1>
      <p>Créer un nouveau club sportif dans le département du Tarn.</p>

      <form>
        <div>
          <label>Nom du club</label>
          <input
            type="text"
            value={formData.name}
            onChange={(e) =>
              setFormData((prev) => ({ ...prev, name: e.target.value }))
            }
          />
        </div>

        <div>
          <label>Comité</label>
          <select
            value={formData.committee_id}
            onChange={(e) =>
              setFormData((prev) => ({ ...prev, committee_id: e.target.value }))
            }
          >
            <option value="">Sélectionnez un comité</option>
            {/* Options des comités */}
          </select>
        </div>

        <div>
          <label>Numéro SIRET</label>
          <input
            type="text"
            value={formData.siret}
            onChange={(e) =>
              setFormData((prev) => ({ ...prev, siret: e.target.value }))
            }
          />
        </div>

        <div>
          <label>Numéro RNA</label>
          <input
            type="text"
            value={formData.rna}
            onChange={(e) =>
              setFormData((prev) => ({ ...prev, rna: e.target.value }))
            }
          />
        </div>

        <div>
          <label>Email</label>
          <input
            type="email"
            value={formData.email}
            onChange={(e) =>
              setFormData((prev) => ({ ...prev, email: e.target.value }))
            }
          />
        </div>

        <div>
          <label>Téléphone</label>
          <input
            type="tel"
            value={formData.phone}
            onChange={(e) =>
              setFormData((prev) => ({ ...prev, phone: e.target.value }))
            }
          />
        </div>

        <div>
          <label>Adresse</label>
          <AddressSearch
            onAddressSelect={handleAddressSelect}
            defaultValue={formData.street}
          />
        </div>

        <div>
          <label>Ville</label>
          <input type="text" value={formData.city} readOnly />
        </div>

        <div>
          <label>Code postal</label>
          <input type="text" value={formData.postal_code} readOnly />
        </div>

        <div>
          <label>Mots-clés</label>
          {/* Implémentation des tags */}
        </div>

        <div>
          <label>
            <input
              type="checkbox"
              checked={formData.handicap_access}
              onChange={(e) =>
                setFormData((prev) => ({
                  ...prev,
                  handicap_access: e.target.checked,
                }))
              }
            />
            Ce club dispose d'installations pour les personnes en situation de
            handicap
          </label>
        </div>

        <div>
          <label>
            <input
              type="checkbox"
              checked={formData.sport_health}
              onChange={(e) =>
                setFormData((prev) => ({
                  ...prev,
                  sport_health: e.target.checked,
                }))
              }
            />
            Ce club propose des programmes sport-santé
          </label>
        </div>

        <button type="submit">Créer le club</button>
      </form>
    </div>
  );
};
