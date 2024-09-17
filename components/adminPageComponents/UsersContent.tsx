'use client'
import { useState, useEffect } from 'react';
import ICustomResponse from '@/interfaces/ICustomResponse';
import { FC } from 'react';

interface IUser {
  id: number;
  name: string;
  email: string;
  rol: string;
}

const UsersList: FC = () => {
  const [state, setState] = useState<ICustomResponse<IUser[]>>({ data: [], error: false, message: '' });
  const [loading, setLoading] = useState(true);
  const [showItems, setShowItems] = useState(false);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch('/api/admin/users');
        const data: ICustomResponse<IUser[]> = await response.json();
        setState(data);
      } catch (error) {
        setState({ data: [], error: true, message: 'Error fetching users' });
      } finally {
        setLoading(false);
        setShowItems(true); // Start showing items after loading
      }
    };

    fetchUsers();
  }, []);

  return (
    <div className="p-6">
      <h2 className="text-2xl font-semibold mb-4">Users List</h2>
      {loading ? (
        <div className="flex justify-center items-center min-h-screen">
          <div className="w-12 h-12 border-4 border-t-4 border-blue-500 border-solid border-t-transparent rounded-full animate-spin"></div>
        </div>
      ) : (
        <ul className={`space-y-4 transform transition-transform duration-500 ease-in-out ${showItems ? 'animate-slideDown' : 'opacity-0'}`}>
          {state.data?.map((user) => (
            <li key={user.id} className="bg-white shadow-md rounded-lg p-4 flex items-center space-x-4">
              <div className="flex-shrink-0">
                <svg className="h-12 w-12 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 3v9.28a4.2 4.2 0 1 0 0 8.41V21h.01A6.97 6.97 0 0 0 18 12V3h-6zm-7 9a3 3 0 0 1 6 0v1.8a3.6 3.6 0 0 1-3.6 3.6h-1.4A3.6 3.6 0 0 1 5 13.8V12z" />
                </svg>
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-lg font-medium text-gray-900 truncate">{user.name}</p>
                <p className="text-sm text-gray-500 truncate">{user.email}</p>
              </div>
              <div>
                <span className={`px-2 py-1 text-xs font-medium rounded-full ${user.rol === 'admin' ? 'bg-red-100 text-red-800' : user.rol === 'client' ? 'bg-blue-100 text-blue-800' : 'bg-green-100 text-green-800'}`}>
                  {user.rol}
                </span>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default UsersList;
