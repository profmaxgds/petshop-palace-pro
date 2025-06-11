
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
