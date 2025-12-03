# COON Format Specification

Official specification for the Code-Oriented Object Notation format.

::: tip Version
Current specification version: 1.0.0
:::

## 1. Overview

COON (Code-Oriented Object Notation) is a compression format designed to minimize token usage when representing Dart/Flutter code in Large Language Model contexts. The format achieves 60-70% token reduction while maintaining semantic equivalence.

### 1.1 Design Goals

1. **Token Efficiency**: Minimize LLM tokens through context-aware abbreviations
2. **Lossless**: Guarantee exact reconstruction of original code
3. **Human Readable**: Remain interpretable by developers
4. **Deterministic**: Same input always produces same output

### 1.2 Scope

This specification covers:
- Widget abbreviation mappings
- Property abbreviation mappings
- Keyword abbreviation mappings
- Structural syntax rules
- Color and enum abbreviations
- Nesting and composition rules

## 2. Lexical Structure

### 2.1 Character Set

COON uses UTF-8 encoding with the following special characters:

| Character | Purpose |
|-----------|---------|
| `:` | Separator after keywords (class, method) |
| `;` | Statement terminator |
| `{` `}` | Property block delimiters |
| `[` `]` | Children list delimiters |
| `(` `)` | Parameter list delimiters |
| `"` `'` | String delimiters |
| `,` | Element separator |
| `<` | Extends relationship |
| `>` | Implements relationship |
| `@` | Annotation prefix |
| `$` | this reference |
| `_` | Private modifier |
| `?` | Nullable type |
| `!` | Required parameter |
| `=>` | Arrow function |

### 2.2 Tokens

Tokens are categorized as:

1. **Keywords**: `c:`, `fn:`, `m:`, `@o`, `ret`
2. **Widgets**: `C`, `T`, `R`, `Col`, `Scf`, etc.
3. **Properties**: `w`, `h`, `c`, `p`, `m`, etc.
4. **Literals**: Strings, numbers, booleans
5. **Identifiers**: Variable names, function names
6. **Operators**: `=>`, `->`, `<`, `>`

### 2.3 Whitespace

Whitespace is optional between tokens except:
- Within string literals (preserved)
- Between identifier characters (required)

## 3. Widget Abbreviations

### 3.1 Core Widgets

| Full Name | Abbreviation | Category |
|-----------|--------------|----------|
| Container | C | Layout |
| Text | T | Display |
| Row | R | Layout |
| Column | Col | Layout |
| Stack | Stk | Layout |
| Center | Ctr | Layout |
| Padding | P | Layout |
| SizedBox | SB | Layout |
| Expanded | Exp | Layout |
| Flexible | Flx | Layout |

### 3.2 Input Widgets

| Full Name | Abbreviation |
|-----------|--------------|
| TextField | TF |
| TextFormField | TFF |
| Checkbox | CB |
| Radio | Rad |
| Switch | Sw |
| Slider | Sld |
| DropdownButton | DD |

### 3.3 Button Widgets

| Full Name | Abbreviation |
|-----------|--------------|
| ElevatedButton | Btn |
| TextButton | TBtn |
| OutlinedButton | OBtn |
| IconButton | IBtn |
| FloatingActionButton | FAB |

### 3.4 Navigation Widgets

| Full Name | Abbreviation |
|-----------|--------------|
| Scaffold | Scf |
| AppBar | AppB |
| BottomNavigationBar | BNB |
| Drawer | Drw |
| TabBar | TB |
| TabBarView | TBV |
| Navigator | Nav |

### 3.5 List Widgets

| Full Name | Abbreviation |
|-----------|--------------|
| ListView | LV |
| GridView | GV |
| ListTile | LT |
| Card | Card |
| Divider | Div |

### 3.6 Media Widgets

| Full Name | Abbreviation |
|-----------|--------------|
| Icon | Ic |
| Image | Img |
| CircleAvatar | CA |
| ClipRRect | ClpR |
| ClipOval | ClpO |

## 4. Property Abbreviations

### 4.1 Dimension Properties

| Full Name | Abbreviation | Type |
|-----------|--------------|------|
| width | w | double |
| height | h | double |
| size | sz | double |
| minWidth | minW | double |
| maxWidth | maxW | double |
| minHeight | minH | double |
| maxHeight | maxH | double |

### 4.2 Spacing Properties

| Full Name | Abbreviation | Type |
|-----------|--------------|------|
| padding | p | EdgeInsets |
| margin | m | EdgeInsets |
| spacing | sp | double |

### 4.3 Styling Properties

| Full Name | Abbreviation | Type |
|-----------|--------------|------|
| color | c | Color |
| backgroundColor | bg | Color |
| borderRadius | br | double |
| decoration | dec | BoxDecoration |
| style | st | TextStyle |

### 4.4 Alignment Properties

| Full Name | Abbreviation | Type |
|-----------|--------------|------|
| mainAxisAlignment | mA | MainAxisAlignment |
| crossAxisAlignment | cA | CrossAxisAlignment |
| alignment | al | Alignment |

### 4.5 Callback Properties

| Full Name | Abbreviation | Type |
|-----------|--------------|------|
| onPressed | onP | VoidCallback |
| onTap | onTap | VoidCallback |
| onChanged | onCh | ValueChanged |
| onSubmitted | onSub | ValueChanged |

### 4.6 Child Properties

| Full Name | Abbreviation | Type |
|-----------|--------------|------|
| child | ch | Widget |
| children | chn | List<Widget> |
| title | t | Widget |
| leading | l | Widget |
| trailing | tr | Widget |
| actions | a | List<Widget> |

## 5. Keyword Abbreviations

### 5.1 Declaration Keywords

| Full Form | Abbreviation |
|-----------|--------------|
| class | c: |
| function | fn: |
| method | m: |
| extends | < |
| implements | > |
| mixin | ~ |
| with | + |

### 5.2 Modifier Keywords

| Full Form | Abbreviation |
|-----------|--------------|
| @override | @o |
| @required | @r |
| final | f |
| const | k |
| static | s |
| late | lt |
| async | as |

### 5.3 Control Keywords

| Full Form | Abbreviation |
|-----------|--------------|
| return | ret |
| if | ? |
| else | : |
| for | @ |
| while | wh |

## 6. Syntax Rules

### 6.1 Class Definition

```
c:ClassName<SuperClass>InterfaceName
```

**Grammar:**
```
class_def := 'c:' identifier [extends] [implements] [mixins] ';'
extends := '<' identifier
implements := '>' identifier (',' identifier)*
mixins := '+' identifier (',' identifier)*
```

**Example:**
```
c:MyWidget<StatelessWidget
```

### 6.2 Method Definition

```
m:methodName(params)->ReturnType{body}
```

**Grammar:**
```
method_def := 'm:' identifier '(' [params] ')' [return_type] '{' body '}'
params := param (',' param)*
param := type identifier
return_type := '->' type
```

**Example:**
```
m:build(ctx)->W{ret C{}}
```

### 6.3 Widget Instantiation

```
WidgetAbbr{properties}[children]
```

**Grammar:**
```
widget := widget_abbr [props] [children]
props := '{' prop (',' prop)* '}'
prop := prop_abbr ':' value
children := '[' widget (',' widget)* ']'
```

**Example:**
```
C{w:100,h:50,c:Cl.r}[T"Hello"]
```

### 6.4 String Literals

```
"double quoted string"
'single quoted string'
```

Escape sequences:
- `\"` - Double quote
- `\'` - Single quote
- `\\` - Backslash
- `\n` - Newline
- `\t` - Tab

## 7. Color System

### 7.1 Named Colors

| Abbreviation | Full Name |
|--------------|-----------|
| Cl.r | Colors.red |
| Cl.g | Colors.green |
| Cl.b | Colors.blue |
| Cl.w | Colors.white |
| Cl.bl | Colors.black |
| Cl.gr | Colors.grey |
| Cl.t | Colors.transparent |

### 7.2 Shaded Colors

```
Cl.r[500]    # Colors.red[500]
Cl.g[700]    # Colors.green[700]
Cl.b.sh200   # Colors.blue.shade200
```

### 7.3 Hex Colors

```
#FF5722      # Color(0xFFFF5722)
#80FF5722    # Color(0x80FF5722) with alpha
```

## 8. Enum Abbreviations

### 8.1 MainAxisAlignment

| Abbreviation | Value |
|--------------|-------|
| start | MainAxisAlignment.start |
| end | MainAxisAlignment.end |
| center | MainAxisAlignment.center |
| spB | MainAxisAlignment.spaceBetween |
| spA | MainAxisAlignment.spaceAround |
| spE | MainAxisAlignment.spaceEvenly |

### 8.2 CrossAxisAlignment

| Abbreviation | Value |
|--------------|-------|
| start | CrossAxisAlignment.start |
| end | CrossAxisAlignment.end |
| center | CrossAxisAlignment.center |
| str | CrossAxisAlignment.stretch |
| bl | CrossAxisAlignment.baseline |

### 8.3 TextAlign

| Abbreviation | Value |
|--------------|-------|
| l | TextAlign.left |
| r | TextAlign.right |
| c | TextAlign.center |
| j | TextAlign.justify |

## 9. Round-Trip Guarantee

All COON-compliant implementations MUST satisfy:

```
decompress(compress(code)) ≡ normalize(code)
```

Where `normalize()` applies consistent formatting.

### 9.1 Normalization Rules

1. Consistent indentation (2 spaces)
2. Trailing commas in multi-element lists
3. Single space after colons in properties
4. No trailing whitespace

### 9.2 Validation

Implementations SHOULD provide validation:

```python
def validate(code: str) -> bool:
    compressed = compress(code)
    decompressed = decompress(compressed)
    return normalize(decompressed) == normalize(code)
```

## 10. Conformance Levels

### Level 1: Basic

- Widget abbreviations (Core + Layout)
- Property abbreviations (Dimension + Spacing)
- Basic syntax structures

### Level 2: Standard

- All widget abbreviations
- All property abbreviations
- Color system
- Enum abbreviations

### Level 3: Full

- Complete keyword support
- AST-based optimizations
- Component references
- Semantic analysis

## 11. References

- [Format Overview](/guide/format-overview)
- [Syntax Cheatsheet](/reference/syntax-cheatsheet)
- [API Reference](/reference/api)
- [GitHub Repository](https://github.com/AffanShaikhsurab/COON)
