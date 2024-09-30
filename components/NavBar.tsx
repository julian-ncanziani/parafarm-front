import { Disclosure, DisclosureButton, DisclosurePanel, Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react';
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline';
import { FaUser } from 'react-icons/fa'; 
import { getServerSession } from 'next-auth';
import SignInBtn from './SingInBtn';
import SignOutBtn from './SignOut';
import OpenCartBtn from './OpenCartBtn';
import Image from 'next/image';
import NavBarDropdown from './NavBarDropdown';
import { authOptions } from '@/lib/authOptions';

const navigation = [
  { name: 'Nav 1', href: '#', current: true },
  { name: 'Nav 2', href: '#', current: false },
  { name: 'Nav 3', href: '#', current: false },
  { name: 'Nav 4', href: '#', current: false },
];

function classNames(...classes: any) {
  return classes.filter(Boolean).join(' ');
}

interface NavBarProps {
  
}

const NavBar: React.FC<NavBarProps> = async () => {


  const session = await getServerSession(authOptions);
  
  const printUserOptions = () => {
    if(session && session.user.rol === 'client') {
      return (
        <>
          <MenuItem>
            <a href="/profile" className="block px-4 py-2 text-sm text-gray-700 data-[focus]:bg-gray-100">
              Your Profile
            </a>
          </MenuItem>
          <MenuItem>
            <a href="#" className="block px-4 py-2 text-sm text-gray-700 data-[focus]:bg-gray-100">
              Settings
            </a>
          </MenuItem>
          <SignOutBtn/>
        </>
      )
    }else if(session && session.user.rol === 'admin'){
      return (
        <>
          <MenuItem>
            <a href="/admin" className="block px-4 py-2 text-sm text-gray-700 data-[focus]:bg-gray-100">
              Admin Dashboard
            </a>
          </MenuItem>
          <SignOutBtn/>
        </>
      )
    }else {
      return(
          <SignInBtn text='Inicia sesion' textColor='black'/>
      )
    }
  }

  return (
    <Disclosure as="nav" className="bg-gray-800 fixed top-0 w-full ">
    <Image 
      className="md:ml-5 sm:ml-0"
      src={'/images/logo_parafarm.png'} 
      width={200} height={100} 
      alt='logo'
    />
      <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
        <div className="relative flex h-16 items-center justify-between">
          <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
            {/* Mobile menu button*/}
            <DisclosureButton className="group relative inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
              <span className="absolute -inset-0.5" />
              <span className="sr-only">Open main menu</span>
              <Bars3Icon aria-hidden="true" className="block h-6 w-6 group-data-[open]:hidden" />
              <XMarkIcon aria-hidden="true" className="hidden h-6 w-6 group-data-[open]:block" />
            </DisclosureButton>
          </div>
          {/* Dropdawn */}
          <div className="flex flex-1 items-center justify-between sm:items-stretch sm:justify-start">
            <div className="hidden sm:ml-6 sm:block">
              <NavBarDropdown/>
            </div>
          </div>
          <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
            
          {/*btn para abrir el carrito de compras */}
          <OpenCartBtn/>
              
          {/* Profile dropdown */}
          <Menu as="div" className="relative ml-3">
            <div>
              <MenuButton className="relative rounded-full bg-gray-800 p-1 text-gray-400 hover:text-white">
                <span className="absolute -inset-1.5" />
                <span className="sr-only">Open user menu</span>
                {session 
                  ? <img src={`${session.user.image as string}`} alt="session img" className="h-10 w-10 rounded-full"/>
                  : <FaUser className="h-7 w-7" />}
              </MenuButton>
            </div>
            <MenuItems
              transition
              className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 transition focus:outline-none data-[closed]:scale-95 data-[closed]:transform data-[closed]:opacity-0 data-[enter]:duration-100 data-[leave]:duration-75 data-[enter]:ease-out data-[leave]:ease-in"
            >
              {printUserOptions()}
            </MenuItems>
          </Menu>
          </div>
        </div>
      </div>

      <DisclosurePanel className="sm:hidden">
        <div className="space-y-1 px-2 pb-3 pt-2">
          {navigation.map((item) => (
            <DisclosureButton
              key={item.name}
              as="a"
              href={item.href}
              aria-current={item.current ? 'page' : undefined}
              className={classNames(
                item.current ? 'bg-gray-900 text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-white',
                'block rounded-md px-3 py-2 text-base font-medium',
              )}
            >
              {item.name}
            </DisclosureButton>
          ))}
        </div>
      </DisclosurePanel>
    </Disclosure>
  );
}

export default NavBar;