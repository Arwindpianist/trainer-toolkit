import { create } from 'zustand';
import { persist } from 'zustand/middleware';

// QR Code types
export interface QRCode {
  id: string;
  name: string;
  content: string;
  type: 'url' | 'text' | 'vcard' | 'wifi';
  createdAt: string;
  size?: number;
}

// Timer types
export interface TimerPreset {
  id: string;
  name: string;
  duration: number; // in seconds
  color?: string;
}

// Random Picker types
export interface PickerList {
  id: string;
  name: string;
  items: string[];
  createdAt: string;
}

// Note types
export interface Note {
  id: string;
  title: string;
  content: string;
  createdAt: string;
  updatedAt: string;
}

interface TrainerToolkitState {
  // QR Codes
  qrCodes: QRCode[];
  addQRCode: (qrCode: Omit<QRCode, 'id' | 'createdAt'>) => void;
  deleteQRCode: (id: string) => void;
  
  // Timer Presets
  timerPresets: TimerPreset[];
  addTimerPreset: (preset: Omit<TimerPreset, 'id'>) => void;
  deleteTimerPreset: (id: string) => void;
  
  // Picker Lists
  pickerLists: PickerList[];
  addPickerList: (list: Omit<PickerList, 'id' | 'createdAt'>) => void;
  updatePickerList: (id: string, items: string[]) => void;
  deletePickerList: (id: string) => void;
  
  // Notes
  notes: Note[];
  addNote: (note: Omit<Note, 'id' | 'createdAt' | 'updatedAt'>) => void;
  updateNote: (id: string, updates: Partial<Pick<Note, 'title' | 'content'>>) => void;
  deleteNote: (id: string) => void;
}

export const useTrainerToolkitStore = create<TrainerToolkitState>()(
  persist(
    (set, get) => ({
      // QR Codes
      qrCodes: [],
      addQRCode: (qrCode) => set((state) => ({
        qrCodes: [...state.qrCodes, {
          ...qrCode,
          id: crypto.randomUUID(),
          createdAt: new Date().toISOString(),
        }]
      })),
      deleteQRCode: (id) => set((state) => ({
        qrCodes: state.qrCodes.filter(qr => qr.id !== id)
      })),
      
      // Timer Presets
      timerPresets: [
        { id: '1', name: '5 minutes', duration: 300 },
        { id: '2', name: '10 minutes', duration: 600 },
        { id: '3', name: '15 minutes', duration: 900 },
        { id: '4', name: '30 minutes', duration: 1800 },
      ],
      addTimerPreset: (preset) => set((state) => ({
        timerPresets: [...state.timerPresets, {
          ...preset,
          id: crypto.randomUUID(),
        }]
      })),
      deleteTimerPreset: (id) => set((state) => ({
        timerPresets: state.timerPresets.filter(preset => preset.id !== id)
      })),
      
      // Picker Lists
      pickerLists: [],
      addPickerList: (list) => set((state) => ({
        pickerLists: [...state.pickerLists, {
          ...list,
          id: crypto.randomUUID(),
          createdAt: new Date().toISOString(),
        }]
      })),
      updatePickerList: (id, items) => set((state) => ({
        pickerLists: state.pickerLists.map(list => 
          list.id === id ? { ...list, items } : list
        )
      })),
      deletePickerList: (id) => set((state) => ({
        pickerLists: state.pickerLists.filter(list => list.id !== id)
      })),
      
      // Notes
      notes: [],
      addNote: (note) => set((state) => ({
        notes: [...state.notes, {
          ...note,
          id: crypto.randomUUID(),
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        }]
      })),
      updateNote: (id, updates) => set((state) => ({
        notes: state.notes.map(note => 
          note.id === id ? { 
            ...note, 
            ...updates, 
            updatedAt: new Date().toISOString() 
          } : note
        )
      })),
      deleteNote: (id) => set((state) => ({
        notes: state.notes.filter(note => note.id !== id)
      })),
    }),
    {
      name: 'trainer-toolkit-storage',
      partialize: (state) => ({
        qrCodes: state.qrCodes,
        timerPresets: state.timerPresets,
        pickerLists: state.pickerLists,
        notes: state.notes,
      }),
    }
  )
); 