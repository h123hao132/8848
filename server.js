import express from 'express';
import { execSync } from 'child_process';
import fs from 'fs';
import path from 'path';
import cors from 'cors';

const app = express();
const PORT = 3001;

// Get current directory in ES module
const __dirname = path.dirname(new URL(import.meta.url).pathname);

app.use(cors());
app.use(express.json());

app.post('/execute', (req, res) => {
  const { code } = req.body;
  
  if (!code) {
    return res.json({ error: 'No code provided' });
  }
  
  // Create a temporary Python file
  const tempFile = path.join(__dirname, `temp_${Date.now()}.py`);
  
  try {
    // Write code to temporary file
    fs.writeFileSync(tempFile, code);
    
    // Execute the Python code
    const output = execSync(`python3 ${tempFile}`, { timeout: 5000, encoding: 'utf8' });
    
    // Clean up temporary file
    fs.unlinkSync(tempFile);
    
    res.json({ output });
  } catch (error) {
    // Clean up temporary file
    if (fs.existsSync(tempFile)) {
      fs.unlinkSync(tempFile);
    }
    
    res.json({ error: error.message });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});