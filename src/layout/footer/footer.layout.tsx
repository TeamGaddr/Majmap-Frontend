const Footer = () => {
    return (
      <footer className="w-full bg-transparent py-10 px-4">
        <div className="max-w-screen-lg mx-10">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
            <div>
              <h1 className="text-[#131b62] font-bold text-2xl sm:text-2xl">
                MajMap
              </h1>
            </div>
  
            <div>
              <h3 className="font-semibold text-lg">Get Started</h3>
              <ul>
                <li>
                  <a href="#" className="text-gray-700 hover:text-blue-500">Pricing</a>
                </li>
                <li>
                  <a href="#" className="text-gray-700 hover:text-blue-500">Individual</a>
                </li>
                <li>
                  <a href="#" className="text-gray-700 hover:text-blue-500">Team</a>
                </li>
                <li>
                  <a href="#" className="text-gray-700 hover:text-blue-500">Enterprise</a>
                </li>
              </ul>
            </div>
  
            <div>
              <h3 className="font-semibold text-lg">Products</h3>
              <ul>
                <li>
                  <a href="#" className="text-gray-700 hover:text-blue-500">Majmap Overview</a>
                </li>
                <li>
                  <a href="#" className="text-gray-700 hover:text-blue-500">Majmap Scale</a>
                </li>
                <li>
                  <a href="#" className="text-gray-700 hover:text-blue-500">Integrations</a>
                </li>
                <li>
                  <a href="#" className="text-gray-700 hover:text-blue-500">Security</a>
                </li>
              </ul>
            </div>
  
            <div>
              <h3 className="font-semibold text-lg">Use Cases</h3>
              <ul>
                <li>
                  <a href="#" className="text-gray-700 hover:text-blue-500">Create process maps and flowcharts</a>
                </li>
                <li>
                  <a href="#" className="text-gray-700 hover:text-blue-500">Create technical diagrams</a>
                </li>
                <li>
                  <a href="#" className="text-gray-700 hover:text-blue-500">Document systems and architecture</a>
                </li>
                <li>
                  <a href="#" className="text-gray-700 hover:text-blue-500">Education</a>
                </li>
              </ul>
            </div>
          </div>
  
          <div className="border-t mt-8 pt-4">
            <div className="flex flex-col sm:flex-row justify-between items-center">
              <p className="text-gray-500 text-sm">
                &copy; 2025 Majmap. All rights reserved.
              </p>
            </div>
          </div>
        </div>
      </footer>
    );
  };
  
  export default Footer;