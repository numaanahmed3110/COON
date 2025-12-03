/**
 * Validate Command
 */

import * as fs from 'fs';
import * as path from 'path';
import { getAdapter } from '../adapters/index.js';
import { heading, error, warning } from '../utils/output.js';
import chalk from 'chalk';

interface ValidateOptions {
    strict?: boolean;
    language?: string;
    backend: string;
}

export async function validate(inputFile: string, options: ValidateOptions): Promise<void> {
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
    
    // Validate
    const result = await adapter.validate(code, {
        language,
        strict: options.strict
    });
    
    heading('COMPRESSION VALIDATION REPORT');
    
    if (result.isValid) {
        console.error(chalk.green.bold('\n✅ Validation PASSED'));
    } else {
        console.error(chalk.red.bold('\n❌ Validation FAILED'));
    }
    
    console.error('\n📊 Results:');
    console.error(`   Reversible: ${result.reversible ? '✓' : '✗'}`);
    console.error(`   Semantic equivalent: ${result.semanticEquivalent ? '✓' : '✗'}`);
    console.error(`   Token count valid: ${result.tokenCountMatch ? '✓' : '✗'}`);
    console.error(`   Similarity score: ${(result.similarityScore * 100).toFixed(2)}%`);
    
    if (result.errors.length > 0) {
        console.error(chalk.red('\n❌ Errors:'));
        for (const err of result.errors) {
            error(`   - ${err}`);
        }
    }
    
    if (result.warnings.length > 0) {
        console.error(chalk.yellow('\n⚠️  Warnings:'));
        for (const warn of result.warnings) {
            warning(`   - ${warn}`);
        }
    }
    
    console.error();
    
    if (!result.isValid) {
        process.exit(1);
    }
}
