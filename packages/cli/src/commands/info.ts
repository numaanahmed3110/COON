/**
 * Info Command
 */

import { listAdapters, getAdapter } from '../adapters/index.js';
import { heading, subheading } from '../utils/output.js';
import chalk from 'chalk';

export async function info(): Promise<void> {
    heading('COON CLI Information');
    
    console.error('\n📦 Version: 1.0.0');
    console.error('📝 Description: Token-efficient compression for code (Dart/Flutter, etc.)');
    
    subheading('Available Backends');
    
    const adapters = listAdapters();
    for (const name of adapters) {
        const adapter = getAdapter(name);
        const languages = adapter.getSupportedLanguages();
        console.error(`\n  ${chalk.bold(name.toUpperCase())}:`);
        console.error(`    Supported languages: ${languages.join(', ')}`);
    }
    
    subheading('Supported Languages');
    console.error('\n  • Dart/Flutter (.dart)');
    console.error('  • More coming soon: Python, TypeScript, etc.');
    
    subheading('Compression Strategies');
    console.error('\n  • auto      - Automatically select best strategy');
    console.error('  • basic     - Simple keyword/widget abbreviations');
    console.error('  • aggressive - Maximum compression with comment removal');
    console.error('  • ast_based  - AST-aware compression for better results');
    console.error('  • component_ref - Component reference-based compression');
    
    subheading('Usage Examples');
    console.error('\n  Compress a file:');
    console.error('    coon compress app.dart -o app.coon');
    console.error('\n  Decompress back:');
    console.error('    coon decompress app.coon -o app.dart');
    console.error('\n  Analyze file:');
    console.error('    coon analyze app.dart');
    console.error('\n  Compare strategies:');
    console.error('    coon stats app.dart');
    console.error();
}
