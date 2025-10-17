import React, { Suspense } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Provider } from "react-redux";
import { store, persistor } from "./app/store"; // <- persistor added here
import { PersistGate } from 'redux-persist/integration/react';
import { Toaster } from 'react-hot-toast';

// Lazy-loaded route components
const UserRoutes = React.lazy(() => import("./Routers/userRoutes"));
const DoctorRoutes = React.lazy(() => import("./Routers/doctorRouter"));
const NotFound = React.lazy(() => import("./pages/User/notFound"));
const Loading = React.lazy(() => import("./components/Reusable/loader"));

function App() {
  return (
    <Provider store={store}>
      {/* PersistGate delays rendering until redux-persist rehydrates the state */}
      <PersistGate loading={<Loading />} persistor={persistor}>
        <BrowserRouter>
          <Toaster position="top-right" reverseOrder={false} />
          <Suspense fallback={<Loading />}>
            <Routes>
              {/* Doctor Routes first - more specific */}
              <Route path="/doctor/*" element={<DoctorRoutes />} />

              {/* User Routes */}
              <Route path="/*" element={<UserRoutes />} />

              {/* Catch-all Not Found */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </Suspense>
        </BrowserRouter>
      </PersistGate>
    </Provider>
  );
}

export default App;
