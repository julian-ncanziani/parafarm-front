'use client'
import { useAdminContext } from '@/context/AdminContext';
import { 
  ChevronLeftIcon, 
  ChevronRightIcon, 
  HomeIcon, 
  UsersIcon, 
  CogIcon,
  DocumentTextIcon,
  ListBulletIcon,
} from '@heroicons/react/24/outline';
import {  FiArrowLeftCircle } from 'react-icons/fi'


const Sidebar = () => {

    const { isSidebarOpen, openSidebar, closeSidebar, activeTab, handleTabs } = useAdminContext();

    const toggleSidebar = () => {
        if(isSidebarOpen) closeSidebar();
        if(!isSidebarOpen) openSidebar();
    };

    return(
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
            onClick={() => handleTabs('home')}
            className={`flex items-center p-4 w-full ${activeTab === 'home' ? 'bg-gray-700' : ''} whitespace-nowrap`}
        >
            <HomeIcon className="h-6 w-6" />
            {isSidebarOpen && <span className="ml-4 hover:underline">Home</span>}
        </button>
    </li>
    <li>
        <button
            onClick={() => handleTabs('products')}
            className={`flex items-center p-4 w-full ${activeTab === 'products' ? 'bg-gray-700' : ''} whitespace-nowrap`}
        >
            <ListBulletIcon className="h-6 w-6" />
            {isSidebarOpen && <span className="ml-4 hover:underline">Products</span>}
        </button>
    </li>
    <li>
        <button
            onClick={() => handleTabs('orders')}
            className={`flex items-center p-4 w-full ${activeTab === 'orders' ? 'bg-gray-700' : ''} whitespace-nowrap`}
        >
            <DocumentTextIcon className="h-6 w-6" />
            {isSidebarOpen && <span className="ml-4 hover:underline">Orders</span>}
        </button>
    </li>
    <li>
        <button
            onClick={() => handleTabs('users')}
            className={`flex items-center p-4 w-full ${activeTab === 'users' ? 'bg-gray-700' : ''} whitespace-nowrap`}
        >
            <UsersIcon className="h-6 w-6" />
            {isSidebarOpen && <span className="ml-4 hover:underline">Users</span>}
        </button>
    </li>
    <li>
        <button
            onClick={() => handleTabs('settings')}
            className={`flex items-center p-4 w-full ${activeTab === 'settings' ? 'bg-gray-700' : ''} whitespace-nowrap`}
        >
            <CogIcon className="h-6 w-6" />
            {isSidebarOpen && <span className="ml-4 hover:underline">Settings</span>}
        </button>
    </li>
    <li>
        <a 
            href="/" 
            className={`flex items-center p-4 w-full whitespace-nowrap`} // Ajusta el estilo para coincidir con los otros botones
        >
            <FiArrowLeftCircle className="h-6 w-6" />
            {isSidebarOpen && <span className="ml-4 hover:underline">Volver</span>}
        </a>
    </li>
</ul>

                </nav>
            </div>
        </div>
    )
}

export default Sidebar;