'use client'
import { createContext, useContext, useState, ReactNode, useEffect } from 'react';

type Tab = 'home' | 'orders' | 'users' | 'settings' | 'products';

interface AdminPageContextProps {
    isSidebarOpen: boolean;
    openSidebar: () => void;
    closeSidebar: () => void;
    handleTabs: (tab: Tab) => void;
    activeTab: Tab;
}

const AdminPageContext = createContext<AdminPageContextProps | undefined>(undefined);

export const AdminPageProvider = ({ children }: { children: ReactNode }) => {

    const [isSidebarOpen, setIsSidebarOpen] = useState(true);
    const [activeTab, setActiveTab] = useState<Tab>('home');

    const openSidebar = () => {
        setIsSidebarOpen(true);
    };

    const closeSidebar = () => {
        setIsSidebarOpen(false);
    };

    const handleTabs = (tab: Tab) => {
        setActiveTab(tab);
    };

    return(
        <AdminPageContext.Provider value={{
            isSidebarOpen, 
            openSidebar, 
            closeSidebar,
            handleTabs,
            activeTab,
        }}>
            {children}
        </AdminPageContext.Provider>
    )
};

export const useAdminContext = (): AdminPageContextProps => {
    const context = useContext(AdminPageContext);
    if (!context) {
        throw new Error('useAdminContext must be used within a AdminPageProvider');
    }
    return context;
}