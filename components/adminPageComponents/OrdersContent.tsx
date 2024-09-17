

const OrdersContent = () => {
    return(
        <div className="p-6">
            <h1 className="text-2xl font-bold mb-4">Orders</h1>
            <p className="text-gray-600 mb-4">A list of all the users in your account including their name, title, email, and role.</p>

            <table className="min-w-full divide-y divide-gray-200 bg-white shadow-md rounded-lg overflow-hidden " >
                <thead className="bg-gray-50">
                <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Title</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Role</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"></th>
                </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200 ">
                <tr>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">Lindsay Walton</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">Front-end Developer</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">lindsay.walton@example.com</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">Member</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    <button className="text-indigo-600 hover:text-indigo-900">Edit</button>
                    </td>
                </tr>
                <tr>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">Courtney Henry</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">Designer</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">courtney.henry@example.com</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">Admin</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    <button className="text-indigo-600 hover:text-indigo-900">Edit</button>
                    </td>
                </tr>
                <tr>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">Tom Cook</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">Director of Product</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">tom.cook@example.com</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">Member</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    <button className="text-indigo-600 hover:text-indigo-900">Edit</button>
                    </td>
                </tr>
                <tr>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">Whitney Francis</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">Copywriter</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">whitney.francis@example.com</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">Admin</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    <button className="text-indigo-600 hover:text-indigo-900">Edit</button>
                    </td>
                </tr>
                <tr>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">Leonard Krasner</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">Senior Designer</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">leonard.krasner@example.com</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">Owner</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    <button className="text-indigo-600 hover:text-indigo-900">Edit</button>
                    </td>
                </tr>
                <tr>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">Floyd Miles</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">Principal Designer</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">floyd.miles@example.com</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">Member</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    <button className="text-indigo-600 hover:text-indigo-900">Edit</button>
                    </td>
                </tr>
                </tbody>
            </table>
        </div>
    )
}

export default OrdersContent;