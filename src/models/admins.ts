export interface Admins {
  email: string;
  fullName: string;
  id: string;
  password: string;
  phoneNumber: string;
  role: {
    id: string;
    role: string;
    createdAt: string;
    updatedAt: string;
  };
  socketId: string | null;
  warehouse: {
    address: string;
    createdAt: string;
    id: string;
    pricePerKG: number;
    state: string;
    updatedAt: string;
  };
}
