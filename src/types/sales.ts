
export interface SaleItem {
  id: string;
  name: string;
  type: 'product' | 'service';
  quantity: number;
  unitPrice: number;
  total: number;
}

export interface Sale {
  id:string;
  date: Date;
  customerName: string;
  customerPhone?: string;
  animalId?: string;
  animalName?: string;
  items: SaleItem[];
  subtotal: number;
  discount: number;
  total: number;
  paymentMethod: string;
  status: 'completed' | 'pending' | 'cancelled';
  notes?: string;
}

export type NewSale = Omit<Sale, 'id' | 'date'> & { id?: string, date?: Date };
