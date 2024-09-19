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
      <h1 className="text-2xl font-bold mb-4">Users</h1>
      <p className="text-gray-600 mb-4">A list of all the users in your account including their name, title, email, and role.</p>

      <div className="overflow-x-auto p-6">
        {loading ? (
          <div className="flex justify-center items-center min-h-screen">
            <div className="w-12 h-12 border-4 border-t-4 border-blue-500 border-solid border-t-transparent rounded-full animate-spin"></div>
          </div>
        ) : (
          <table className="min-w-full divide-y divide-gray-200 bg-white shadow-md rounded-lg overflow-hidden">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Role</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"></th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {state.data?.map((user, index) => (
                <tr key={index}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{user.name}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{user.email}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    <span className={`px-2 py-1 text-xs font-medium rounded-full ${user.rol === 'admin' ? 'bg-red-100 text-red-800' : user.rol === 'client' ? 'bg-blue-100 text-blue-800' : 'bg-green-100 text-green-800'}`}>
                      {user.rol}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    <button className="text-indigo-600 hover:text-indigo-900">Edit</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default UsersList;
