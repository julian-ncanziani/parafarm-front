'use client'
import { FC } from 'react';
import UsersList from './UsersContent';
import ProductContent from './ProductsContent';
import OrdersContent from './OrdersContent';
import { useAdminContext } from '@/context/AdminContext';
interface AdminMainContentProps {


}

const AdminMainContent: FC<AdminMainContentProps> = () => {

  const { activeTab } = useAdminContext();

  return (
    <div className="flex-1 max-h-100">
      {activeTab === 'home' && <div>Home Content</div>}
      {activeTab === 'orders' && <OrdersContent/>}
      {activeTab === 'products' && <ProductContent/>}
      {activeTab === 'users' && <UsersList/>}
      {activeTab === 'settings' && <div>Settings Content</div>}    
    </div>
  );
};

export default AdminMainContent;
