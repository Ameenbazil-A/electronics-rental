export interface Product {

  id: number;

  category: number;

  category_name: string;

  name: string;

  brand: string;

  model_name: string;

  daily_rent: string;

  weekly_rent: string;

  monthly_rent: string;

  security_deposit: string;

  stock: number;

  available: boolean;

  description: string;

  image: string | null;

  created_at: string;

}