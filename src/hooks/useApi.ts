import { useToast } from "@/components/ui/use-toast";
import { useQuery } from "@tanstack/react-query";
import { useEffect, useState,  } from "react";
import _ from 'lodash';
import { getReadableError } from "@/utils/ErrorHandlers";


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
  price?: number;
  competitors?: Record<string, number>;
  taxes_and_fees?: {
      tax: number;
      hotel_fees: number;
  };
}

export async function genericFetch(url: string) {
  const res = await fetch(url);
  return res.json();
}

export function useHotelData() {
  const {toast} = useToast();

  const dataURL = 'https://61c3e5d2f1af4a0017d99115.mockapi.io/hotels/tokyo';

  const {error, ...rest} = useQuery<HotelDto[]>({
    queryKey: ['hotels'],
    queryFn: () => genericFetch(dataURL)
  });

  useEffect(() => {
    if (error) {
      toast({
        title: "Error fetching hotels data", 
        description: getReadableError(error),
        className: "text-white bg-error",
      });
    }
  }, [error])

  return {error, ...rest};
}

export function usePriceData(currency: string, page: number = 1) {
  const {toast} = useToast();

  const dataURL = `http://61c3e5d2f1af4a0017d99115.mockapi.io/hotels/tokyo/${page}/${currency}`;

  const {data, error, isLoading} = useQuery<CurrencyPriceDto[]>({
    queryKey: ['hotel price', currency, page],
    queryFn: () => genericFetch(dataURL)
  });

  useEffect(() => {
    if (error) {
      toast({
        title: "Error fetching prices data", 
        description: getReadableError(error),
        className: "text-white bg-error",
      });
    }
  }, [error])

  return {data, isLoading};
}

/**
 * Combines data and returns as an object rather than an array.
 * Trivial to turn back into an array or iterate based on key
 */
export function useCombinedHotelData(currency: string = 'USD', page: number = 1) {
  const [combinedData, setCombinedData] = useState<(CurrencyPriceDto & HotelDto)[]>([]);

  const {data: hotelData, isLoading: hotelDataLoading} = useHotelData();
  const {data: priceData, isLoading: priceDataLoading} = usePriceData(currency, page);

  useEffect(() => {
    if (hotelData && hotelData?.length > 0 &&  priceData && priceData?.length > 0) {
      const newCombinedData = hotelData?.map(data => {
        const priceForHotelData = priceData?.find(item => item.id === data.id);
        return {
          ...data,
          ...priceForHotelData,
        }
      });
      setCombinedData(newCombinedData ?? []);
    }
    
  }, [hotelData, priceData])


  return {combinedData, isLoading: hotelDataLoading || priceDataLoading} as const;
}