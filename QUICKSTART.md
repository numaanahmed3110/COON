# 🚀 Quick Start Guide

## Installation

```bash
# From source
git clone https://github.com/yourusername/COON.git
cd COON
pip install -e .

# Or via pip (when published)
pip install coon-compress
```

## CLI Usage

### 1. Compress a Dart file

```bash
coon compress examples/login_screen.dart -o compressed.coon
```

Output:
```
✅ Compressed successfully!
📊 Original tokens: 481
📊 Compressed tokens: 241
💰 Compression ratio: 49.9%
⚡ Token savings: 240
📁 Saved to: compressed.coon
```

### 2. View compression statistics

```bash
coon stats examples/login_screen.dart
```

Output:
```
======================================================================
COON COMPRESSION STATISTICS
======================================================================

📄 File: examples/login_screen.dart

📊 Original:
   - Tokens: 481
   - Characters: 1924

📦 Compressed:
   - Tokens: 241
   - Characters: 967

💰 Savings:
   - Token reduction: 240 tokens (49.9%)
   - Compression ratio: 0.50
   - Strategy used: basic

💵 Cost Impact (GPT-4 pricing):
   - Input cost saved: $0.0072 per 1K tokens
   - Output cost saved: $0.0144 per 1K tokens
```

### 3. Decompress COON back to Dart

```bash
coon decompress compressed.coon -o generated.dart
```

## Python API Usage

```python
from coon import compress_dart, decompress_coon, Compressor

# Simple compression
dart_code = """
class MyWidget extends StatelessWidget {
  Widget build(BuildContext context) {
    return Text("Hello World");
  }
}
"""

compressed = compress_dart(dart_code)
print(compressed)
# Output: c:MyWidget<StatelessWidget>\nm:build(ctx)->Widget\nret Txt("Hello World")

# Decompression
original = decompress_coon(compressed)
print(original)

# Advanced usage with stats
compressor = Compressor()
result = compressor.compress(dart_code)

print(f"Original: {result.original_tokens} tokens")
print(f"Compressed: {result.compressed_tokens} tokens")
print(f"Saved: {result.percentage_saved:.1f}%")
print(f"Strategy: {result.strategy_used.value}")
```

## Web Demo

Try COON in your browser:

1. Open `demo/index.html` in a browser
2. Or deploy to Vercel/Netlify (see DEPLOYMENT.md)
3. Paste your Dart code
4. Click "Compress"
5. See real-time token savings!

## Real-World Example

**Original Dart (481 tokens):**
```dart
class LoginScreen extends StatelessWidget {
  final TextEditingController emailController = TextEditingController();
  final TextEditingController passwordController = TextEditingController();
  
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text("Login"),
        centerTitle: true,
      ),
      body: SafeArea(
        child: Padding(
          padding: EdgeInsets.all(24.0),
          child: Column(
            mainAxisAlignment: MainAxisAlignment.center,
            children: [
              Text("Welcome Back"),
              TextField(controller: emailController),
              TextField(controller: passwordController, obscureText: true),
              ElevatedButton(onPressed: () {}, child: Text("Login")),
            ],
          ),
        ),
      ),
    );
  }
}
```

**Compressed COON (241 tokens - 50% savings!):**
```
c:LoginScreen<StatelessWidget>
f:emailController=TextEditingController
f:passwordController=TextEditingController

m:build(ctx)->Widget
ret Scf(
  ap: AppBar(t: Txt("Login"), centerTitle: true)
  bd: SA(
    ch: Pad(
      pd: pd:24.0,
      ch: Col(
        mainAlignment: MainAlignment.center,
        ch: [
          Txt("Welcome Back"),
          TextField(c: emailController),
          TextField(c: passwordController, obscureText: true),
          ElevatedButton(op: () {}, ch: Txt("Login"))
        ]
      )
    )
  )
)
```

## Next Steps

- Read the [Full Specification](docs/SPECIFICATION.md)
- Check [API Reference](docs/API.md)
- See [More Examples](examples/)
- Deploy the [Web Demo](DEPLOYMENT.md)

---

**Questions?** Open an issue on [GitHub](https://github.com/yourusername/COON/issues)
