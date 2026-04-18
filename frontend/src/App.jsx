import { useState } from 'react';
import Navbar from './components/Navbar';
import DashboardStats from './components/DashboardStats';
import CreateOrderForm from './components/CreateOrderForm';
import SideSummary from './components/SideSummary';
import OrdersList from './components/OrdersList';

export default function App() {
  const [refreshTrigger, setRefreshTrigger] = useState(0);

  const handleOrderCreated = () => {
    setRefreshTrigger(prev => prev + 1);
  };

  return (
    <>
      <Navbar />
      <main className="max-w-[1440px] mx-auto p-8 space-y-8">
        <header className="space-y-1">
          <h1 className="text-3xl font-extrabold tracking-tight text-on-surface">Operations Overview</h1>
          <p className="text-on-surface-variant font-medium">Real-time status of laundry processing cycles.</p>
        </header>

        <DashboardStats refreshTrigger={refreshTrigger} />

        <section className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          <CreateOrderForm onOrderCreated={handleOrderCreated} />
          <SideSummary />
        </section>

        <OrdersList refreshTrigger={refreshTrigger} onOrderUpdated={handleOrderCreated} />
      </main>
    </>
  );
}
