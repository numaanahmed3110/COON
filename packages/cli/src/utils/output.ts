/**
 * CLI Output Utilities
 * 
 * Provides consistent formatting for CLI output.
 */

import chalk from 'chalk';

export function success(message: string): void {
    console.error(chalk.green('✅ ' + message));
}

export function error(message: string): void {
    console.error(chalk.red('❌ ' + message));
}

export function warning(message: string): void {
    console.error(chalk.yellow('⚠️  ' + message));
}

export function info(message: string): void {
    console.error(chalk.blue('ℹ️  ' + message));
}

export function stat(label: string, value: string | number): void {
    console.error(`📊 ${label}: ${value}`);
}

export function money(label: string, value: string | number): void {
    console.error(`💰 ${label}: ${value}`);
}

export function file(message: string): void {
    console.error(`📁 ${message}`);
}

export function heading(text: string): void {
    console.error(chalk.bold('\n' + '='.repeat(70)));
    console.error(chalk.bold(text));
    console.error(chalk.bold('='.repeat(70)));
}

export function subheading(text: string): void {
    console.error(chalk.dim('-'.repeat(50)));
    console.error(text);
}

export function divider(): void {
    console.error('-'.repeat(50));
}
