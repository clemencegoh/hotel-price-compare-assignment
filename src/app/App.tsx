import HotelComparePage from "@/features/hotel/HotelComparePage";
import customHookQueryWithInterceptor from "@/lib/query/queryWithInterceptor";
import {QueryClientProvider} from "@tanstack/react-query";
import {Toaster} from "@/components/ui/toaster";

function App() {
    const queryClient = customHookQueryWithInterceptor();

    return (
        <QueryClientProvider client={queryClient}>
            <HotelComparePage />
            <Toaster />
        </QueryClientProvider>
    );
}

export default App;
