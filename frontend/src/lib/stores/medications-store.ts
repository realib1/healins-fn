import { create } from 'zustand';
import { api } from '../api';

export interface Medication {
  id: string;
  name: string;
  dose: string;
  frequency: string;
  startDate: string;
  endDate?: string | null;
  clinicianId?: string | null;
  indication?: string | null;
}

interface MedicationsState {
  medications: Record<string, Medication[]>;
  isLoading: boolean;
  error: string | null;
  fetchMedications: (patientId: string) => Promise<void>;
  addMedication: (patientId: string, med: Omit<Medication, 'id'>) => Promise<void>;
}

export const useMedicationsStore = create<MedicationsState>((set, get) => ({
  medications: {},
  isLoading: false,
  error: null,

  fetchMedications: async (patientId: string) => {
    set({ isLoading: true, error: null });
    try {
      const data = await api.get<Medication[]>(`medications/patient/${patientId}`);
      set((state) => ({
        medications: {
          ...state.medications,
          [patientId]: data,
        },
        isLoading: false,
      }));
    } catch (err: any) {
      set({ error: err.message, isLoading: false });
    }
  },

  addMedication: async (patientId: string, med: Omit<Medication, 'id'>) => {
    set({ isLoading: true, error: null });
    try {
      const newMed = await api.post<Medication>('medications', { ...med, patientId });
      set((state) => {
        const current = state.medications[patientId] || [];
        return {
          medications: {
            ...state.medications,
            [patientId]: [newMed, ...current],
          },
          isLoading: false,
        };
      });
    } catch (err: any) {
      set({ error: err.message, isLoading: false });
    }
  },
}));
