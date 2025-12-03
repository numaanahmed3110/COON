# LLM Integration

This guide covers best practices for using COON format with Large Language Models.

## Overview

COON works best when you show the format instead of describing it. The structure is self-documenting, and models parse it naturally once they see the pattern.

## Basic Integration

### Input Preparation

```python
from coon import compress_dart

# Compress your code before sending to LLM
dart_code = open("app.dart").read()
compressed = compress_dart(dart_code)

# Include in prompt
prompt = f"""
Here is existing code in COON format:
```coon
{compressed}
```

Generate a similar widget for a settings screen.
"""
```

### Output Processing

```python
from coon import decompress_coon

# Extract COON from LLM response
response = llm.generate(prompt)
coon_code = extract_coon_block(response)

# Decompress to usable Dart
dart_code = decompress_coon(coon_code)
```

## Prompting Strategies

### Strategy 1: Show by Example

The most effective approach is to show examples of both formats:

```
Here is a Flutter widget in Dart:
```dart
class MyButton extends StatelessWidget {
  Widget build(BuildContext context) {
    return ElevatedButton(
      onPressed: () {},
      child: Text("Click"),
    );
  }
}
```

The same widget in COON format:
```coon
c:MyButton<StatelessWidget>;m:b E{o:(){},c:T"Click"}
```

Now generate a widget for a login form in COON format.
```

### Strategy 2: Format Header

For generation tasks, provide a header template:

```
Generate a Flutter screen in COON format.

Format rules:
- c: = class, < = extends
- S = Scaffold, C = Column, R = Row, T = Text
- a: = appBar, b: = body, h: = children
- @ = EdgeInsets, ~ = constructor

Example structure:
c:ClassName<StatelessWidget>;m:b S{a:B{t:T"Title"},b:...}

Generate: A profile screen with avatar and user info
```

### Strategy 3: Multi-Turn Compression

For complex applications, use multi-turn conversations:

```
Turn 1:
User: Here's my home screen in COON:
c:HomeScreen<StatelessWidget>;m:b S{b:C{h:[T"Welcome",T"Home"]}}

Turn 2:
User: Now add a navigation bar with 3 items.

Turn 3:
User: Convert the output back to Dart.
```

## Multi-Agent Systems

### Agent Communication

Compress code when passing between agents:

```python
class CodeAgent:
    def process(self, code: str) -> str:
        # Compress for transfer
        compressed = compress_dart(code)
        
        # Send to next agent
        result = next_agent.process(compressed)
        
        # Decompress result
        return decompress_coon(result)
```

### Context Management

```python
class ContextManager:
    def __init__(self, max_tokens: int = 4000):
        self.max_tokens = max_tokens
        self.contexts = {}
    
    def store(self, key: str, code: str):
        # Always store compressed
        compressed = compress_dart(code)
        self.contexts[key] = compressed
    
    def build_prompt(self, keys: list[str]) -> str:
        prompt_parts = []
        for key in keys:
            prompt_parts.append(f"# {key}\n{self.contexts[key]}")
        return "\n\n".join(prompt_parts)
```

### Token Budget Optimization

```python
def optimize_context(screens: dict[str, str], budget: int) -> str:
    """Fit as many screens as possible in token budget."""
    compressed = {
        name: compress_dart(code) 
        for name, code in screens.items()
    }
    
    context = []
    used = 0
    
    for name, code in sorted(compressed.items(), key=lambda x: len(x[1])):
        tokens = count_tokens(code)
        if used + tokens <= budget:
            context.append(f"# {name}\n{code}")
            used += tokens
    
    return "\n\n".join(context)
```

## Validation

### Round-Trip Validation

Always validate LLM-generated COON:

```python
from coon import decompress_coon, validate_syntax

def validate_llm_output(coon_code: str) -> tuple[bool, str]:
    """Validate COON output from LLM."""
    
    # Check syntax
    if not validate_syntax(coon_code):
        return False, "Invalid COON syntax"
    
    # Try decompression
    try:
        dart_code = decompress_coon(coon_code)
    except Exception as e:
        return False, f"Decompression failed: {e}"
    
    # Check Dart syntax (optional)
    if not validate_dart_syntax(dart_code):
        return False, "Generated Dart has syntax errors"
    
    return True, dart_code
```

### Error Recovery

```python
def generate_with_retry(prompt: str, max_retries: int = 3) -> str:
    """Generate COON with retry on validation failure."""
    
    for attempt in range(max_retries):
        response = llm.generate(prompt)
        coon_code = extract_coon_block(response)
        
        valid, result = validate_llm_output(coon_code)
        
        if valid:
            return result
        
        # Add error feedback to prompt
        prompt += f"\n\nPrevious attempt had error: {result}. Please fix."
    
    raise ValueError("Failed to generate valid COON after retries")
```

## System Prompts

### For Code Generation

```
You are a Flutter code generator that outputs in COON format for token efficiency.

COON Format Quick Reference:
- c:Name<Parent = class declaration with extends
- m:b = build method
- S = Scaffold, C = Column, R = Row, T = Text, P = Padding
- a: = appBar, b: = body, c: = child, h: = children
- @N = EdgeInsets.all(N)

Always output code in ```coon blocks.
```

### For Code Analysis

```
You are a code analyst that works with COON-compressed Flutter code.

When analyzing COON code:
1. First mentally decompress to understand structure
2. Identify widgets: S=Scaffold, C=Column, R=Row, etc.
3. Identify properties: a:=appBar, b:=body, h:=children

Provide analysis in plain language, not COON format.
```

## Best Practices

::: tip Use Code Blocks
Always wrap COON in ` ```coon ` code blocks for clarity.
:::

::: tip Show Format First
Start conversations by showing COON examples before asking for generation.
:::

::: tip Validate Output
Always validate and decompress LLM-generated COON before use.
:::

::: warning Token Limits
Even with compression, respect LLM context limits. Monitor token usage.
:::

## Example Prompts

### Generate Screen

```
Generate a Flutter settings screen in COON format with:
- AppBar with "Settings" title
- ListView with sections for Account, Notifications, Privacy
- Each section has a header and list tiles

Output in ```coon block.
```

### Modify Existing

```
Here is a login screen in COON:
```coon
c:LoginScreen<StatelessWidget>;m:b S{a:B{t:T"Login"},b:C{h:[F{},F{},E{c:T"Submit"}]}}
```

Add:
1. Logo image at top
2. "Forgot Password" link below submit button
3. Padding around the form

Output modified COON.
```

### Explain Code

```
Explain what this COON code does:
```coon
c:ProfileScreen<StatefulWidget>;st:_ProfileScreenState;f:user;m:b S{a:B{t:T"Profile",A:[Ib{o:_edit,Ic:Icons.edit}]},b:C{h:[CircleAvatar{r:50},T{user.name},T{user.email}]}}
```

Describe the UI structure and functionality.
```
