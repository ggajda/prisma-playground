export type Address = {
  id: string;
  street: string;
  zip: string;
  city: string;
};

export type Customer = {
  id: string;
  name: string;
  address?: Address;
};
