/**
 * Decompress Command
 */

import * as fs from 'fs';
import * as path from 'path';
import { getAdapter } from '../adapters/index.js';
import { success, file } from '../utils/output.js';

interface DecompressOptions {
    output?: string;
    language: string;
    format?: boolean;
    backend: string;
}

export async function decompress(inputFile: string, options: DecompressOptions): Promise<void> {
    // Read input file
    const inputPath = path.resolve(inputFile);
    if (!fs.existsSync(inputPath)) {
        throw new Error(`Input file not found: ${inputFile}`);
    }
    
    const coonCode = fs.readFileSync(inputPath, 'utf-8');
    
    // Get backend adapter
    const adapter = getAdapter(options.backend);
    
    // Decompress
    const result = await adapter.decompress(coonCode, {
        language: options.language,
        format: options.format
    });
    
    success('Decompressed successfully!');
    
    // Write output
    if (options.output) {
        const outputPath = path.resolve(options.output);
        fs.writeFileSync(outputPath, result, 'utf-8');
        file(`Saved to: ${options.output}`);
    } else {
        console.log(result);
    }
}
