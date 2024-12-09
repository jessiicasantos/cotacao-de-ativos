import { Disclosure, DisclosureButton, DisclosurePanel, Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react';
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline';
import LogoOptions from "../assets/img/options-company-logo.png";
import LuizProfile from "../assets/img/luis-henrique-profile.png";
import { Link, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';

const navigation = [
  { name: '', href: '/cotacao-de-ativos', img: LogoOptions,  current: true },
]

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(' ')
}

export type UserMe = {
  username: string;
  full_name: string;
  email: string;
  hashed_password: string;
  disabled: string;
};

export default function Navbar() {
  const token = localStorage.getItem("access_token");
  const navigate = useNavigate();
  const [data, setData] = useState<UserMe | null>();

  const signOut = () => {
    localStorage.removeItem('access_token');

    navigate("/");
  }

  const fetchData = async () => {
    try {
      const response = await axios.get("http://35.222.114.197:8000/users/me", {
        headers: {
          'accept': 'application/json',
          'Authorization': 'Bearer ' + token
        }
      });
      
      let dataResponse = response.data;
  
      setData(dataResponse);
    } catch(error) {
      console.error("Erroo!", error);
    }
  }

  useEffect(() => {
    fetchData();
  }, [token])
  
  return (
    <Disclosure as="nav" className="bg-[#37776C]">
      <div className="mx-auto max-w-full">
        <div className="relative flex h-16 items-center justify-between">
          <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">

            {/* Mobile menu button*/}
            <DisclosureButton className="group relative inline-flex items-center justify-center rounded-md py-2 pl-5 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
              <span className="absolute -inset-0.5" />
              <span className="sr-only">Open main menu</span>
              <Bars3Icon aria-hidden="true" className="block size-6 group-data-[open]:hidden" />
              <XMarkIcon aria-hidden="true" className="hidden size-6 group-data-[open]:block" />
            </DisclosureButton>
          </div>

          <div className="flex flex-1 items-center ml-12 sm:ml-0 sm:items-stretch justify-start">
            <div className="sm:ml-6">
              <div className="flex space-x-4">
                {navigation.map((item) => (
                  <Link
                    key={item.name}
                    to={item.href}
                    aria-current={item.current ? 'page' : undefined}
                    className={`hover:bg-gray-900 hover:text-white ${classNames(
                      item.current ? '' : 'text-gray-300 hover:bg-gray-700 hover:text-white',
                      'rounded-md px-3 py-2 text-sm font-medium',
                    )}`}
                  >
                    <img
                      alt="Options & Company"
                      src={item.img}
                      className="h-10 w-24 object-contain"
                    />
                  </Link>
                ))}
              </div>
            </div>
          </div>
          <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
            {/* Profile dropdown */}
            {localStorage.getItem("access_token") ? 
               <Menu as="div" className="relative ml-3 lg:mr-24">
                <div>
                  <MenuButton className="relative flex rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800 p-2 hover:bg-gray-900 hover:text-white">
                    <span className="absolute" />
                    <span className="sr-only">Open user menu</span>
                    <div className="flex items-center text-white font-normal">
                      <img
                        alt="Foto de perfil"
                        src={LuizProfile}
                        className="size-8 rounded-full mr-2"
                      />
                      <span>Luiz Henrique</span>
                    </div>
                  </MenuButton>
                </div>
                <MenuItems
                  transition
                  className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black/5 transition focus:outline-none data-[closed]:scale-95 data-[closed]:transform data-[closed]:opacity-0 data-[enter]:duration-100 data-[leave]:duration-75 data-[enter]:ease-out data-[leave]:ease-in"
                >
                  <MenuItem>
                    <div>
                      <button className="block px-4 py-2 text-sm text-gray-700 data-[focus]:bg-gray-200 data-[focus]:outline-none">
                        {data && data.email}
                      </button>
                    </div>
                  </MenuItem>
                  <MenuItem>
                    <button
                      className="block px-4 py-2 text-sm text-gray-700 data-[focus]:bg-gray-100 data-[focus]:outline-none w-full text-left"
                      onClick={signOut}
                    >
                      Sign out
                    </button>
                  </MenuItem>
                </MenuItems>
              </Menu> :
              <Menu as="div" className="relative ml-3 lg:mr-24">
                <div>
                  <MenuButton className="relative flex rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2  focus:ring-offset-gray-800 p-2 hover:bg-gray-900 hover:text-white">
                    <span className="absolute" />
                    <span className="sr-only">Open user menu</span>
                    <div className="flex items-center text-white font-normal">
                      <h1>Bem-vindo!</h1>
                    </div>
                  </MenuButton>
                </div>
              </Menu>
            } 
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
  )
}