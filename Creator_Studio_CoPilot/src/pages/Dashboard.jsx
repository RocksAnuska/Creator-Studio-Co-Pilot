


// 1. Headless UI Imports for Navbar
import { Disclosure, DisclosureButton, DisclosurePanel, Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react'
import { Bars3Icon, BellIcon, XMarkIcon } from '@heroicons/react/24/outline'

// 2. Helper function to conditionally join Tailwind CSS classes
function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
}

// 3. Navbar Component Definition (Full Width from Top)
const Navbar = () => {
    // Navigation links (optional)
    const navigation = [
        { name: 'Features', href: '#features', current: true },
        { name: 'Pricing', href: '#pricing', current: false },
        { name: 'Login', href: '#loginPage.jsx', current: false },
    ]

    // Customizing the logo/website name section
    const websiteName = "Creator Studio Co-Pilot"
    const logoSrc = "logo.png" // Replace with your actual logo path

    return (
        <Disclosure
            as="nav"
            // The 'w-full' ensures it takes full width, and placing it first in <main> ensures it's at the top
            className="fixed top-0 left-0 right-0 bg-gray-900 shadow-lg w-full z-50"
        >
            <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
                <div className="relative flex h-16 items-center justify-between">

                    {/* Left side: Logo and Website Name (and Mobile menu button) */}
                    <div className="flex flex-1 items-center justify-start">
                        {/* Mobile menu button for small screens */}
                        <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
                            <DisclosureButton className="group relative inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
                                <span className="sr-only">Open main menu</span>
                                <Bars3Icon aria-hidden="true" className="block h-6 w-6 group-data-open:hidden" />
                                <XMarkIcon aria-hidden="true" className="hidden h-6 w-6 group-data-open:block" />
                            </DisclosureButton>
                        </div>

                        <div className="flex shrink-0 items-center">
                            {/* Logo */}
                            <img
                                alt={websiteName}
                                src={logoSrc}
                                className="h-8 w-auto"
                            />
                            {/* Website Name */}
                            <h1 className="text-xl font-bold ml-3 text-white hidden sm:block">
                                {websiteName}
                            </h1>
                        </div>

                        {/* Desktop Navigation Links (Optional) */}
                        <div className="hidden sm:ml-6 sm:block">
                            <div className="flex space-x-4">
                                {navigation.map((item) => (
                                    <a
                                        key={item.name}
                                        href={item.href}
                                        aria-current={item.current ? 'page' : undefined}
                                        className={classNames(
                                            item.current ? 'bg-gray-700 text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-white',
                                            'rounded-md px-3 py-2 text-sm font-medium',
                                        )}
                                    >
                                        {item.name}
                                    </a>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Right side: Notification and User Profile with Dropdown */}
                    <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
                        {/* Notification Button */}
                        <button
                            type="button"
                            className="relative rounded-full bg-gray-800 p-1 text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
                        >
                            <span className="absolute -inset-1.5" />
                            <span className="sr-only">View notifications</span>
                            <BellIcon aria-hidden="true" className="h-6 w-6" />
                        </button>

                        {/* Profile dropdown */}
                        <Menu as="div" className="relative ml-3">
                            <div>
                                <MenuButton className="relative flex rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
                                    <span className="absolute -inset-1.5" />
                                    <span className="sr-only">Open user menu</span>
                                    <img
                                        alt="User Photo"
                                        src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                                        className="h-8 w-8 rounded-full"
                                    />
                                </MenuButton>
                            </div>
                            <MenuItems
                                transition
                                className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 transition focus:outline-none data-closed:scale-95 data-closed:transform data-closed:opacity-0 data-enter:duration-100 data-enter:ease-out data-leave:duration-75 data-leave:ease-in"
                            >
                                <MenuItem>
                                    {({ focus }) => (
                                        <a
                                            href="#"
                                            className={classNames(focus ? 'bg-gray-100' : '', 'block px-4 py-2 text-sm text-gray-700')}
                                        >
                                            Your Profile
                                        </a>
                                    )}
                                </MenuItem>
                                <MenuItem>
                                    {({ focus }) => (
                                        <a
                                            href="#"
                                            className={classNames(focus ? 'bg-gray-100' : '', 'block px-4 py-2 text-sm text-gray-700')}
                                        >
                                            Settings
                                        </a>
                                    )}
                                </MenuItem>
                                <MenuItem>
                                    {({ focus }) => (
                                        <a
                                            href="#"
                                            className={classNames(focus ? 'bg-gray-100' : '', 'block px-4 py-2 text-sm text-gray-700')}
                                        >
                                            Sign out
                                        </a>
                                    )}
                                </MenuItem>
                            </MenuItems>
                        </Menu>
                    </div>
                </div>
            </div>

            {/* Mobile menu panel */}
            <DisclosurePanel className="sm:hidden">
                <div className="space-y-1 px-2 pt-2 pb-3">
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


const App = () => {

    const Card = ({ title, description, icon }) => {
        return (
            // Note: 'p-50' is not a standard Tailwind class. I've left it as is.
            <span className="bg-gradient text-blue border-2 h-[350px] w-[600px] gap-6 p-8 rounded-2xl flex w-full bg-gradient border-blue-200 hover:shadow-lg hover:shadow-blue-200/20 hover:-translate-y-1 transition-all duration-300 cursor-pointer">
                <div className="flex flex-col space-y-2">
                    <h2 className='text-blue text-xl font-semibold'>{title}</h2>
                    <p className="text-gray-700">{description}</p>
                </div>
                {/* <p>{icon}</p> */}
            </span>
        )
    }

    return (
        <main className="min-h-screen"> {/* Ensure main takes up at least the screen height */}
            {/* Navbar is at the very top of the main content */}
            <Navbar />

            {/* Rest of your content */}
            <div className="pattern" />
            <div className="wrapper">
                <header>
                    <h1>What do you want to <span className="text-gradient">Create</span> today</h1>
                </header>
                <h2 className='text-center text-gradient'>Convert Your ideas into content within Thanos Snap</h2>
            </div>

            {/* Corrected: Use a container (e.g., div) to hold the textarea and the button */}
            <div className='flex flex-col items-center mx-10 mt-10'>
                <div className="relative w-2/3">
                    <textarea
                        placeholder='I want to create educational video'
                        className='bg-white border-purple p-4 w-full h-32 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-purple-500 resize-none'
                    />
                    {/* The button is now correctly positioned next to the textarea or inside its container */}
                    <button className='absolute bottom-4 right-4 bg-gray-900 text-white px-4 py-2 rounded-lg hover:bg-gray-700 transition duration-150'>
                        Generate🪄
                    </button>
                </div>
            </div>

            <div className="flex flex-col md:flex-row gap-12 justify-center items-start p-10">
                <div className='flex flex-col space-y-8 w-full md:w-1/3'>
                    <Card title="Thumbnail" description="Generate eye-catching thumbnails" />
                    <Card title="Hashtags" description="AI-powered hashtag suggestions" />
                </div>

                <div className='flex flex-col space-y-8 w-full md:w-1/3'>
                    <Card title="Script" description="Create engaging video scripts" />
                    <Card title="Color Palette" description="Beautiful color schemes" />
                </div>
            </div>
        </main>
    )
}

export default App