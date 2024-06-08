import HotelComparePage from "@/features/hotel/HotelComparePage";
import customHookQueryWithInterceptor from "@/lib/query/queryWithInterceptor";
import {useCurrencyStore} from "@/stores/currency-state";
import {QueryClientProvider} from "@tanstack/react-query";

function App() {
    const queryClient = customHookQueryWithInterceptor();

    return (
        <QueryClientProvider client={queryClient}>
            <HotelComparePage />
        </QueryClientProvider>
    );
}

export default App;
