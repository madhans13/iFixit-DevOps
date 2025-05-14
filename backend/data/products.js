const products = [
  {
    name: "Pro Tech Toolkit",
    description: "Professional repair toolkit with 64 precision bits and all essential repair tools.",
    category: "tool",
    price: {
      value: 69.99,
      currency: "USD"
    },
    stock: 50,
    specifications: {
      "Kit Contents": "64 precision bits, driver handle, spudger, tweezers, opening tools",
      "Case Material": "EVA foam and ballistic nylon",
      "Warranty": "Lifetime warranty on bits"
    },
    features: [
      "64 precision bits",
      "Anti-static design",
      "Durable carrying case",
      "Professional-grade tools"
    ],
    weight: {
      value: 450,
      unit: "g"
    }
  },
  {
    name: "iPhone 13 Replacement Battery",
    description: "Genuine replacement battery for iPhone 13 with full capacity.",
    category: "part",
    price: {
      value: 49.99,
      currency: "USD"
    },
    stock: 100,
    specifications: {
      "Capacity": "3227 mAh",
      "Voltage": "3.81V",
      "Compatibility": "iPhone 13",
      "Type": "Li-ion"
    },
    compatibility: [
      {
        models: ["iPhone 13"]
      }
    ],
    manufacturer: {
      name: "Apple",
      partNumber: "A2628"
    },
    weight: {
      value: 40,
      unit: "g"
    }
  },
  {
    name: "MacBook Pro Display Assembly",
    description: "Complete display assembly for MacBook Pro 2021 (14-inch)",
    category: "part",
    price: {
      value: 599.99,
      currency: "USD"
    },
    stock: 15,
    specifications: {
      "Size": "14 inch",
      "Resolution": "3024 x 1964",
      "Type": "Mini-LED",
      "Compatibility": "MacBook Pro 2021"
    },
    compatibility: [
      {
        models: ["MacBook Pro 14-inch 2021"]
      }
    ],
    manufacturer: {
      name: "Apple",
      partNumber: "A2442"
    },
    weight: {
      value: 450,
      unit: "g"
    }
  },
  {
    name: "Anti-Static Mat",
    description: "Professional anti-static mat with grounding wire for safe electronics repair",
    category: "tool",
    price: {
      value: 24.99,
      currency: "USD"
    },
    stock: 75,
    specifications: {
      "Size": "24 x 36 inches",
      "Material": "Multi-layer vinyl",
      "Resistance": "10^6 - 10^9 ohms",
      "Includes": "Grounding wire and wrist strap"
    },
    features: [
      "Anti-static surface",
      "Heat resistant",
      "Includes grounding wire",
      "Non-slip bottom"
    ],
    weight: {
      value: 680,
      unit: "g"
    },
    dimensions: {
      length: 610,
      width: 915,
      height: 2,
      unit: "mm"
    }
  }
];

module.exports = products; 