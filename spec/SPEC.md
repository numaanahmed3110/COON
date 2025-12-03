# COON Format Specification

**Version**: 1.0.0  
**Status**: Stable  
**Last Updated**: December 2024

## Abstract

COON (Code-Oriented Object Notation) is a compression format designed to minimize token usage when transmitting Dart/Flutter code to and from Large Language Models (LLMs). This specification defines the syntax, semantics, and transformation rules for COON compression.

## Table of Contents

1. [Introduction](#1-introduction)
2. [Design Goals](#2-design-goals)
3. [Notation Conventions](#3-notation-conventions)
4. [Compression Rules](#4-compression-rules)
5. [Decompression Rules](#5-decompression-rules)
6. [Strategies](#6-strategies)
7. [Examples](#7-examples)
8. [Conformance](#8-conformance)

---

## 1. Introduction

### 1.1 Purpose

COON addresses the token inefficiency problem when working with Large Language Models in code generation scenarios:

- Raw code contains excessive whitespace and boilerplate
- Multi-agent systems transfer large amounts of code between agents
- Context windows fill quickly with uncompressed code
- API costs scale with token count

### 1.2 Scope

This specification covers:
- Syntax rules for COON format
- Transformation rules for compression and decompression
- Abbreviation mappings for keywords, widgets, and properties
- Strategy configurations for different compression levels

### 1.3 Terminology

| Term | Definition |
|------|------------|
| **Token** | A unit of text as processed by LLM tokenizers (~4 characters) |
| **Compression Ratio** | Percentage of tokens saved after compression |
| **Round-trip** | Compress → Decompress cycle |
| **Reversibility** | Ability to reconstruct original code from compressed form |

---

## 2. Design Goals

### 2.1 Primary Goals

1. **Token Efficiency**: Reduce token count by 60-70%
2. **Reversibility**: Lossless compression - original code can be fully reconstructed
3. **Semantic Preservation**: Maintain code meaning and functionality
4. **Human Readability**: Compressed format should be somewhat readable
5. **LLM Friendly**: Optimized for LLM token counting and context windows

### 2.2 Non-Goals

- Binary compression (output must be text)
- Obfuscation (code should remain understandable)
- Cross-language support (Dart/Flutter only in v1.0)

---

## 3. Notation Conventions

### 3.1 Structure Delimiters

| Delimiter | Usage |
|-----------|-------|
| `{}` | Widget/class body, parameter groups |
| `[]` | Arrays, children lists |
| `:` | Property name separator |
| `;` | Statement/section separator |
| `,` | List item separator |
| `<>` | Type parameters, extends/implements |

### 3.2 Special Prefixes

| Prefix | Meaning |
|--------|---------|
| `c:` | Class declaration |
| `f:` | Final field(s) |
| `m:` | Method declaration |
| `@` | EdgeInsets value |
| `#` | Component reference |
| `~` | Constructor call |

---

## 4. Compression Rules

### 4.1 Keyword Abbreviations

Keywords are abbreviated according to `spec/data/keywords.json`:

| Dart Keyword | COON Abbreviation |
|--------------|-------------------|
| `class` | `c:` |
| `final` | `f:` |
| `extends` | `<` |
| `implements` | `>` |
| `with` | `+` |
| `return` | `ret` |
| `const` | `cn:` |
| `static` | `st:` |
| `async` | `asy` |
| `await` | `awt` |
| `void` | `v:` |
| `override` | (removed) |
| `Widget` | `W` |
| `BuildContext` | `ctx` |

### 4.2 Widget Abbreviations

Common Flutter widgets are mapped to single/double-letter codes according to `spec/data/widgets.json`:

| Widget | Abbreviation |
|--------|--------------|
| `Scaffold` | `S` |
| `Column` | `C` |
| `Row` | `R` |
| `Text` | `T` |
| `Container` | `K` |
| `Center` | `N` |
| `Padding` | `P` |
| `SafeArea` | `A` |
| `AppBar` | `B` |
| `SizedBox` | `Z` |
| `TextField` | `F` |
| `ElevatedButton` | `E` |
| `ListView` | `L` |
| `GridView` | `G` |
| `Stack` | `St` |
| `Expanded` | `Ex` |
| `Icon` | `Ic` |
| `Card` | `Cd` |

### 4.3 Property Abbreviations

Widget properties are abbreviated according to `spec/data/properties.json`:

| Property | Abbreviation |
|----------|--------------|
| `appBar:` | `a:` |
| `body:` | `b:` |
| `child:` | `c:` |
| `children:` | `h:` |
| `title:` | `t:` |
| `padding:` | `p:` |
| `style:` | `s:` |
| `color:` | `l:` |
| `decoration:` | `d:` |
| `controller:` | `r:` |
| `onPressed:` | `o:` |
| `height:` | `e:` |
| `width:` | `W:` |
| `mainAxisAlignment:` | `A:` |
| `crossAxisAlignment:` | `X:` |

### 4.4 Special Notations

#### 4.4.1 EdgeInsets

```
EdgeInsets.all(N)                           → @N
EdgeInsets.symmetric(horizontal: H, vertical: V) → @H,V
EdgeInsets.only(left: L, top: T, right: R, bottom: B) → @L,T,R,B
```

#### 4.4.2 Constructors

```
TypeName()      → ~TypeName
TypeName.named() → ~TypeName.named
```

#### 4.4.3 Boolean Values

```
true  → 1
false → 0
```

#### 4.4.4 Null Values

```
null → _
```

### 4.5 Whitespace Rules

1. Remove all unnecessary whitespace
2. Use semicolons (`;`) to separate major sections
3. Use commas (`,`) to separate list items
4. Use curly braces (`{}`) to denote widget trees

### 4.6 Annotation Rules

1. Remove `@override` annotations (implied)
2. Remove `@deprecated` annotations
3. Preserve custom annotations as comments if needed

---

## 5. Decompression Rules

### 5.1 Reverse Mappings

All abbreviations are reversed using the same mapping tables in reverse:

1. Expand keyword abbreviations
2. Expand widget abbreviations
3. Expand property abbreviations
4. Expand special notations

### 5.2 Formatting

After decompression:
1. Add appropriate whitespace
2. Apply proper indentation (2 spaces per level)
3. Add newlines after structural elements
4. Restore `@override` annotations where appropriate

---

## 6. Strategies

### 6.1 Basic Strategy

**Use when**: Quick compression with minimal processing

- Keyword abbreviation: ✓
- Widget abbreviation: ✓
- Property abbreviation: ✓
- Whitespace removal: ✓
- AST analysis: ✗
- Expected compression: 30-40%

### 6.2 Aggressive Strategy

**Use when**: Maximum compression needed

- Keyword abbreviation: ✓
- Widget abbreviation: ✓ (ultra-short)
- Property abbreviation: ✓ (ultra-short)
- Whitespace removal: ✓ (complete)
- Boolean shorthand: ✓
- Constructor shorthand: ✓
- Expected compression: 60-70%

### 6.3 AST-Based Strategy

**Use when**: Complex code with nested structures

- Full AST analysis: ✓
- Structure optimization: ✓
- Semantic preservation: ✓
- Comment preservation: ✓
- Expected compression: 50-65%

### 6.4 Component Reference Strategy

**Use when**: Code contains known reusable components

- Component registry lookup: ✓
- Reference substitution: ✓
- Parameter extraction: ✓
- Expected compression: 70-80%

### 6.5 Strategy Selection Algorithm

```
IF code_size < 100 characters:
    USE basic
ELSE IF has_component_registry AND component_match_found:
    USE component_ref
ELSE IF code_complexity > 0.7:
    USE ast_based
ELSE:
    USE aggressive
```

---

## 7. Examples

### 7.1 Simple Widget

**Original** (84 chars):
```dart
class MyWidget extends StatelessWidget {
  Widget build(BuildContext context) {
    return Text("Hello");
  }
}
```

**Compressed** (32 chars, 62% reduction):
```
c:MyWidget<StatelessWidget>;m:b T"Hello"
```

### 7.2 Complex Screen

**Original** (412 chars):
```dart
class LoginScreen extends StatelessWidget {
  final TextEditingController emailController = TextEditingController();
  final TextEditingController passwordController = TextEditingController();
  
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text("Login"),
      ),
      body: SafeArea(
        child: Padding(
          padding: EdgeInsets.all(24.0),
          child: Column(
            children: [
              Text("Welcome Back"),
              Text("Login to continue"),
            ],
          ),
        ),
      ),
    );
  }
}
```

**Compressed** (145 chars, 65% reduction):
```
c:LoginScreen<StatelessWidget>;f:emailController=X,passwordController=X;m:b S{a:B{t:T"Login"},b:A{c:P{p:@24,c:C{h:[T"Welcome Back",T"Login to continue"]}}}}
```

---

## 8. Conformance

### 8.1 Conformance Tests

All SDK implementations MUST pass the conformance tests located in `spec/fixtures/conformance/`:

- `basic_compression.json` - Basic compression tests
- `widget_abbreviations.json` - Widget abbreviation tests
- `class_definitions.json` - Class definition tests
- `round_trip.json` - Round-trip tests
- `edge_cases.json` - Edge case handling

### 8.2 Test Format

Each test case in conformance fixtures has the following structure:

```json
{
  "id": "test_001",
  "name": "Human readable test name",
  "input": "Original Dart code",
  "expected": "Expected COON output",
  "strategy": "basic|aggressive|ast_based|component_ref"
}
```

### 8.3 Verification Process

1. Load test fixtures from `spec/fixtures/conformance/`
2. For each test case:
   a. Compress input using specified strategy
   b. Compare result to expected output
   c. Record pass/fail status
3. Report overall conformance percentage

### 8.4 Cross-SDK Conformance

All SDK implementations (Python, JavaScript, etc.) MUST:

1. Use the same abbreviation mappings from `spec/data/`
2. Pass all conformance tests
3. Produce identical output for identical input

---

## Appendix A: Full Abbreviation Tables

See the following files for complete, authoritative abbreviation mappings:

- `spec/data/widgets.json` - Widget abbreviations
- `spec/data/properties.json` - Property abbreviations
- `spec/data/keywords.json` - Keyword abbreviations

---

## Appendix B: Version History

| Version | Date | Changes |
|---------|------|---------|
| 1.0.0 | Dec 2024 | Initial specification |

---

*End of Specification*
