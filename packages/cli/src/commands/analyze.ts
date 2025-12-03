/**
 * Analyze Command
 */

import * as fs from 'fs';
import * as path from 'path';
import { getAdapter } from '../adapters/index.js';
import { heading, stat, subheading, info } from '../utils/output.js';

interface AnalyzeOptions {
    language?: string;
    backend: string;
}

export async function analyze(inputFile: string, options: AnalyzeOptions): Promise<void> {
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
    
    // Analyze
    const result = await adapter.analyze(code, language);
    
    heading('CODE ANALYSIS');
    console.error(`\n📄 File: ${inputFile}`);
    
    subheading('Statistics');
    stat('Language', result.language);
    stat('Lines', result.lineCount);
    stat('Estimated tokens', result.tokenCount);
    stat('Widgets found', result.widgetCount);
    stat('Properties found', result.propertyCount);
    
    if (result.recommendations.length > 0) {
        subheading('Recommendations');
        for (const rec of result.recommendations) {
            info(rec);
        }
    }
    
    console.error();
}
