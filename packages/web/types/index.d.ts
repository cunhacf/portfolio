type Override<T1, T2> = Omit<T1, keyof T2> & T2;

type SanityReference<T> = {
  _createdAt: string;
  _id: string;
  _rev: string;
  _type: string;
  _updatedAt: string;
} & T;
