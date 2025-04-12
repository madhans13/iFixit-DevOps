  import React from "react";
  import { Menu } from "lucide-react";
  import { motion } from "framer-motion";
  import './BatteryReplacement.css'

  const BatteryReplacement = () => {
    const steps = [
      {
        title: "Step 1: Power Off and Prepare",
        description:
          "Turn off the laptop completely and unplug it from any power source. Place the device on a soft, static-free surface.",
        image: "https://www.ifixit.com/igi/XnQpoQmf42GLZgCp.large",
      },
      {
        title: "Step 2: Remove the Back Panel",
        description:
          "Use a screwdriver to unscrew the screws holding the back panel. Carefully lift it to expose internal components.",
        image: "https://www.ifixit.com/igi/DDFjCIhDZRnZXEZD.large",
      },
      {
        title: "Step 3: Locate and Disconnect the Battery",
        description:
          "Find the battery inside. Gently unplug the battery connector from the motherboard to disconnect power.",
        image: "https://www.ifixit.com/igi/oHV3EoXcHhBuTVFt.large",
      },
      {
        title: "Step 4: Unscrew and Remove the Battery",
        description:
          "Unscrew the screws securing the battery. Carefully lift and remove the battery from the laptop.",
        image: "https://www.ifixit.com/igi/xuwTiEoTXK5FCZlH.large",
      },
      {
        title: "Step 5: Insert the New Battery",
        description:
          "Place the new battery in the compartment, aligning it correctly. Reconnect the battery cable to the motherboard.",
        image: "https://www.ifixit.com/igi/IywsBhvKk6hBvYDZ.large",
      },
      {
        title: "Step 6: Reassemble and Power On",
        description:
          "Reattach the back panel and screw it in. Power on the laptop to test the new battery installation.",
        image: "https://www.ifixit.com/igi/vT7VnT7gIfaYcFdS.large",
      },
    ];

    return (
      <div className="min-h-screen bg-white flex">
        {/* Sidebar */}
        <div className="w-64 border-r p-4 hidden md:block">
          <h2 className="text-xl font-semibold mb-4">Categories</h2>
          <ul className="space-y-2">
            <li className="text-blue-600 font-medium cursor-pointer">Battery Replacement</li>
            <li className="cursor-pointer hover:text-blue-600">Screen Replacement</li>
            <li className="cursor-pointer hover:text-blue-600">Keyboard Issues</li>
            <li className="cursor-pointer hover:text-blue-600">Motherboard</li>
          </ul>
        </div>

        {/* Main content */}
        <div className="flex-1 p-6">
          <div className="flex items-center justify-between mb-6">
            <h1 className="text-3xl font-bold text-gray-800">Battery Replacement</h1>
            <Menu className="h-6 w-6 md:hidden" />
          </div>

          <div className="mb-8">
            <p className="text-sm text-gray-600">By Madhan | April 11, 2025</p>
          </div>

          {/* Steps */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {steps.map((step, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                className="bg-white rounded-2xl shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300"
              >
                <img
                  src={step.image}
                  alt={`Step ${index + 1}`}
                  className="w-full h-48 object-cover"
                />
                <div className="p-4">
                  <h2 className="text-lg font-semibold mb-2">{step.title}</h2>
                  <p className="text-gray-600 text-sm">{step.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    );
  };

  export default BatteryReplacement;
