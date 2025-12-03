#!/usr/bin/env node
/**
 * COON CLI - Command-line interface for COON compression
 * 
 * Language-agnostic CLI that can use either JavaScript or Python backends.
 */

import { Command } from 'commander';
import { compress } from './commands/compress.js';
import { decompress } from './commands/decompress.js';
import { analyze } from './commands/analyze.js';
import { stats } from './commands/stats.js';
import { validate } from './commands/validate.js';
import { info } from './commands/info.js';

const program = new Command();

program
    .name('coon')
    .description('COON: Code-Oriented Object Notation\n\nToken-efficient compression for code (Dart/Flutter, etc.)\nAchieve 60-70% token reduction for LLM contexts.')
    .version('1.0.0');

// Compress command
program
    .command('compress')
    .description('Compress source code to COON format')
    .argument('<input>', 'Input source file')
    .option('-o, --output <file>', 'Output file (default: stdout)')
    .option('-s, --strategy <strategy>', 'Compression strategy: auto, basic, aggressive, ast_based, component_ref', 'auto')
    .option('-l, --language <lang>', 'Source language (auto-detected if not specified)')
    .option('--validate', 'Validate compression result')
    .option('--analyze', 'Include code analysis')
    .option('--backend <backend>', 'Backend to use: js, python (default: js)', 'js')
    .action(compress);

// Decompress command
program
    .command('decompress')
    .description('Decompress COON format back to source code')
    .argument('<input>', 'Input COON file')
    .option('-o, --output <file>', 'Output file (default: stdout)')
    .option('-l, --language <lang>', 'Target language', 'dart')
    .option('--format', 'Format output code', true)
    .option('--backend <backend>', 'Backend to use: js, python (default: js)', 'js')
    .action(decompress);

// Analyze command
program
    .command('analyze')
    .description('Analyze source code for compression opportunities')
    .argument('<input>', 'Input source file')
    .option('-l, --language <lang>', 'Source language (auto-detected if not specified)')
    .option('--backend <backend>', 'Backend to use: js, python (default: js)', 'js')
    .action(analyze);

// Stats command
program
    .command('stats')
    .description('Show compression statistics for a source file')
    .argument('<input>', 'Input source file')
    .option('-l, --language <lang>', 'Source language (auto-detected if not specified)')
    .option('--backend <backend>', 'Backend to use: js, python (default: js)', 'js')
    .action(stats);

// Validate command
program
    .command('validate')
    .description('Validate compression round-trip')
    .argument('<input>', 'Input source file')
    .option('--strict', 'Use strict validation mode')
    .option('-l, --language <lang>', 'Source language (auto-detected if not specified)')
    .option('--backend <backend>', 'Backend to use: js, python (default: js)', 'js')
    .action(validate);

// Info command
program
    .command('info')
    .description('Show information about supported languages and backends')
    .action(info);

program.parse();
