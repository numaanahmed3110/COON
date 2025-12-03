/**
 * Python SDK Backend Adapter
 * 
 * Uses the Python coon package via child process for compression operations.
 */

import { spawn } from 'child_process';
import type { 
    BackendAdapter, 
    CompressionResult, 
    AnalysisResult, 
    ValidationResult 
} from './types.js';

/**
 * Execute a Python command and return the result
 */
async function runPython(args: string[]): Promise<string> {
    return new Promise((resolve, reject) => {
        // Try python3 first, then python
        const pythonCmd = process.platform === 'win32' ? 'python' : 'python3';
        
        const proc = spawn(pythonCmd, ['-c', args.join(' ')], {
            encoding: 'utf-8',
            env: { ...process.env }
        } as any);
        
        let stdout = '';
        let stderr = '';
        
        proc.stdout?.on('data', (data) => {
            stdout += data.toString();
        });
        
        proc.stderr?.on('data', (data) => {
            stderr += data.toString();
        });
        
        proc.on('close', (code) => {
            if (code === 0) {
                resolve(stdout);
            } else {
                reject(new Error(`Python error: ${stderr || stdout}`));
            }
        });
        
        proc.on('error', (err) => {
            reject(new Error(`Failed to run Python: ${err.message}`));
        });
    });
}

/**
 * Execute Python code that imports coon and returns JSON
 */
async function runCoonPython(pythonCode: string): Promise<any> {
    const fullCode = `
import json
import sys
try:
    from coon.core import Compressor, Decompressor
    from coon.analysis import CodeAnalyzer
    ${pythonCode}
except ImportError as e:
    print(json.dumps({"error": f"coon package not installed: {e}"}))
    sys.exit(1)
except Exception as e:
    print(json.dumps({"error": str(e)}))
    sys.exit(1)
`;
    
    const result = await runPython([fullCode]);
    try {
        return JSON.parse(result.trim());
    } catch {
        throw new Error(`Invalid JSON from Python: ${result}`);
    }
}

export class PythonBackendAdapter implements BackendAdapter {
    readonly name = 'python';
    
    supportsLanguage(language: string): boolean {
        return language.toLowerCase() === 'dart';
    }
    
    getSupportedLanguages(): string[] {
        return ['dart'];
    }
    
    detectLanguage(code: string, filename?: string): string | null {
        if (filename?.endsWith('.dart')) return 'dart';
        
        if (/class\s+\w+\s+extends\s+(Stateless|Stateful)Widget/.test(code)) {
            return 'dart';
        }
        
        return null;
    }
    
    async compress(
        code: string,
        options: {
            strategy?: string;
            language?: string;
            validate?: boolean;
            analyze?: boolean;
        }
    ): Promise<CompressionResult> {
        const escapedCode = JSON.stringify(code);
        const strategy = options.strategy || 'auto';
        
        const pythonCode = `
code = ${escapedCode}
compressor = Compressor()
result = compressor.compress(code, strategy="${strategy}")
output = {
    "compressedCode": result.compressed_code,
    "originalTokens": result.original_tokens,
    "compressedTokens": result.compressed_tokens,
    "percentageSaved": result.percentage_saved,
    "tokenSavings": result.token_savings,
    "strategyUsed": result.strategy_used,
    "processingTimeMs": result.processing_time_ms
}
print(json.dumps(output))
`;
        
        return await runCoonPython(pythonCode);
    }
    
    async decompress(
        coonCode: string,
        options: {
            language?: string;
            format?: boolean;
        }
    ): Promise<string> {
        const escapedCode = JSON.stringify(coonCode);
        const formatOutput = options.format !== false;
        
        const pythonCode = `
code = ${escapedCode}
decompressor = Decompressor()
result = decompressor.decompress(code, format_output=${formatOutput ? 'True' : 'False'})
print(json.dumps({"decompressed": result}))
`;
        
        const result = await runCoonPython(pythonCode);
        return result.decompressed;
    }
    
    async analyze(code: string, language?: string): Promise<AnalysisResult> {
        const escapedCode = JSON.stringify(code);
        
        const pythonCode = `
code = ${escapedCode}
analyzer = CodeAnalyzer()
result = analyzer.analyze(code)
output = {
    "language": "${language || 'dart'}",
    "lineCount": result.line_count,
    "tokenCount": result.token_count,
    "widgetCount": result.widget_count,
    "propertyCount": result.property_count,
    "recommendations": result.recommendations
}
print(json.dumps(output))
`;
        
        return await runCoonPython(pythonCode);
    }
    
    async validate(
        originalCode: string,
        options: {
            strategy?: string;
            language?: string;
            strict?: boolean;
        }
    ): Promise<ValidationResult> {
        const escapedCode = JSON.stringify(originalCode);
        const strategy = options.strategy || 'auto';
        const strict = options.strict ? 'True' : 'False';
        
        const pythonCode = `
from coon.utils import CompressionValidator

code = ${escapedCode}
compressor = Compressor()
decompressor = Decompressor()

result = compressor.compress(code, strategy="${strategy}")
decompressed = decompressor.decompress(result.compressed_code)

validator = CompressionValidator(strict_mode=${strict})
validation = validator.validate_compression(code, result.compressed_code, decompressed)

output = {
    "isValid": validation.is_valid,
    "reversible": validation.reversible,
    "semanticEquivalent": validation.semantic_equivalent,
    "tokenCountMatch": validation.token_count_match,
    "similarityScore": validation.similarity_score,
    "errors": validation.errors,
    "warnings": validation.warnings
}
print(json.dumps(output))
`;
        
        return await runCoonPython(pythonCode);
    }
}
