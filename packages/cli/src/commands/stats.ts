/**
 * Stats Command
 */

import * as fs from 'fs';
import * as path from 'path';
import { getAdapter } from '../adapters/index.js';
import { heading, stat, subheading, divider, money } from '../utils/output.js';
import chalk from 'chalk';

interface StatsOptions {
    language?: string;
    backend: string;
}

export async function stats(inputFile: string, options: StatsOptions): Promise<void> {
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
    
    heading('COON COMPRESSION STATISTICS');
    console.error(`\n📄 File: ${inputFile}`);
    stat('Original size', `${code.length} characters`);
    stat('Original tokens', Math.ceil(code.length / 4));
    
    subheading('Strategy Comparison');
    
    const strategies = ['basic', 'aggressive', 'ast_based'];
    let bestStrategy = '';
    let bestRatio = 0;
    
    for (const strategy of strategies) {
        const result = await adapter.compress(code, { strategy, language });
        
        console.error(`\n  ${strategy.toUpperCase()}:`);
        console.error(`    Tokens: ${result.originalTokens} → ${result.compressedTokens}`);
        console.error(`    Savings: ${result.tokenSavings} tokens (${result.percentageSaved.toFixed(1)}%)`);
        console.error(`    Time: ${result.processingTimeMs.toFixed(2)}ms`);
        
        if (result.percentageSaved > bestRatio) {
            bestRatio = result.percentageSaved;
            bestStrategy = strategy;
        }
    }
    
    divider();
    console.error(`\n🏆 Best strategy: ${chalk.bold(bestStrategy.toUpperCase())} (${bestRatio.toFixed(1)}% savings)`);
    
    // Cost impact
    const tokensSaved = Math.ceil(code.length / 4 * bestRatio / 100);
    const inputCostSaved = (tokensSaved / 1000) * 0.03;
    const outputCostSaved = (tokensSaved / 1000) * 0.06;
    
    console.error(`\n💵 Cost Impact (GPT-4 pricing):`);
    money('Input cost saved', `$${inputCostSaved.toFixed(4)}`);
    money('Output cost saved', `$${outputCostSaved.toFixed(4)}`);
    money('Total per call', `$${(inputCostSaved + outputCostSaved).toFixed(4)}`);
    console.error();
}
