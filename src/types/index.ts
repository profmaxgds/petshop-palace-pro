
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
  productId: string; // Relacionado ao estoque
  product?: Product;
  batch: string;
  applicationDate: Date;
  nextDueDate: Date;
  veterinarianId: string;
  veterinarian?: Veterinarian;
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
  veterinarianId: string;
  veterinarian?: Veterinarian;
  status: 'scheduled' | 'completed' | 'cancelled';
  notes?: string;
  createdAt: Date;
}

export interface GroomingService {
  id: string;
  animalId: string;
  animal?: Animal;
  date: Date;
  serviceTypeId: string;
  serviceType?: ServiceType;
  status: 'scheduled' | 'in-progress' | 'completed';
  notes?: string;
  price: number;
  createdAt: Date;
}

export interface ServiceType {
  id: string;
  name: string;
  description?: string;
  price: number;
  duration: number; // em minutos
  category: 'grooming' | 'veterinary';
  active: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface Veterinarian {
  id: string;
  name: string;
  crmv: string;
  phone: string;
  email: string;
  specialties: string[];
  active: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface Product {
  id: string;
  name: string;
  category: 'vaccine' | 'medication' | 'food' | 'accessory' | 'hygiene' | 'other';
  description?: string;
  quantity: number;
  minQuantity: number;
  costPrice: number;
  salePrice: number;
  supplier: string;
  batch?: string;
  expirationDate?: Date;
  createdAt: Date;
  updatedAt: Date;
}

export interface Purchase {
  id: string;
  supplierId: string;
  supplier?: Supplier;
  date: Date;
  items: PurchaseItem[];
  total: number;
  status: 'pending' | 'completed' | 'cancelled';
  notes?: string;
  createdAt: Date;
}

export interface PurchaseItem {
  id: string;
  productId: string;
  product?: Product;
  quantity: number;
  unitPrice: number;
  total: number;
}

export interface Supplier {
  id: string;
  name: string;
  cnpj: string;
  phone: string;
  email: string;
  address: string;
  contact: string;
  active: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface AccountPayable {
  id: string;
  description: string;
  amount: number;
  dueDate: Date;
  supplierId?: string;
  supplier?: Supplier;
  category: 'rent' | 'utilities' | 'supplies' | 'services' | 'taxes' | 'other';
  status: 'pending' | 'paid' | 'overdue';
  paymentDate?: Date;
  paymentMethod?: string;
  notes?: string;
  createdAt: Date;
}

export interface AccountReceivable {
  id: string;
  tutorId: string;
  tutor?: Tutor;
  description: string;
  amount: number;
  dueDate: Date;
  serviceDate: Date;
  paymentMethod?: string;
  status: 'pending' | 'paid' | 'overdue';
  paymentDate?: Date;
  notes?: string;
  createdAt: Date;
}

export interface CashTransaction {
  id: string;
  date: Date;
  type: 'income' | 'expense';
  amount: number;
  description: string;
  paymentMethod: 'cash' | 'card' | 'pix' | 'transfer';
  category: string;
  accountReceivableId?: string;
  accountPayableId?: string;
  createdAt: Date;
}

export interface CashFlow {
  id: string;
  date: Date;
  openingBalance: number;
  closingBalance: number;
  totalIncome: number;
  totalExpense: number;
  transactions: CashTransaction[];
  closed: boolean;
  closedBy?: string;
  closedAt?: Date;
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
