/**
 * Backend Adapter Interface
 * 
 * Defines the contract for compression backends (JS SDK, Python SDK, etc.)
 */

export interface CompressionResult {
    compressedCode: string;
    originalTokens: number;
    compressedTokens: number;
    percentageSaved: number;
    tokenSavings: number;
    strategyUsed: string;
    processingTimeMs: number;
}

export interface AnalysisResult {
    language: string;
    lineCount: number;
    tokenCount: number;
    widgetCount: number;
    propertyCount: number;
    recommendations: string[];
}

export interface ValidationResult {
    isValid: boolean;
    reversible: boolean;
    semanticEquivalent: boolean;
    tokenCountMatch: boolean;
    similarityScore: number;
    errors: string[];
    warnings: string[];
}

export interface BackendAdapter {
    /**
     * Get the backend name
     */
    readonly name: string;
    
    /**
     * Check if this backend supports a language
     */
    supportsLanguage(language: string): boolean;
    
    /**
     * Get list of supported languages
     */
    getSupportedLanguages(): string[];
    
    /**
     * Detect language from code and/or file extension
     */
    detectLanguage(code: string, filename?: string): string | null;
    
    /**
     * Compress code
     */
    compress(
        code: string,
        options: {
            strategy?: string;
            language?: string;
            validate?: boolean;
            analyze?: boolean;
        }
    ): Promise<CompressionResult>;
    
    /**
     * Decompress COON format
     */
    decompress(
        coonCode: string,
        options: {
            language?: string;
            format?: boolean;
        }
    ): Promise<string>;
    
    /**
     * Analyze code for compression opportunities
     */
    analyze(code: string, language?: string): Promise<AnalysisResult>;
    
    /**
     * Validate compression round-trip
     */
    validate(
        originalCode: string,
        options: {
            strategy?: string;
            language?: string;
            strict?: boolean;
        }
    ): Promise<ValidationResult>;
}
