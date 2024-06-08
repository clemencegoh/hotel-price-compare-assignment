import { useQuery } from "@tanstack/react-query";


export type HotelDto = {
  id: number;
  name: string;
  rating: number;
  stars: number;
  address: string;
  photo: string;
  description: string;
}

export type CurrencyPriceDto = {
  id: number;
  price: number;
  competitors?: Record<string, number>;
  taxes_and_fees?: {
      tax: number;
      hotel_fees: number;
  };
}

export function useHotelData() {

  const dataURL = 'https://61c3e5d2f1af4a0017d99115.mockapi.io/hotels/tokyo';

  const {data, refetch} = useQuery({
    queryKey: ['hotels'],
    queryFn: () => fetch(dataURL),
  });
  return {data};
}