import React from 'react';

const Footer = () => {
  return (
    <footer className="w-full bg-neutral-900">
      <div className="w-full px-12 py-6 bg-neutral-900 shadow-[0px_4px_8px_0px_rgba(0,0,0,0.20)] outline outline-1 outline-offset-[-1px] outline-black flex justify-start items-center gap-12">
      
      <div className="py-1 px-4">
        <div className="max-w-screen-lg mx-10">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
            <div>
              <h1 className="text-purple-400 font-bold text-2xl sm:text-2xl">
                MajMap
              </h1>
            </div>

            <div>
              <h3 className="font-semibold text-lg text-white">Get Started</h3>
              <ul className="mt-2 space-y-2">
                <li>
                  <a href="#" className="text-neutral-200 hover:text-purple-400 transition-colors">Pricing</a>
                </li>
                <li>
                  <a href="#" className="text-neutral-200 hover:text-purple-400 transition-colors">Individual</a>
                </li>
                <li>
                  <a href="#" className="text-neutral-200 hover:text-purple-400 transition-colors">Team</a>
                </li>
                <li>
                  <a href="#" className="text-neutral-200 hover:text-purple-400 transition-colors">Enterprise</a>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="font-semibold text-lg text-white">Products</h3>
              <ul className="mt-2 space-y-2">
                <li>
                  <a href="#" className="text-neutral-200 hover:text-purple-400 transition-colors">Majmap Overview</a>
                </li>
                <li>
                  <a href="#" className="text-neutral-200 hover:text-purple-400 transition-colors">Majmap Scale</a>
                </li>
                <li>
                  <a href="#" className="text-neutral-200 hover:text-purple-400 transition-colors">Integrations</a>
                </li>
                <li>
                  <a href="#" className="text-neutral-200 hover:text-purple-400 transition-colors">Security</a>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="font-semibold text-lg text-white">Use Cases</h3>
              <ul className="mt-2 space-y-2">
                <li>
                  <a href="#" className="text-neutral-200 hover:text-purple-400 transition-colors">Create process maps and flowcharts</a>
                </li>
                <li>
                  <a href="#" className="text-neutral-200 hover:text-purple-400 transition-colors">Create technical diagrams</a>
                </li>
                <li>
                  <a href="#" className="text-neutral-200 hover:text-purple-400 transition-colors">Document systems and architecture</a>
                </li>
                <li>
                  <a href="#" className="text-neutral-200 hover:text-purple-400 transition-colors">Education</a>
                </li>
              </ul>
            </div>
          </div>

          <div className="border-t border-neutral-800 mt-8 pt-4">
            <div className="flex flex-col sm:flex-row justify-between items-center">
              <p className="text-neutral-400 text-sm">
                &copy; 2025 Majmap. All rights reserved.
              </p>
            </div>
          </div>
        </div>
      </div>
      </div>
    </footer>
    
  );
};

export default Footer;