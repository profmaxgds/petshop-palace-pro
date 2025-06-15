
export interface ProductCategory {
  id: string;
  name: string;
  description?: string;
  isVaccine?: boolean;
  isActive: boolean;
}

export interface Product {
  id: string;
  name: string;
  categoryId: string;
  quantity: number;
  minQuantity: number;
  costPrice: number;
  salePrice: number;
  supplier: string;
  createdAt: Date;
  updatedAt: Date;
  // Vaccine specific fields
  batch?: string;
  expirationDate?: string;
  vaccineType?: string;
  manufacturer?: string;
  mapaRegistration?: string;
}

export interface PurchaseItem {
  productId: string;
  quantity: number;
  unitPrice: number;
  total: number;
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
