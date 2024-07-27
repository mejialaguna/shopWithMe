import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface State {
  address: {
    firstName: string;
    lastName: string;
    address: string;
    address2?: string;
    zipcode: string;
    city: string;
    country: string;
    phone: string;
  };
  // setting the argumen as State['address'] same as State.address refering to the state interface
  setAdress: (address: State['address']) => void;
}

export const useAddressStore = create<State>()(
  persist(
    (set, get) => ({
      //first we need to start the state
      address: {
        firstName: '',
        lastName: '',
        address: '',
        address2: '',
        zipcode: '',
        city: '',
        country: '',
        phone: '',
      },
      setAdress: (address) => {
        if (address) {
          set({ address });
        }
      },
    }),
    { name: 'deliveryAddress' }
  )
);
