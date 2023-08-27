import React, { useState } from "react";
import { FaBars, FaTimes } from "react-icons/fa";

const Navbar = () => {
  const [nav, setNav] = useState(false);
  const handleClick = () => setNav(!nav);
  return (
    <div className="fixed w-full h-[60px] flex justify-between items-center px-8 bg-[#0a192f] text-gray-300 z-10">
      <div className="text-2xl">SIM Detector</div>

      {/* menu */}
      {/* <ul className="hidden md:flex">
        <li>Home</li>
        <li>Education</li>
        <li>Skills</li>
        <li>Work</li>
        <li>Contact</li>
      </ul> */}

      {/* Hamburger */}
      <div onClick={handleClick} className="md:hidden z-10">
        {!nav ? (
          <FaBars className="scale-125" />
        ) : (
          <FaTimes className="scale-125" />
        )}
      </div>

      {/* Sign in */}
        <div className="hidden md:block">
            <button className="bg-[#0a192f] text-gray-300 border border-gray-300 px-4 py-2 rounded-md hover:bg-gray-300 hover:text-[#0a192f] transition duration-300 ease-in-out mx-1">
                Sign in
            </button>
            <button className="bg-[#0a192f] text-gray-300 border border-gray-300 px-4 py-2 rounded-md hover:bg-gray-300 hover:text-[#0a192f] transition duration-300 ease-in-out">
                Sign up
            </button>
        </div>
        

      {/* Mobile menu */}
      {/* <ul className={!nav ? "menu-hide" : "menu-show"}>
        <li className="py-5 text-xl">Home</li>
        <li className="py-5 text-xl">Education</li>
        <li className="py-5 text-xl">Skills</li>
        <li className="py-5 text-xl">Work</li>
        <li className="py-5 text-xl">Contact</li>
      </ul> */}
    </div>
  );
};

export default Navbar;
