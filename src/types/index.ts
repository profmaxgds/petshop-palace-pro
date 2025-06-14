
// Core types for the PetShop system

export type Species = 'dog' | 'cat' | 'bird' | 'rabbit' | 'hamster' | 'other';

export interface Breed {
  id: string;
  name: string;
  species: Species;
  characteristics?: string;
  isActive: boolean;
  createdBy: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface Tutor {
  id: string;
  name: string;
  cpf?: string;
  phone?: string;
  email?: string;
  address?: {
    street?: string;
    number?: string;
    neighborhood?: string;
    city?: string;
    state?: string;
    zipCode?: string;
  };
  notes?: string;
  isActive: boolean;
  createdBy: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface Animal {
  id: string;
  name: string;
  species: Species;
  breed?: Breed;
  breedId?: string;
  age?: number;
  sex: 'male' | 'female';
  weight?: number;
  color?: string;
  microchip?: string;
  observations?: string;
  tutor: Tutor;
  tutorId: string;
  isActive: boolean;
  createdBy: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface Room {
  id: string;
  name: string;
  type: 'consultation' | 'surgery' | 'grooming' | 'other';
  capacity?: number;
  equipment?: string[];
  isActive: boolean;
  createdBy: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface Veterinarian {
  id: string;
  name: string;
  crmv: string;
  specialties?: string[];
  phone?: string;
  email?: string;
  schedule?: any;
  consultationPrice?: number;
  status: 'active' | 'inactive' | 'vacation';
  createdBy: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface ServiceType {
  id: string;
  name: string;
  category: 'consultation' | 'exam' | 'surgery' | 'grooming' | 'vaccine';
  duration: number; // in minutes
  price: number;
  description?: string;
  requiresVeterinarian: boolean;
  isActive: boolean;
  createdBy: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface Appointment {
  id: string;
  animal: Animal;
  animalId: string;
  appointmentDate: Date;
  appointmentTime: string;
  serviceType: ServiceType;
  serviceTypeId: string;
  veterinarian?: Veterinarian;
  veterinarianId?: string;
  room?: Room;
  roomId?: string;
  status: 'scheduled' | 'confirmed' | 'in_progress' | 'completed' | 'cancelled' | 'no_show';
  totalPrice?: number;
  notes?: string;
  isActive: boolean;
  createdBy: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface Vaccine {
  id: string;
  animal: Animal;
  animalId: string;
  vaccineType: string;
  brand?: string;
  batch?: string;
  applicationDate: Date;
  nextDueDate?: Date;
  veterinarian?: Veterinarian;
  veterinarianId?: string;
  price?: number;
  notes?: string;
  createdBy: string;
  createdAt: Date;
}

export interface GroomingService {
  id: string;
  animal: Animal;
  animalId: string;
  serviceDate: Date;
  serviceTime?: string;
  serviceType: ServiceType;
  serviceTypeId: string;
  room?: Room;
  roomId?: string;
  status: 'scheduled' | 'in_progress' | 'completed' | 'cancelled';
  price?: number;
  notes?: string;
  createdBy: string;
  createdAt: Date;
}

export interface User {
  id: string;
  name: string;
  email: string;
  role: 'admin' | 'veterinarian' | 'receptionist' | 'manager';
  profile?: Profile;
  profileId?: string;
  crmv?: string;
  specialties?: string[];
  consultationPrice?: number;
  isActive: boolean;
  permissions?: {
    all?: boolean;
    [key: string]: boolean | string[] | undefined;
  };
  lastLogin?: Date;
  createdAt: Date;
  updatedAt: Date;
}

export interface Profile {
  id: string;
  name: string;
  description?: string;
  permissions: {
    [key: string]: string[] | boolean;
  };
  isActive: boolean;
  isSystemProfile: boolean;
  createdBy: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface Product {
  id: string;
  name: string;
  categoryId: string;
  barcode?: string;
  quantity: number;
  minQuantity: number;
  costPrice?: number;
  salePrice?: number;
  marginPercentage?: number;
  supplierId?: string;
  expirationControl: boolean;
  description?: string;
  isActive: boolean;
  createdBy: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface ProductCategory {
  id: string;
  name: string;
  description?: string;
  isActive: boolean;
  createdBy: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface BankAccount {
  id: string;
  name: string;
  bankCode: string;
  agency: string;
  account: string;
  type: 'checking' | 'savings';
  balance: number;
  isActive: boolean;
  createdBy: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface AccountReceivable {
  id: string;
  description: string;
  dueDate: Date;
  amount: number;
  status: 'pending' | 'paid' | 'overdue';
  tutorId?: string;
  tutor?: Tutor;
  createdBy: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface CashTransaction {
  id: string;
  type: 'income' | 'expense';
  amount: number;
  description: string;
  date: Date;
  categoryId?: string;
  accountId?: string;
  createdBy: string;
  createdAt: Date;
}
