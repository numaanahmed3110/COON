/**
 * Compress Command
 */

import * as fs from 'fs';
import * as path from 'path';
import { getAdapter } from '../adapters/index.js';
import { success, stat, file } from '../utils/output.js';

interface CompressOptions {
    output?: string;
    strategy: string;
    language?: string;
    validate?: boolean;
    analyze?: boolean;
    backend: string;
}

export async function compress(inputFile: string, options: CompressOptions): Promise<void> {
    // Read input file
    const inputPath = path.resolve(inputFile);
    if (!fs.existsSync(inputPath)) {
        throw new Error(`Input file not found: ${inputFile}`);
    }
    
    const code = fs.readFileSync(inputPath, 'utf-8');
    
    // Get backend adapter
    const adapter = getAdapter(options.backend);
    
    // Detect language if not specified
    const language = options.language || adapter.detectLanguage(code, inputFile) || 'dart';
    
    // Compress
    const result = await adapter.compress(code, {
        strategy: options.strategy,
        language,
        validate: options.validate,
        analyze: options.analyze
    });
    
    // Show stats
    success('Compressed successfully!');
    stat('Original tokens', result.originalTokens);
    stat('Compressed tokens', result.compressedTokens);
    stat(`Compression ratio`, `${result.percentageSaved.toFixed(1)}%`);
    stat('Token savings', result.tokenSavings);
    stat('Strategy used', result.strategyUsed);
    
    // Write output
    if (options.output) {
        const outputPath = path.resolve(options.output);
        fs.writeFileSync(outputPath, result.compressedCode, 'utf-8');
        file(`Saved to: ${options.output}`);
    } else {
        console.log(result.compressedCode);
    }
}
