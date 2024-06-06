import customHookQueryWithInterceptor from "@/lib/query/queryWithInterceptor";
import {QueryClientProvider} from "@tanstack/react-query";

function App() {
    const queryClient = customHookQueryWithInterceptor();

    return (
        <QueryClientProvider client={queryClient}>
            <h1>Hello world! App main</h1>
        </QueryClientProvider>
    );
}

export default App;
