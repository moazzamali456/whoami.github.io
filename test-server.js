import { exec } from 'child_process';
import path from 'path';

const frontendPath = path.join(process.cwd(), 'frontend');

console.log('Testing React app startup...');
console.log('Frontend path:', frontendPath);

// Change to frontend directory and run dev server
process.chdir(frontendPath);

exec('npm run dev', (error, stdout, stderr) => {
  if (error) {
    console.error('Error starting dev server:', error);
    return;
  }
  
  if (stderr) {
    console.error('Stderr:', stderr);
  }
  
  console.log('Stdout:', stdout);
});

// Keep process alive for a few seconds to see output
setTimeout(() => {
  console.log('Test completed');
  process.exit(0);
}, 10000);
