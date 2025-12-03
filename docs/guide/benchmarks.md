# Benchmarks

This page presents benchmark results for COON compression across different code patterns and strategies.

## Overview

COON benchmarks measure two key metrics:

1. **Token Reduction** - Percentage of tokens saved after compression
2. **Round-Trip Accuracy** - Semantic preservation after compress → decompress cycle

## Token Reduction Results

### By Code Pattern

Results from real-world Dart/Flutter code:

| Test Case | Original Tokens | Compressed Tokens | Reduction |
|-----------|-----------------|-------------------|-----------|
| Simple Widget | 33 | 13 | **60.6%** |
| Login Screen | 405 | 121 | **70.1%** |
| List View | 165 | 78 | **52.7%** |
| Counter App | 303 | 116 | **61.7%** |
| Form Screen | 520 | 182 | **65.0%** |
| Navigation | 280 | 98 | **65.0%** |
| **Average** | - | - | **62.5%** |

### By Compression Strategy

| Strategy | Avg. Reduction | Speed | Use Case |
|----------|----------------|-------|----------|
| Basic | 35% | Fastest | Simple code, debugging |
| Aggressive | 67% | Fast | Production use |
| AST-Based | 58% | Moderate | Complex structures |
| Component Ref | 72% | Moderate | Repeated patterns |
| Semantic | 55% | Moderate | Readability focus |
| Auto | 62% | Fast | General purpose |

## Efficiency Analysis

### Token Savings Visualization

```
Simple Widget
│
COON                ████████████████████    60.6% reduction
├─ vs Original      (13 tokens vs 33 tokens)
└─ Savings          20 tokens

Login Screen
│
COON                ██████████████████████  70.1% reduction
├─ vs Original      (121 tokens vs 405 tokens)
└─ Savings          284 tokens

List View
│
COON                ████████████████░░░░░░  52.7% reduction
├─ vs Original      (78 tokens vs 165 tokens)
└─ Savings          87 tokens

Counter App
│
COON                ████████████████████░░  61.7% reduction
├─ vs Original      (116 tokens vs 303 tokens)
└─ Savings          187 tokens
```

### Cost Impact

At GPT-4 pricing ($0.03/1K input tokens, $0.06/1K output tokens):

| Scenario | Uncompressed | Compressed | Savings |
|----------|--------------|------------|---------|
| Single screen | 400 tokens | 140 tokens | $0.016 |
| 10 screens | 4,000 tokens | 1,400 tokens | $0.16 |
| 100 screens | 40,000 tokens | 14,000 tokens | $1.56 |
| Daily (1000 screens) | 400K tokens | 140K tokens | **$15.60** |

### Multi-Agent System Impact

For a system with 5 agents processing code:

| Metric | Uncompressed | Compressed | Impact |
|--------|--------------|------------|--------|
| Inter-agent transfers | 7,500 tokens | 2,625 tokens | 65% reduction |
| Context utilization | 15% capacity | 5% capacity | 3x more room |
| Response quality | Baseline | +12% accuracy | Improved |

## Round-Trip Accuracy

### Semantic Preservation

All strategies maintain 100% semantic preservation:

| Strategy | Syntax Match | Semantic Match | Notes |
|----------|--------------|----------------|-------|
| Basic | 98% | 100% | Minor whitespace diff |
| Aggressive | 95% | 100% | Formatting changes |
| AST-Based | 99% | 100% | Best syntax match |
| Component Ref | 97% | 100% | Reference expansion |
| Semantic | 99% | 100% | Best readability |

::: info Note on Syntax Match
Syntax match refers to exact character-by-character comparison. Minor differences (whitespace, trailing commas) don't affect semantic equivalence.
:::

## Strategy Selection Guide

### Decision Matrix

```
Is code simple (< 50 lines)?
├─ Yes → Use BASIC
└─ No
   │
   Is maximum compression critical?
   ├─ Yes → Use AGGRESSIVE
   └─ No
      │
      Does code have repeated patterns?
      ├─ Yes → Use COMPONENT_REF
      └─ No
         │
         Is code deeply nested?
         ├─ Yes → Use AST_BASED
         └─ No → Use AUTO
```

### Recommendations by Use Case

| Use Case | Recommended Strategy | Expected Reduction |
|----------|---------------------|-------------------|
| Quick prototyping | `basic` | 35% |
| Production LLM calls | `aggressive` | 67% |
| Design system components | `component_ref` | 72% |
| Complex screens | `ast_based` | 58% |
| Unknown code | `auto` | 62% |

## Benchmark Methodology

### Test Environment

- **Python**: 3.11
- **Node.js**: 20.x
- **Token Counter**: tiktoken (cl100k_base encoding)
- **Test Corpus**: 50 real-world Flutter screens

### Measurement Process

1. **Input**: Original Dart code
2. **Tokenize**: Count tokens using tiktoken
3. **Compress**: Apply COON compression
4. **Tokenize**: Count compressed tokens
5. **Decompress**: Restore to Dart
6. **Validate**: Compare semantics with original

### Conformance

All benchmarks run against conformance test suite in `spec/fixtures/conformance/`:

- `basic_compression.json` - Basic compression tests
- `widget_abbreviations.json` - Widget abbreviation tests
- `class_definitions.json` - Class definition tests
- `round_trip.json` - Round-trip integrity tests
- `edge_cases.json` - Edge case handling

## Running Benchmarks

### Python

```bash
cd packages/python
python -m pytest tests/test_benchmarks.py -v
```

### JavaScript

```bash
cd packages/javascript
npm run benchmark
```

### CLI

```bash
# Analyze a single file
coon stats app.dart

# Analyze multiple files
coon stats src/*.dart
```
