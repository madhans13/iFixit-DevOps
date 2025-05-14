const guides = [
  {
    title: "iPhone 13 Battery Replacement",
    category: "repair",
    difficulty: 3,
    timeRequired: {
      value: 45,
      unit: "minutes"
    },
    introduction: "Replace your iPhone 13's battery when it no longer holds a charge or has significantly degraded performance.",
    prerequisites: [
      "Replacement battery",
      "Phillips #000 screwdriver",
      "Suction cup",
      "Spudger",
      "Anti-static mat"
    ],
    steps: [
      {
        order: 1,
        title: "Power Off Device",
        description: "Power down your iPhone completely before beginning the repair.",
        warnings: ["Ensure the device is completely powered off to avoid electrical hazards"],
        tips: ["Hold the power and volume buttons until the slide to power off appears"]
      },
      {
        order: 2,
        title: "Remove Display Screws",
        description: "Remove the two pentalobe screws at the bottom of the iPhone using a P2 pentalobe screwdriver.",
        warnings: ["Keep screws organized and labeled"],
        tips: ["Use a magnetic mat to keep screws from getting lost"]
      },
      {
        order: 3,
        title: "Separate Display",
        description: "Use the suction cup to carefully lift the display and separate it from the frame.",
        warnings: ["Do not fully separate the display - it's still connected by cables"],
        tips: ["Apply even pressure when lifting to avoid damage"]
      }
    ]
  },
  {
    title: "MacBook Pro 2021 RAM Upgrade",
    category: "upgrade",
    difficulty: 4,
    timeRequired: {
      value: 1,
      unit: "hours"
    },
    introduction: "Upgrade your MacBook Pro's RAM to improve performance and multitasking capabilities.",
    prerequisites: [
      "Compatible RAM modules",
      "Phillips head screwdriver",
      "Anti-static wrist strap",
      "Spudger"
    ],
    steps: [
      {
        order: 1,
        title: "Prepare Workspace",
        description: "Clear your workspace and put on an anti-static wrist strap.",
        warnings: ["Static electricity can damage components"],
        tips: ["Work on a clean, well-lit surface"]
      },
      {
        order: 2,
        title: "Remove Bottom Case",
        description: "Remove the 10 screws securing the bottom case using a P5 pentalobe screwdriver.",
        warnings: ["Screws are different lengths - note their positions"],
        tips: ["Create a diagram of screw positions"]
      }
    ]
  },
  {
    title: "Dell XPS 15 Screen Replacement",
    category: "repair",
    difficulty: 3,
    timeRequired: {
      value: 90,
      unit: "minutes"
    },
    introduction: "Replace a cracked or malfunctioning screen on your Dell XPS 15.",
    prerequisites: [
      "Replacement screen",
      "Phillips screwdriver",
      "Plastic pry tool",
      "Clean microfiber cloth"
    ],
    steps: [
      {
        order: 1,
        title: "Remove Bezel",
        description: "Carefully pry off the display bezel starting from the corners.",
        warnings: ["Bezel clips can break easily"],
        tips: ["Use a plastic tool to avoid scratching"]
      },
      {
        order: 2,
        title: "Disconnect Display Cable",
        description: "Remove the screws securing the display cable and disconnect it.",
        warnings: ["Handle cables with care"],
        tips: ["Take photos of cable routing"]
      }
    ]
  }
];

module.exports = guides; 