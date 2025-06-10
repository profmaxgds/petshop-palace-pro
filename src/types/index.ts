export interface Tutor {
  id: string;
  name: string;
  cpf: string;
  phone: string;
  email: string;
  address: {
    street: string;
    number: string;
    neighborhood: string;
    city: string;
    state: string;
    zipCode: string;
  };
  createdAt: Date;
  updatedAt: Date;
}

export interface Animal {
  id: string;
  name: string;
  species: string;
  breed: string;
  age: number;
  sex: 'male' | 'female';
  weight: number;
  tutorId: string;
  tutor?: Tutor;
  createdAt: Date;
  updatedAt: Date;
}

export interface Vaccine {
  id: string;
  animalId: string;
  animal?: Animal;
  type: string;
  batch: string; // Campo lote adicionado
  applicationDate: Date;
  nextDueDate: Date;
  veterinarian: string;
  notes?: string;
  createdAt: Date;
}

export interface Appointment {
  id: string;
  animalId: string;
  animal?: Animal;
  date: Date;
  time: string;
  type: 'consultation' | 'exam' | 'surgery' | 'grooming';
  serviceTypeId?: string;
  serviceType?: ServiceType;
  veterinarianId?: string;
  veterinarian: string;
  status: 'scheduled' | 'completed' | 'cancelled';
  notes?: string;
  createdAt: Date;
}

export interface GroomingService {
  id: string;
  animalId: string;
  animal?: Animal;
  date: Date;
  serviceType: string;
  status: 'scheduled' | 'in-progress' | 'completed';
  notes?: string;
  price: number;
  createdAt: Date;
}

export interface Product {
  id: string;
  name: string;
  category: string;
  quantity: number;
  minQuantity: number;
  costPrice: number;
  salePrice: number;
  supplier: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface Purchase {
  id: string;
  supplierId: string;
  date: Date;
  items: PurchaseItem[];
  total: number;
  status: 'pending' | 'completed';
  createdAt: Date;
}

export interface PurchaseItem {
  productId: string;
  product?: Product;
  quantity: number;
  unitPrice: number;
  total: number;
}

export interface AccountPayable {
  id: string;
  description: string;
  amount: number;
  dueDate: Date;
  supplier: string;
  category: string;
  status: 'pending' | 'paid' | 'overdue';
  paymentDate?: Date;
  createdAt: Date;
}

export interface AccountReceivable {
  id: string;
  tutorId: string;
  tutor?: Tutor;
  description: string;
  amount: number;
  dueDate: Date;
  paymentMethod: string;
  status: 'pending' | 'paid' | 'overdue';
  paymentDate?: Date;
  createdAt: Date;
}

export interface CashTransaction {
  id: string;
  date: Date;
  type: 'income' | 'expense';
  amount: number;
  description: string;
  paymentMethod: string;
  category: string;
  createdAt: Date;
}

export interface BankAccount {
  id: string;
  bank: string;
  agency: string;
  account: string;
  holder: string;
  balance: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface User {
  id: string;
  name: string;
  email: string;
  role: 'admin' | 'veterinarian' | 'receptionist';
  createdAt: Date;
}

export interface Veterinarian {
  id: string;
  name: string;
  crmv: string;
  specialties: string[];
  phone: string;
  email: string;
  status: 'active' | 'inactive';
  createdAt: Date;
  updatedAt: Date;
}

export interface ServiceType {
  id: string;
  name: string;
  category: 'consultation' | 'exam' | 'surgery' | 'grooming';
  duration: number; // em minutos
  price: number;
  description?: string;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}
