const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB Connection
mongoose.connect('mongodb://127.0.0.1:27017/ifixit', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => {
  console.log('Connected to MongoDB');
}).catch(err => {
  console.error('Error connecting to MongoDB:', err);
});

// Schema for Guide Data
const guideSchema = new mongoose.Schema({
  guideType: String,
  device: String,
  title: String,
  details: String,
  steps: String,
});

const Guide = mongoose.model('Guide', guideSchema);  // 'Guide' model

// API Endpoint to Create a New Guide
app.post('/api/guides', async (req, res) => {
  try {
    const newGuide = new Guide(req.body);  // Create a new Guide object from the request body
    const savedGuide = await newGuide.save(); // Save the guide to the database
    res.status(201).json(savedGuide);  // Send a 201 Created response with the saved guide data
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to create guide' }); // Send a 500 error if something goes wrong
  }
});

//  New API Endpoint to Insert Sample Data (Optional, for demonstration)
app.post('/api/guides/seed', async (req, res) => {
    try {
        //  Check if the collection is already populated
        const existingGuide = await Guide.findOne();
        if (existingGuide) {
            return res.status(200).json({ message: 'Sample data already exists.' });
        }

        //  Sample data to insert
        const sampleGuides = [
            {
                guideType: "Repair",
                device: "Laptop X",
                title: "Laptop X Screen Replacement",
                details: "Replace the screen on your Laptop X",
                steps: "1. Remove bezel, 2. Disconnect cable, 3. Install new screen"
            },
            {
                guideType: "Teardown",
                device: "Phone Y",
                title: "Phone Y Teardown",
                details: "Disassemble Phone Y to its components",
                steps: "1. Remove back cover, 2. Disconnect battery, 3. Remove logic board"
            },
            {
                guideType: "Repair",
                device: "Laptop Z",
                title: "Laptop Z Battery Replacement",
                details: "Replace the battery on your Laptop Z",
                steps: "1. Open the case, 2. Disconnect the old battery, 3. Connect the new battery"
            }
        ];

        //  Insert the sample data
        const insertedGuides = await Guide.insertMany(sampleGuides);
        res.status(201).json({ message: 'Sample data inserted successfully', data: insertedGuides });
    } catch (error) {
        console.error("Error inserting sample data:", error);
        res.status(500).json({ error: "Failed to insert sample data" });
    }
});



// Start server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
