
export interface User {
  id: string;
  name: string;
  email: string;
  role: 'admin' | 'veterinarian' | 'receptionist' | 'manager';
  permissions: Record<string, string[] | boolean>;
  isActive: boolean;
  lastLogin?: Date;
  createdAt: Date;
  updatedAt: Date;
}

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
  notes?: string;
  isActive: boolean;
  createdBy: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface Animal {
  id: string;
  name: string;
  species: 'dog' | 'cat' | 'bird' | 'rabbit' | 'hamster' | 'other';
  breed: string;
  age: number;
  sex: 'male' | 'female';
  weight: number;
  color?: string;
  microchip?: string;
  observations?: string;
  tutorId: string;
  tutor?: Tutor;
  isActive: boolean;
  createdBy: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface Veterinarian {
  id: string;
  name: string;
  crmv: string;
  specialties: string[];
  phone: string;
  email: string;
  schedule?: Record<string, any>;
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
  duration: number; // em minutos
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
  animalId: string;
  animal?: Animal;
  appointmentDate: Date;
  appointmentTime: string;
  serviceTypeId: string;
  serviceType?: ServiceType;
  veterinarianId?: string;
  veterinarian?: Veterinarian;
  status: 'scheduled' | 'confirmed' | 'in_progress' | 'completed' | 'cancelled' | 'no_show';
  totalPrice?: number;
  notes?: string;
  createdBy: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface Vaccine {
  id: string;
  animalId: string;
  animal?: Animal;
  vaccineType: string;
  brand?: string;
  batch?: string;
  applicationDate: Date;
  nextDueDate?: Date;
  veterinarianId?: string;
  veterinarian?: Veterinarian;
  price?: number;
  notes?: string;
  createdBy: string;
  createdAt: Date;
}

export interface GroomingService {
  id: string;
  animalId: string;
  animal?: Animal;
  serviceDate: Date;
  serviceTime?: string;
  serviceTypeId: string;
  serviceType?: ServiceType;
  status: 'scheduled' | 'in_progress' | 'completed' | 'cancelled';
  price?: number;
  notes?: string;
  createdBy: string;
  createdAt: Date;
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

export interface Supplier {
  id: string;
  name: string;
  cnpj?: string;
  phone?: string;
  email?: string;
  contactPerson?: string;
  address?: string;
  isActive: boolean;
  createdBy: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface Product {
  id: string;
  name: string;
  categoryId: string;
  category?: ProductCategory;
  barcode?: string;
  quantity: number;
  minQuantity: number;
  costPrice?: number;
  salePrice?: number;
  marginPercentage?: number;
  supplierId?: string;
  supplier?: Supplier;
  expirationControl: boolean;
  description?: string;
  isActive: boolean;
  createdBy: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface Purchase {
  id: string;
  supplierId: string;
  supplier?: Supplier;
  purchaseDate: Date;
  invoiceNumber?: string;
  items: PurchaseItem[];
  total: number;
  status: 'pending' | 'received' | 'completed' | 'cancelled';
  notes?: string;
  createdBy: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface PurchaseItem {
  id: string;
  purchaseId: string;
  productId: string;
  product?: Product;
  quantity: number;
  unitPrice: number;
  total: number;
  expirationDate?: Date;
  createdAt: Date;
}

export interface AccountPayable {
  id: string;
  description: string;
  amount: number;
  dueDate: Date;
  supplierId?: string;
  supplier?: Supplier;
  category?: string;
  status: 'pending' | 'paid' | 'overdue' | 'cancelled';
  paymentDate?: Date;
  paymentMethod?: string;
  purchaseId?: string;
  purchase?: Purchase;
  createdBy: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface AccountReceivable {
  id: string;
  tutorId: string;
  tutor?: Tutor;
  description: string;
  amount: number;
  dueDate: Date;
  paymentMethod?: string;
  status: 'pending' | 'paid' | 'overdue' | 'cancelled';
  paymentDate?: Date;
  appointmentId?: string;
  appointment?: Appointment;
  createdBy: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface CashTransaction {
  id: string;
  transactionDate: Date;
  type: 'income' | 'expense';
  amount: number;
  description: string;
  paymentMethod?: string;
  category?: string;
  referenceId?: string;
  referenceType?: string;
  createdBy: string;
  createdAt: Date;
}

export interface BankAccount {
  id: string;
  bank: string;
  agency?: string;
  account?: string;
  holder?: string;
  accountType: 'checking' | 'savings' | 'business';
  balance: number;
  isActive: boolean;
  createdBy: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface InventoryMovement {
  id: string;
  productId: string;
  product?: Product;
  movementType: 'in' | 'out' | 'adjustment' | 'transfer';
  quantity: number;
  previousQuantity?: number;
  newQuantity?: number;
  reason?: string;
  referenceId?: string;
  referenceType?: string;
  createdBy: string;
  createdAt: Date;
}

export interface UserSession {
  id: string;
  userId: string;
  token: string;
  expiresAt: Date;
  createdAt: Date;
}

export interface ActivityLog {
  id: string;
  userId: string;
  user?: User;
  action: string;
  tableName?: string;
  recordId?: string;
  oldValues?: Record<string, any>;
  newValues?: Record<string, any>;
  ipAddress?: string;
  userAgent?: string;
  createdAt: Date;
}
