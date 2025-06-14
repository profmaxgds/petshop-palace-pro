
export interface SaleItem {
  id: string;
  productId?: string;
  serviceId?: string;
  name: string;
  type: 'product' | 'service';
  price: number;
  quantity: number;
  discount?: number;
  total: number;
}

export interface Sale {
  id: string;
  customerId?: string;
  customerName?: string;
  items: SaleItem[];
  subtotal: number;
  discount: number;
  total: number;
  paymentMethod: 'cash' | 'card' | 'pix' | 'check';
  status: 'pending' | 'completed' | 'cancelled';
  createdBy: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface PaymentMethod {
  id: string;
  name: string;
  type: 'cash' | 'card' | 'pix' | 'check' | 'other';
  isActive: boolean;
}
