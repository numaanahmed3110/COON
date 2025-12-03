/**
 * Backend Adapter Factory and Registry
 */

import type { BackendAdapter } from './types.js';
import { JSBackendAdapter } from './js-adapter.js';
import { PythonBackendAdapter } from './python-adapter.js';

export type { BackendAdapter, CompressionResult, AnalysisResult, ValidationResult } from './types.js';
export { JSBackendAdapter } from './js-adapter.js';
export { PythonBackendAdapter } from './python-adapter.js';

const adapters: Map<string, BackendAdapter> = new Map();

// Register default adapters
adapters.set('js', new JSBackendAdapter());
adapters.set('python', new PythonBackendAdapter());

/**
 * Get a backend adapter by name
 */
export function getAdapter(name: string): BackendAdapter {
    const adapter = adapters.get(name.toLowerCase());
    if (!adapter) {
        throw new Error(
            `Unknown backend: '${name}'. Available: ${Array.from(adapters.keys()).join(', ')}`
        );
    }
    return adapter;
}

/**
 * Register a custom backend adapter
 */
export function registerAdapter(name: string, adapter: BackendAdapter): void {
    adapters.set(name.toLowerCase(), adapter);
}

/**
 * List all available backend adapters
 */
export function listAdapters(): string[] {
    return Array.from(adapters.keys());
}

/**
 * Get the default adapter (JS)
 */
export function getDefaultAdapter(): BackendAdapter {
    return adapters.get('js')!;
}
