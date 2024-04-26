import { Routes, Route, Navigate } from "react-router-dom";
import {QueryClient,QueryClientProvider,QueryCache} from "@tanstack/react-query"
import { ReactQueryDevtools } from "@tanstack/react-query-devtools"
// import RtlLayout from "layouts/rtl";
import AdminLayout from "layouts/admin";
import AuthLayout from "layouts/auth";

const queryClient = new QueryClient({
	queryCache: new QueryCache(),
	defaultOptions: {
		queries: {
			staleTime: 1_000,
		},
	},
})

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
				{process.env.NODE_ENV === "development" && (
					<ReactQueryDevtools initialIsOpen={false} position='bottom' />
				)}
        <Routes>
          <Route path="auth/*" element={<AuthLayout />} />
          <Route path="admin/*" element={<AdminLayout />} />
          {/* <Route path="rtl/*" element={<RtlLayout />} /> */}
          <Route path="/" element={<Navigate to="/admin" replace />} />
        </Routes>
    </QueryClientProvider>
  );
};

export default App;
