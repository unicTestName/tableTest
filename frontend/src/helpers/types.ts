export type UserAddress = {
  street: string;
  suite: string;
  city: string;
  zipcode: number;
};

export type UserCompany = {
  name: string;
  catchPhrase: string;
  bs: string;
};

export type User = {
  id: number;
  name: string;
  email: string;
  address: UserAddress;
  company: UserCompany;
};
