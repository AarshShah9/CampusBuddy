import { Fragment, useEffect, useState } from "react";
import { Dialog, Menu, Transition } from "@headlessui/react";
import {
  Bars3Icon,
  BellIcon,
  Cog6ToothIcon,
  XMarkIcon,
  ShoppingCartIcon,
  CalendarDaysIcon,
  HashtagIcon,
  UserGroupIcon,
} from "@heroicons/react/24/outline";
import {
  ChevronDownIcon,
  MagnifyingGlassIcon,
} from "@heroicons/react/20/solid";
import { classNames } from "../lib/className";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { BACKEND_URL } from "../lib/constants";

type Request = {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  profilePic: string;
  institutionId: string;
  accountType: string;
};

export default function Layout() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const navigate = useNavigate();
  const [requests, setRequests] = useState<Request[]>([]);
  const [updateTrigger, setUpdateTrigger] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const location = useLocation();

  const navigation = [
    {
      name: "Organization Requests",
      href: "/dashboard/orgTable",
      icon: UserGroupIcon,
      current: location.pathname === "/dashboard/orgTable",
    },
    {
      name: "Flagged Posts",
      href: "/dashboard/postTable",
      icon: HashtagIcon,
      current: location.pathname === "/dashboard/postTable",
    },
    {
      name: "Flagged Events",
      href: "/dashboard/eventTable",
      icon: CalendarDaysIcon,
      current: location.pathname === "/dashboard/eventTable",
    },
    {
      name: "Flagged Items",
      href: "/dashboard/itemTable",
      icon: ShoppingCartIcon,
      current: location.pathname === "/dashboard/itemTable",
    },
  ];

  const userNavigation = [
    {
      name: "Sign out",
      onClick: () => {
        localStorage.removeItem("token");
        navigate("/login");
      },
    },
  ];

  const fetchRequests = async () => {
    try {
      const authToken = localStorage.getItem("token");
      const response = await fetch(`${BACKEND_URL}/api/user/me/`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${authToken}`,
        },
      });
      if (response.ok) {
        const res = await response.json();
        setRequests(res.data);
      }
    } catch (error) {
      console.error("Error fetching user information:", error);
    }
  };

  useEffect(() => {
    if (localStorage.getItem("token") === null) {
      navigate("/login");
    }
    fetchRequests().then(() => setIsLoading(false));
  }, [updateTrigger]);

  console.log(requests);
  return (
    <>
      <div>
        <Transition.Root show={sidebarOpen} as={Fragment}>
          <Dialog
            as="div"
            className="relative z-50 lg:hidden"
            onClose={setSidebarOpen}
          >
            <Transition.Child
              as={Fragment}
              enter="transition-opacity ease-linear duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="transition-opacity ease-linear duration-300"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <div className="fixed inset-0 bg-gray-900/80" />
            </Transition.Child>

            <div className="fixed inset-0 flex">
              <Transition.Child
                as={Fragment}
                enter="transition ease-in-out duration-300 transform"
                enterFrom="-translate-x-full"
                enterTo="translate-x-0"
                leave="transition ease-in-out duration-300 transform"
                leaveFrom="translate-x-0"
                leaveTo="-translate-x-full"
              >
                <Dialog.Panel className="relative mr-16 flex w-full max-w-xs flex-1">
                  <Transition.Child
                    as={Fragment}
                    enter="ease-in-out duration-300"
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    leave="ease-in-out duration-300"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                  >
                    <div className="absolute left-full top-0 flex w-16 justify-center pt-5">
                      <button
                        type="button"
                        className="-m-2.5 p-2.5"
                        onClick={() => setSidebarOpen(false)}
                      >
                        <span className="sr-only">Close sidebar</span>
                        <XMarkIcon
                          className="h-6 w-6 text-white"
                          aria-hidden="true"
                        />
                      </button>
                    </div>
                  </Transition.Child>
                  {/* Sidebar component, swap this element with another sidebar if you like */}
                  <div className="flex grow flex-col gap-y-5 overflow-y-auto bg-gray-900 px-6 pb-4 ring-1 ring-white/10">
                    <div className="flex h-16 shrink-0 items-center">
                      <img
                        className="h-8 w-auto"
                        src="/Campus_Buddy_Logo.png"
                        alt="Campus Buddy"
                      />
                    </div>
                    <nav className="flex flex-1 flex-col">
                      <ul role="list" className="flex flex-1 flex-col gap-y-7">
                        <li>
                          <ul role="list" className="-mx-2 space-y-1">
                            {navigation.map((item) => (
                              <li key={item.name}>
                                <a
                                  href={item.href}
                                  className={classNames(
                                    item.current
                                      ? "bg-gray-800 text-white"
                                      : "text-gray-400 hover:text-white hover:bg-gray-800",
                                    "group flex gap-x-3 rounded-md p-2 text-sm leading-6 font-semibold",
                                  )}
                                >
                                  <item.icon
                                    className="h-6 w-6 shrink-0"
                                    aria-hidden="true"
                                  />
                                  {item.name}
                                </a>
                              </li>
                            ))}
                          </ul>
                        </li>
                        {/*<li className="mt-auto">*/}
                        {/*  <a*/}
                        {/*    href="#"*/}
                        {/*    className="group -mx-2 flex gap-x-3 rounded-md p-2 text-sm font-semibold leading-6 text-gray-400 hover:bg-gray-800 hover:text-white"*/}
                        {/*  >*/}
                        {/*    <Cog6ToothIcon*/}
                        {/*      className="h-6 w-6 shrink-0"*/}
                        {/*      aria-hidden="true"*/}
                        {/*    />*/}
                        {/*    Settings*/}
                        {/*  </a>*/}
                        {/*</li>*/}
                      </ul>
                    </nav>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </Dialog>
        </Transition.Root>

        {/* Static sidebar for desktop */}
        <div className="hidden lg:fixed lg:inset-y-0 lg:z-50 lg:flex lg:w-72 lg:flex-col">
          {/* Sidebar component, swap this element with another sidebar if you like */}
          <div className="flex grow flex-col gap-y-5 overflow-y-auto bg-gray-900 px-6 pb-4">
            <div className="flex h-16 shrink-0 items-center">
              <img
                className="h-12 w-auto"
                src="/Campus_Buddy_Logo.png"
                alt="Your Company"
              />
            </div>
            <nav className="flex flex-1 flex-col">
              <ul role="list" className="flex flex-1 flex-col gap-y-7">
                <li>
                  <ul role="list" className="-mx-2 space-y-1">
                    {navigation.map((item) => (
                      <li key={item.name}>
                        <a
                          href={item.href}
                          className={classNames(
                            item.current
                              ? "bg-gray-800 text-white"
                              : "text-gray-400 hover:text-white hover:bg-gray-800",
                            "group flex gap-x-3 rounded-md p-2 text-sm leading-6 font-semibold",
                          )}
                        >
                          <item.icon
                            className="h-6 w-6 shrink-0"
                            aria-hidden="true"
                          />
                          {item.name}
                        </a>
                      </li>
                    ))}
                  </ul>
                </li>
                {/*<li className="mt-auto">*/}
                {/*  <a*/}
                {/*    href="#"*/}
                {/*    className="group -mx-2 flex gap-x-3 rounded-md p-2 text-sm font-semibold leading-6 text-gray-400 hover:bg-gray-800 hover:text-white"*/}
                {/*  >*/}
                {/*    <Cog6ToothIcon*/}
                {/*      className="h-6 w-6 shrink-0"*/}
                {/*      aria-hidden="true"*/}
                {/*    />*/}
                {/*    Settings*/}
                {/*  </a>*/}
                {/*</li>*/}
              </ul>
            </nav>
          </div>
        </div>

        <div className="lg:pl-72">
          <div className="sticky top-0 z-40 flex h-16 shrink-0 items-center gap-x-4 border-b border-gray-200 bg-white px-4 shadow-sm sm:gap-x-6 sm:px-6 lg:px-8">
            <button
              type="button"
              className="-m-2.5 p-2.5 text-gray-700 lg:hidden"
              onClick={() => setSidebarOpen(true)}
            >
              <span className="sr-only">Open sidebar</span>
              <Bars3Icon className="h-6 w-6" aria-hidden="true" />
            </button>

            {/* Separator */}
            <div
              className="h-6 w-px bg-gray-900/10 lg:hidden"
              aria-hidden="true"
            />

            <div className="flex flex-1 gap-x-4 self-stretch lg:gap-x-6">
              <form className="relative flex flex-1" action="#" method="GET">
                {/*<label htmlFor="search-field" className="sr-only">*/}
                {/*  Search*/}
                {/*</label>*/}
                {/*<MagnifyingGlassIcon*/}
                {/*  className="pointer-events-none absolute inset-y-0 left-0 h-full w-5 text-gray-400"*/}
                {/*  aria-hidden="true"*/}
                {/*/>*/}
                {/*<input*/}
                {/*  id="search-field"*/}
                {/*  className="block h-full w-full border-0 py-0 pl-8 pr-0 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm"*/}
                {/*  placeholder="Search..."*/}
                {/*  type="search"*/}
                {/*  name="search"*/}
                {/*/>*/}
              </form>
              <div className="flex items-center gap-x-2 lg:gap-x-1">
                {/*<div*/}
                {/*  className="hidden lg:block lg:h-6 lg:w-px lg:bg-gray-900/10"*/}
                {/*  aria-hidden="true"*/}
                {/*/>*/}

                {/* Profile dropdown */}
                <Menu as="div" className="relative">
                  <Menu.Button className="-m-1.5 flex items-center p-1.5">
                    <span className="sr-only">Open user menu</span>
                    {/*<img*/}
                    {/*  className="h-8 w-8 rounded-full bg-gray-50"*/}
                    {/*  src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"*/}
                    {/*  alt=""*/}
                    {/*/>*/}
                    <span className="hidden lg:flex lg:items-center">
                      <span
                        className="ml-4 text-sm font-semibold leading-6 text-gray -900"
                        aria-hidden="true"
                      >
                        {requests[0]?.firstName} {requests[0]?.lastName}
                      </span>
                      <ChevronDownIcon
                        className="ml-2 h-5 w-5 text-gray-400"
                        aria-hidden="true"
                      />
                    </span>
                  </Menu.Button>
                  <Transition
                    as={Fragment}
                    enter="transition ease-out duration-100"
                    enterFrom="transform opacity-0 scale-95"
                    enterTo="transform opacity-100 scale-100"
                    leave="transition ease-in duration-75"
                    leaveFrom="transform opacity-100 scale-100"
                    leaveTo="transform opacity-0 scale-95"
                  >
                    <Menu.Items className="absolute right-0 z-10 mt-2.5 w-32 origin-top-right rounded-md bg-white py-2 shadow-lg ring-1 ring-gray-900/5 focus:outline-none">
                      {userNavigation.map((item) => (
                        <Menu.Item key={item.name}>
                          {({ active }) => (
                            <a
                              onClick={item.onClick}
                              className={classNames(
                                active ? "bg-gray-50" : "",
                                "block px-3 py-1 text-sm leading-6 text-gray-900",
                              )}
                            >
                              {item.name}
                            </a>
                          )}
                        </Menu.Item>
                      ))}
                    </Menu.Items>
                  </Transition>
                </Menu>
              </div>
            </div>
          </div>

          <main className="py-10">
            <div className="px-4 sm:px-6 lg:px-8">
              <Outlet />
            </div>
          </main>
        </div>
      </div>
    </>
  );
}
