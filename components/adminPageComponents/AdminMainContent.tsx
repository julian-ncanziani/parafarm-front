// app/components/MainContent.tsx
import { FC } from 'react';
import UsersList from './UsersContent';
import ProductContent from './ProductsContent';

interface AdminMainContentProps {
  activeTab: 'home' | 'orders' | 'users' | 'settings' | 'products';

}

const AdminMainContent: FC<AdminMainContentProps> = ({ activeTab }) => {
  return (
    <main className="flex-grow p-6">
      {activeTab === 'home' && <div>Home Content</div>}
      {activeTab === 'orders' && <div>Orders Content</div>}
      {activeTab === 'products' && <div>Products List<ProductContent/></div>}
      {activeTab === 'users' && <UsersList/>}
      {activeTab === 'settings' && <div>Settings Content</div>}    
    </main>
  );
};

export default AdminMainContent;
