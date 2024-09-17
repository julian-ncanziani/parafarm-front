'use client'
import { useState } from 'react';
import AdminMainContent from '@/components/adminPageComponents/AdminMainContent';
import { 
  ChevronLeftIcon, 
  ChevronRightIcon, 
  HomeIcon, 
  ShoppingCartIcon, 
  UsersIcon, 
  CogIcon,
  DocumentTextIcon,
  ListBulletIcon,
} from '@heroicons/react/24/outline';

export default function Dashboard() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [activeTab, setActiveTab] = useState<'home' | 'orders' | 'users' | 'settings' | 'products'>('home');

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

  return (
    <div className="flex h-screen">
      <div className={`flex ${isSidebarOpen ? 'min-w-64' : 'min-w-14'} h-screen bg-gray-800 text-white transition-all duration-400 overflow-hidden`}>
      <div className="flex flex-col flex-grow">
        <div className="flex items-center justify-between p-4">
          <h1 className={`text-lg font-semibold ${isSidebarOpen ? 'block' : 'hidden'} whitespace-nowrap`}>Admin Dashboard</h1>
          <button onClick={toggleSidebar} className="p-2">
            {isSidebarOpen ? <ChevronLeftIcon className="h-6 w-6" /> : <ChevronRightIcon className="h-6 w-6" />}
          </button>
        </div>
        <nav className="flex-grow overflow-auto">
          <ul className="space-y-2">
            <li>
              <button
                onClick={() => setActiveTab('home')}
                className={`flex items-center p-4 w-full ${activeTab === 'home' ? 'bg-gray-700' : ''} whitespace-nowrap`}
              >
                <HomeIcon className="h-6 w-6" />
                {isSidebarOpen && <span className="ml-4">Home</span>}
              </button>
            </li>
            <li>
              <button
                onClick={() => setActiveTab('products')}
                className={`flex items-center p-4 w-full ${activeTab === 'products' ? 'bg-gray-700' : ''} whitespace-nowrap`}
              >
                <ListBulletIcon className="h-6 w-6" />
                {isSidebarOpen && <span className="ml-4">Products</span>}
              </button>
            </li>
            <li>
              <button
                onClick={() => setActiveTab('orders')}
                className={`flex items-center p-4 w-full ${activeTab === 'orders' ? 'bg-gray-700' : ''} whitespace-nowrap`}
              >
                <DocumentTextIcon className="h-6 w-6" />
                {isSidebarOpen && <span className="ml-4">Orders</span>}
              </button>
            </li>
            <li>
              <button
                onClick={() => setActiveTab('users')}
                className={`flex items-center p-4 w-full ${activeTab === 'users' ? 'bg-gray-700' : ''} whitespace-nowrap`}
              >
                <UsersIcon className="h-6 w-6" />
                {isSidebarOpen && <span className="ml-4">Users</span>}
              </button>
            </li>
            <li>
              <button
                onClick={() => setActiveTab('settings')}
                className={`flex items-center p-4 w-full ${activeTab === 'settings' ? 'bg-gray-700' : ''} whitespace-nowrap`}
              >
                <CogIcon className="h-6 w-6" />
                {isSidebarOpen && <span className="ml-4">Settings</span>}
              </button>
            </li>
          </ul>
        </nav>
      </div>
    </div>
      <AdminMainContent activeTab={activeTab}/>
    </div>
  );
}
