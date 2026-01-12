import fs from 'fs';
import archiver from 'archiver';

// Generate timestamp in format: YYYYMMDD-HHMMSS
const now = new Date();
const year = now.getFullYear();
const month = String(now.getMonth() + 1).padStart(2, '0');
const day = String(now.getDate()).padStart(2, '0');
const hours = String(now.getHours()).padStart(2, '0');
const minutes = String(now.getMinutes()).padStart(2, '0');
const seconds = String(now.getSeconds()).padStart(2, '0');
const timestamp = `${year}${month}${day}-${hours}${minutes}${seconds}`;

// Create both timestamped and non-timestamped versions
const timestampedFilename = `hello3dmcp-server-${timestamp}.mcpb`;
const productionFilename = `hello3dmcp-server.mcpb`;

// Function to create an archive
function createArchive(filename) {
  return new Promise((resolve, reject) => {
    const output = fs.createWriteStream(filename);
    const archive = archiver('zip', { zlib: { level: 9 } });

    output.on('close', () => {
      console.log(`✅ Package created: ${filename} (${archive.pointer()} bytes)`);
      resolve(archive.pointer());
    });

    archive.on('error', err => reject(err));

    archive.pipe(output);
    archive.file('manifest.json', { name: 'manifest.json' });
    archive.directory('dist/', 'dist');
    archive.finalize();
  });
}

// Create both versions
Promise.all([
  createArchive(timestampedFilename),
  createArchive(productionFilename)
]).catch(err => {
  console.error('Error creating packages:', err);
  process.exit(1);
});

