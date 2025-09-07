"use client";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import ThemeToggler from "./ThemeToggler";
import menuData from "./menuData";

const Header = () => {
  // Navbar toggle
  const [navbarOpen, setNavbarOpen] = useState(false);
  const navbarToggleHandler = () => {
    setNavbarOpen(!navbarOpen);
  };

  // Sticky Navbar
  const [sticky, setSticky] = useState(false);
  const handleStickyNavbar = () => {
    if (window.scrollY >= 80) {
      setSticky(true);
    } else {
      setSticky(false);
    }
  };
  useEffect(() => {
    window.addEventListener("scroll", handleStickyNavbar);
  });

  // Mobile submenu handler
  const [mobileSubmenuOpen, setMobileSubmenuOpen] = useState<string | null>(null);

  const usePathName = usePathname();

  return (
    <>
      <header
        className={`header left-0 top-0 z-40 flex w-full items-center ${
          sticky
            ? "dark:bg-gray-dark dark:shadow-sticky-dark fixed z-[9999] bg-white !bg-opacity-80 shadow-sticky backdrop-blur-sm transition"
            : "absolute bg-transparent"
        }`}
      >
        <div className="container">
          <div className="relative -mx-4 flex items-center justify-between">
            <div className="w-60 max-w-full px-4 xl:mr-12">
              <Link
                href="/"
                className={`header-logo block w-full ${
                  sticky ? "py-5 lg:py-2" : "py-8"
                } `}
              >
                <Image
                  src="/images/logo/logo-2.svg"
                  alt="logo"
                  width={140}
                  height={30}
                  className="w-full dark:hidden"
                />
                <Image
                  src="/images/logo/logo.svg"
                  alt="logo"
                  width={140}
                  height={30}
                  className="hidden w-full dark:block"
                />
              </Link>
            </div>
            <div className="flex w-full items-center justify-between px-4">
              <div>
                <button
                  onClick={navbarToggleHandler}
                  id="navbarToggler"
                  aria-label="Mobile Menu"
                  className="absolute right-4 top-1/2 block translate-y-[-50%] rounded-lg px-3 py-[6px] ring-primary focus:ring-2 lg:hidden"
                >
                  <span
                    className={`relative my-1.5 block h-0.5 w-[30px] bg-black transition-all duration-300 dark:bg-white ${
                      navbarOpen ? " top-[7px] rotate-45" : " "
                    }`}
                  />
                  <span
                    className={`relative my-1.5 block h-0.5 w-[30px] bg-black transition-all duration-300 dark:bg-white ${
                      navbarOpen ? "opacity-0 " : " "
                    }`}
                  />
                  <span
                    className={`relative my-1.5 block h-0.5 w-[30px] bg-black transition-all duration-300 dark:bg-white ${
                      navbarOpen ? " top-[-8px] -rotate-45" : " "
                    }`}
                  />
                </button>
                
                {/* Desktop Navigation */}
                <nav
                  id="navbarCollapse"
                  className={`navbar absolute right-0 z-30 w-[250px] rounded border-[.5px] border-body-color/50 bg-white px-6 py-4 duration-300 dark:border-body-color/20 dark:bg-dark lg:visible lg:static lg:w-auto lg:border-none lg:!bg-transparent lg:p-0 lg:opacity-100 ${
                    navbarOpen
                      ? "visibility top-full opacity-100"
                      : "invisible top-[120%] opacity-0"
                  }`}
                >
                  <ul className="block lg:flex lg:space-x-12">
                    {menuData.map((menuItem, index) => (
                      <li key={index} className="group relative">
                        {menuItem.path ? (
                          <Link
                            href={menuItem.path}
                            className={`flex py-2 text-base lg:mr-0 lg:inline-flex lg:px-0 lg:py-6 ${
                              usePathName === menuItem.path
                                ? "text-primary dark:text-white"
                                : "text-dark hover:text-primary dark:text-white/70 dark:hover:text-white"
                            }`}
                          >
                            {menuItem.title}
                          </Link>
                        ) : (
                          <>
                            <p
                              onClick={() => {
                                if (window.innerWidth >= 1024) {
                                  // Desktop behavior
                                }
                              }}
                              className="flex cursor-pointer items-center justify-between py-2 text-base text-dark group-hover:text-primary dark:text-white/70 dark:group-hover:text-white lg:mr-0 lg:inline-flex lg:px-0 lg:py-6"
                            >
                              {menuItem.title}
                              <span className="pl-3">
                                <svg width="25" height="24" viewBox="0 0 25 24" className={`transform transition-transform duration-300 ${mobileSubmenuOpen === menuItem.title ? 'rotate-180' : ''}`}>
                                  <path
                                    fillRule="evenodd"
                                    clipRule="evenodd"
                                    d="M6.29289 8.8427C6.68342 8.45217 7.31658 8.45217 7.70711 8.8427L12 13.1356L16.2929 8.8427C16.6834 8.45217 17.3166 8.45217 17.7071 8.8427C18.0976 9.23322 18.0976 9.86639 17.7071 10.2569L12 15.964L6.29289 10.2569C5.90237 9.86639 5.90237 9.23322 6.29289 8.8427Z"
                                    fill="currentColor"
                                  />
                                </svg>
                              </span>
                            </p>
                            
                            {/* Desktop Dropdown */}
                            <div
                              className={`submenu relative left-0 top-full rounded-lg border border-blue-200 bg-white transition-all duration-300 ease-in-out group-hover:opacity-100 dark:border-blue-800 dark:bg-dark lg:invisible lg:absolute lg:top-[110%] lg:block lg:w-[650px] lg:p-6 lg:opacity-0 lg:shadow-lg lg:group-hover:visible lg:group-hover:top-full hidden lg:block`}
                            >
                              {menuItem.title === "Who we are?" && (
                                <div className="grid grid-cols-3 gap-8">
                                  <div className="space-y-4">
                                    <h4 className="text-sm font-semibold text-dark dark:text-white">Our Company</h4>
                                    <div className="space-y-3">
                                      <Link href="/our-company" className="block text-sm text-dark hover:text-primary dark:text-white/70 dark:hover:text-white">Our Company</Link>
                                      <Link href="/industries" className="block text-sm text-dark hover:text-primary dark:text-white/70 dark:hover:text-white">Industries</Link>
                                      <Link href="/diversity" className="block text-sm text-dark hover:text-primary dark:text-white/70 dark:hover:text-white">Diversity, Equity & Inclusion</Link>
                                      <Link href="/partners" className="block text-sm text-dark hover:text-primary dark:text-white/70 dark:hover:text-white">Our Partners</Link>
                                      <Link href="/sustainability" className="block text-sm text-dark hover:text-primary dark:text-white/70 dark:hover:text-white">Corporate Sustainability</Link>
                                      <Link href="/awards" className="block text-sm text-dark hover:text-primary dark:text-white/70 dark:hover:text-white">Awards</Link>
                                    </div>
                                  </div>
                                  <div className="space-y-4">
                                    <h4 className="text-sm font-semibold text-dark dark:text-white">In the News</h4>
                                    <div className="space-y-3">
                                      <Link href="/news" className="block text-sm text-dark hover:text-primary dark:text-white/70 dark:hover:text-white">In the News</Link>
                                      <Link href="/press" className="block text-sm text-dark hover:text-primary dark:text-white/70 dark:hover:text-white">Press Releases</Link>
                                      <Link href="/events" className="block text-sm text-dark hover:text-primary dark:text-white/70 dark:hover:text-white">Events</Link>
                                      <Link href="/insights" className="block text-sm text-dark hover:text-primary dark:text-white/70 dark:hover:text-white">Insights</Link>
                                      <Link href="/podcasts" className="block text-sm text-dark hover:text-primary dark:text-white/70 dark:hover:text-white">Podcasts</Link>
                                      <Link href="/whitepapers" className="block text-sm text-dark hover:text-primary dark:text-white/70 dark:hover:text-white">White Papers</Link>
                                    </div>
                                  </div>
                                  <div className="space-y-4">
                                    <h4 className="text-sm font-semibold text-dark dark:text-white">Connect With Us</h4>
                                    <div className="space-y-3">
                                      <Link href="/careers" className="block text-sm text-dark hover:text-primary dark:text-white/70 dark:hover:text-white">Careers</Link>
                                      <Link href="/contact" className="block text-sm text-dark hover:text-primary dark:text-white/70 dark:hover:text-white">Contact Us</Link>
                                    </div>
                                  </div>
                                </div>
                              )}
                              
                              {menuItem.title === "What we Offer?" && (
                                <div className="grid grid-cols-3 gap-8">
                                  <div className="space-y-4">
                                    <h4 className="text-sm font-semibold text-dark dark:text-white">Services</h4>
                                    <div className="space-y-3">
                                      <Link href="/services" className="block text-sm text-dark hover:text-primary dark:text-white/70 dark:hover:text-white">Services</Link>
                                      <Link href="/digital-strategy" className="block text-sm text-dark hover:text-primary dark:text-white/70 dark:hover:text-white">Digital Strategy</Link>
                                      <Link href="/technology-consulting" className="block text-sm text-dark hover:text-primary dark:text-white/70 dark:hover:text-white">Technology Consulting</Link>
                                      <Link href="/cloud-solutions" className="block text-sm text-dark hover:text-primary dark:text-white/70 dark:hover:text-white">Cloud Solutions</Link>
                                      <Link href="/ai-ml" className="block text-sm text-dark hover:text-primary dark:text-white/70 dark:hover:text-white">AI & Machine Learning</Link>
                                    </div>
                                  </div>
                                  <div className="space-y-4">
                                    <h4 className="text-sm font-semibold text-dark dark:text-white">Solutions</h4>
                                    <div className="space-y-3">
                                      <Link href="/solutions" className="block text-sm text-dark hover:text-primary dark:text-white/70 dark:hover:text-white">Solutions</Link>
                                      <Link href="/enterprise-modernization" className="block text-sm text-dark hover:text-primary dark:text-white/70 dark:hover:text-white">Enterprise Modernization</Link>
                                      <Link href="/data-analytics" className="block text-sm text-dark hover:text-primary dark:text-white/70 dark:hover:text-white">Data Analytics</Link>
                                      <Link href="/cybersecurity" className="block text-sm text-dark hover:text-primary dark:text-white/70 dark:hover:text-white">Cybersecurity</Link>
                                      <Link href="/digital-banking" className="block text-sm text-dark hover:text-primary dark:text-white/70 dark:hover:text-white">Digital Banking</Link>
                                    </div>
                                  </div>
                                  <div className="space-y-4">
                                    <h4 className="text-sm font-semibold text-dark dark:text-white">Connect With Us</h4>
                                    <div className="space-y-3">
                                      <Link href="/careers" className="block text-sm text-dark hover:text-primary dark:text-white/70 dark:hover:text-white">Careers</Link>
                                      <Link href="/contact" className="block text-sm text-dark hover:text-primary dark:text-white/70 dark:hover:text-white">Contact Us</Link>
                                    </div>
                                  </div>
                                </div>
                              )}
                            </div>
                          </>
                        )}
                      </li>
                    ))}
                  </ul>
                </nav>
              </div>
              <div className="flex items-center justify-end pr-16 lg:pr-0">
                <div>
                  <ThemeToggler />
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Mobile Slide-In Menu */}
        <div className={`fixed inset-0 z-50 transform transition-transform duration-300 ease-in-out lg:hidden ${navbarOpen ? 'translate-x-0' : 'translate-x-full'}`}>
          <div className="absolute inset-0 bg-black bg-opacity-30" onClick={() => setNavbarOpen(false)}></div>
          <div className="absolute right-0 top-0 h-full w-80 bg-white dark:bg-gray-900 shadow-xl">
            <div className="flex flex-col h-full">
              <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-700">
                <Image
                  src="/images/logo/logo-2.svg"
                  alt="logo"
                  width={100}
                  height={25}
                  className="dark:hidden"
                />
                <Image
                  src="/images/logo/logo.svg"
                  alt="logo"
                  width={100}
                  height={25}
                  className="hidden dark:block"
                />
                <button
                  onClick={() => setNavbarOpen(false)}
                  className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
              
              <div className="flex-1 overflow-y-auto py-3 px-4">
                <ul className="space-y-2">
                  {menuData.map((menuItem, index) => (
                    <li key={index}>
                      {menuItem.path ? (
                        <Link
                          href={menuItem.path}
                          className="block py-2.5 px-4 text-base text-dark hover:bg-gray-100 rounded-md dark:text-white dark:hover:bg-gray-800"
                          onClick={() => setNavbarOpen(false)}
                        >
                          {menuItem.title}
                        </Link>
                      ) : (
                        <div>
                          <button
                            onClick={() => setMobileSubmenuOpen(
                              mobileSubmenuOpen === menuItem.title ? null : menuItem.title
                            )}
                            className="flex items-center justify-between w-full py-2.5 px-4 text-base text-dark hover:bg-gray-100 rounded-md dark:text-white dark:hover:bg-gray-800"
                          >
                            {menuItem.title}
                            <svg 
                              xmlns="http://www.w3.org/2000/svg" 
                              className={`h-4 w-4 transition-transform duration-300 ${mobileSubmenuOpen === menuItem.title ? 'rotate-180' : ''}`}
                              fill="none" 
                              viewBox="0 0 24 24" 
                              stroke="currentColor"
                            >
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                            </svg>
                          </button>
                          
                          <div className={`overflow-hidden transition-all duration-300 ease-in-out ${mobileSubmenuOpen === menuItem.title ? 'max-h-screen' : 'max-h-0'}`}>
                            {menuItem.title === "Who we are?" && (
                              <div className="pl-6 py-2 space-y-4">
                                <div>
                                  <h4 className="text-base font-bold text-dark dark:text-white mb-2">Our Company</h4>
                                  <div className="space-y-2">
                                    <Link href="/industries" className="block text-sm text-blue-700 dark:text-blue-300 py-1.5" onClick={() => setNavbarOpen(false)}>Industries</Link>
                                    <Link href="/diversity" className="block text-sm text-blue-700 dark:text-blue-300 py-1.5" onClick={() => setNavbarOpen(false)}>Diversity, Equity & Inclusion</Link>
                                    <Link href="/partners" className="block text-sm text-blue-700 dark:text-blue-300 py-1.5" onClick={() => setNavbarOpen(false)}>Our Partners</Link>
                                    <Link href="/sustainability" className="block text-sm text-blue-700 dark:text-blue-300 py-1.5" onClick={() => setNavbarOpen(false)}>Corporate Sustainability</Link>
                                    <Link href="/awards" className="block text-sm text-blue-700 dark:text-blue-300 py-1.5" onClick={() => setNavbarOpen(false)}>Awards</Link>
                                  </div>
                                </div>
                                
                                <div>
                                  <h4 className="text-base font-bold text-dark dark:text-white mb-2">In the News</h4>
                                  <div className="space-y-2">
                                    <Link href="/press" className="block text-sm text-blue-700 dark:text-blue-300 py-1.5" onClick={() => setNavbarOpen(false)}>Press Releases</Link>
                                    <Link href="/events" className="block text-sm text-blue-700 dark:text-blue-300 py-1.5" onClick={() => setNavbarOpen(false)}>Events</Link>
                                    <Link href="/insights" className="block text-sm text-blue-700 dark:text-blue-300 py-1.5" onClick={() => setNavbarOpen(false)}>Insights</Link>
                                    <Link href="/podcasts" className="block text-sm text-blue-700 dark:text-blue-300 py-1.5" onClick={() => setNavbarOpen(false)}>Podcasts</Link>
                                    <Link href="/whitepapers" className="block text-sm text-blue-700 dark:text-blue-300 py-1.5" onClick={() => setNavbarOpen(false)}>White Papers</Link>
                                  </div>
                                </div>
                              </div>
                            )}
                            
                            {menuItem.title === "What we Offer?" && (
                              <div className="pl-6 py-2 space-y-4">
                                <div>
                                  <h4 className="text-base font-bold text-dark dark:text-white mb-2">Services</h4>
                                  <div className="space-y-2">
                                    <Link href="/digital-strategy" className="block text-sm text-blue-700 dark:text-blue-300 py-1.5" onClick={() => setNavbarOpen(false)}>Digital Strategy</Link>
                                    <Link href="/technology-consulting" className="block text-sm text-blue-700 dark:text-blue-300 py-1.5" onClick={() => setNavbarOpen(false)}>Technology Consulting</Link>
                                    <Link href="/cloud-solutions" className="block text-sm text-blue-700 dark:text-blue-300 py-1.5" onClick={() => setNavbarOpen(false)}>Cloud Solutions</Link>
                                    <Link href="/ai-ml" className="block text-sm text-blue-700 dark:text-blue-300 py-1.5" onClick={() => setNavbarOpen(false)}>AI & Machine Learning</Link>
                                  </div>
                                </div>
                                
                                <div>
                                  <h4 className="text-base font-bold text-dark dark:text-white mb-2">Solutions</h4>
                                  <div className="space-y-2">
                                    <Link href="/enterprise-modernization" className="block text-sm text-blue-700 dark:text-blue-300 py-1.5" onClick={() => setNavbarOpen(false)}>Enterprise Modernization</Link>
                                    <Link href="/data-analytics" className="block text-sm text-blue-700 dark:text-blue-300 py-1.5" onClick={() => setNavbarOpen(false)}>Data Analytics</Link>
                                    <Link href="/cybersecurity" className="block text-sm text-blue-700 dark:text-blue-300 py-1.5" onClick={() => setNavbarOpen(false)}>Cybersecurity</Link>
                                    <Link href="/digital-banking" className="block text-sm text-blue-700 dark:text-blue-300 py-1.5" onClick={() => setNavbarOpen(false)}>Digital Banking</Link>
                                  </div>
                                </div>
                              </div>
                            )}
                          </div>
                        </div>
                      )}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </header>
    </>
  );
};

export default Header;