import { create } from 'zustand';
import { SpecializationList } from '@/components/specializations/specialization-list';

interface Specialization {
  id: string;
  name: string;
  description: string;
  status: 'active' | 'inactive';
}

interface SpecializationStore {
  specializations: Specialization[];
  addSpecialization: (specialization: Specialization) => void;
  updateSpecialization: (id: string, data: Partial<Specialization>) => void;
  deleteSpecialization: (id: string) => void;
}

const useSpecializationStore = create<SpecializationStore>((set) => ({
  specializations: [],
  addSpecialization: (specialization) =>
    set((state) => ({
      specializations: [...state.specializations, specialization],
    })),
  updateSpecialization: (id, data) =>
    set((state) => ({
      specializations: state.specializations.map((s) =>
        s.id === id ? { ...s, ...data } : s
      ),
    })),
  deleteSpecialization: (id) =>
    set((state) => ({
      specializations: state.specializations.filter((s) => s.id !== id),
    })),
}));

export default function SpecializationsPage() {
  const specializations = useSpecializationStore((state) => state.specializations);

  return (
    <div className="container mx-auto py-6">
      <h1 className="text-3xl font-bold mb-6">Especialidades</h1>
      <SpecializationList specializations={specializations} />
    </div>
  );
} 