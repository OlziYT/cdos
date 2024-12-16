import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, useWatch } from "react-hook-form";
import { z } from "zod";
import { useCommitteeStore } from "../../stores/committee";
import { useThemeStore } from "../../stores/theme";
import "../../styles/AddressSearch.css";
import type { ClubFormData } from "../../types/club";
import { Button } from "../ui/Button";
import { Checkbox } from "../ui/Checkbox";
import { Input } from "../ui/Input";
import { Select } from "../ui/Select";
import { TagInput } from "../ui/TagInput";
import { AddressSearch } from "./AddressSearch";

const clubSchema = z.object({
  name: z.string().min(3, "Le nom doit contenir au moins 3 caractères"),
  committeeId: z.string().min(1, "Le comité est requis"),
  siret: z.string().length(14, "Le SIRET doit contenir exactement 14 chiffres"),
  rna: z
    .string()
    .regex(/^W\d{9}$/, "Le RNA doit commencer par W suivi de 9 chiffres"),
  email: z.string().email("Adresse email invalide"),
  phone: z.string().regex(/^0[1-9]\d{8}$/, "Numéro de téléphone invalide"),
  street: z.string().min(5, "L'adresse est requise"),
  city: z.string().min(2, "La ville est requise"),
  postalCode: z.string().regex(/^\d{5}$/, "Code postal invalide"),
  tags: z.array(z.string()),
  handicapAccess: z.boolean(),
  sportHealth: z.boolean(),
});

interface ClubFormProps {
  onSubmit: (data: ClubFormData) => Promise<void>;
  isLoading: boolean;
  initialData?: ClubFormData;
}

export const ClubForm = ({ onSubmit, isLoading, initialData }: ClubFormProps) => {
  const { committees } = useCommitteeStore();
  const { isDark } = useThemeStore();

  const {
    register,
    handleSubmit,
    control,
    setValue,
    formState: { errors },
  } = useForm<ClubFormData>({
    resolver: zodResolver(clubSchema),
    defaultValues: initialData,
  });

  const handleAddressSelect = (address: {
    street: string;
    city: string;
    postal_code: string;
    validated_address: string;
    raw_coordinates: { lat: string; lon: string };
  }) => {
    setValue("street", address.street, { shouldValidate: true });
    setValue("city", address.city, { shouldValidate: true });
    setValue("postalCode", address.postal_code, { shouldValidate: true });
  };

  const street = useWatch({ control, name: "street" });

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        <Input
          label="Nom du club"
          {...register("name")}
          error={errors.name?.message}
          isDark={isDark}
        />
        <Select
          label="Comité"
          {...register("committeeId")}
          error={errors.committeeId?.message}
          isDark={isDark}
        >
          <option value="">Sélectionnez un comité</option>
          {committees.map((committee) => (
            <option key={committee.id} value={committee.id}>
              {committee.name}
            </option>
          ))}
        </Select>
        <Input
          label="Numéro SIRET"
          {...register("siret")}
          error={errors.siret?.message}
          isDark={isDark}
        />
        <Input
          label="Numéro RNA"
          {...register("rna")}
          error={errors.rna?.message}
          isDark={isDark}
        />
        <Input
          label="Email"
          type="email"
          {...register("email")}
          error={errors.email?.message}
          isDark={isDark}
        />
        <Input
          label="Téléphone"
          {...register("phone")}
          error={errors.phone?.message}
          isDark={isDark}
        />
        <div>
          <label
            className={`block text-sm font-medium ${
              isDark ? "text-gray-300" : "text-gray-700"
            }`}
          >
            Adresse
          </label>
          <AddressSearch
            onAddressSelect={handleAddressSelect}
            defaultValue={street}
            isDark={isDark}
          />
          {errors.street && (
            <p className="mt-1 text-sm text-red-600">{errors.street.message}</p>
          )}
        </div>
        <Input
          label="Ville"
          {...register("city")}
          error={errors.city?.message}
          isDark={isDark}
          readOnly
        />
        <Input
          label="Code postal"
          {...register("postalCode")}
          error={errors.postalCode?.message}
          isDark={isDark}
          readOnly
        />
        <TagInput
          name="tags"
          control={control}
          label="Mots-clés"
          error={errors.tags?.message}
          isDark={isDark}
        />
      </div>

      <div className="space-y-4">
        <div
          className={`flex items-center gap-3 ${
            isDark ? "text-gray-300" : "text-gray-700"
          }`}
        >
          <Checkbox
            {...register("handicapAccess")}
            label="Ce club dispose d'installations pour les personnes en situation de handicap"
            isDark={isDark}
          />
        </div>

        <div
          className={`flex items-center gap-3 ${
            isDark ? "text-gray-300" : "text-gray-700"
          }`}
        >
          <Checkbox
            {...register("sportHealth")}
            label="Ce club propose des programmes sport-santé"
            isDark={isDark}
          />
        </div>
      </div>

      <div className="flex justify-end gap-3">
        <Button type="submit" isLoading={isLoading} isDark={isDark}>
          {initialData ? "Modifier le club" : "Créer le club"}
        </Button>
      </div>
    </form>
  );
};
