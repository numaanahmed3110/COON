"""
COON Compressor
Main compression/decompression engine
"""

import re
from dataclasses import dataclass
from enum import Enum
from typing import Optional


class CompressionStrategy(Enum):
    """Available compression strategies"""
    AUTO = "auto"
    BASIC = "basic"
    AGGRESSIVE = "aggressive"
    COMPONENT_REF = "component_ref"


@dataclass
class CompressionResult:
    """Result of compression operation"""
    compressed_code: str
    original_tokens: int
    compressed_tokens: int
    compression_ratio: float
    strategy_used: CompressionStrategy
    
    @property
    def token_savings(self) -> int:
        return self.original_tokens - self.compressed_tokens
    
    @property
    def percentage_saved(self) -> float:
        return self.compression_ratio * 100


# Abbreviation dictionaries
KEYWORD_ABBREV = {
    'class': 'c:',
    'final': 'f:',
    'extends': '<',
    'import': 'im:',
    'return': 'ret',
    'async': 'asy',
    'await': 'awt',
}

WIDGET_ABBREV = {
    'Scaffold': 'Scf',
    'Column': 'Col',
    'Row': 'Row',
    'Container': 'Cont',
    'Padding': 'Pad',
    'Center': 'Ctr',
    'Text': 'Txt',
    'AppBar': 'AppBar',
    'SafeArea': 'SA',
    'SizedBox': 'Szb',
    'Expanded': 'Exp',
    'ListView': 'Lstv',
    'GridView': 'GrdV',
    'Stack': 'Stk',
    'Positioned': 'Pos',
}

PROPERTY_ABBREV = {
    'controller': 'c:',
    'onPressed': 'op:',
    'onChanged': 'oc:',
    'children': 'ch:',
    'child': 'ch:',
    'body': 'bd:',
    'appBar': 'ap:',
    'text': 't:',
    'title': 't:',
    'label': 'lbl:',
    'hint': 'hnt:',
    'padding': 'pd:',
    'margin': 'mg:',
    'height': 'h:',
    'width': 'w:',
    'alignment': 'al:',
    'color': 'clr:',
    'backgroundColor': 'bg:',
}


def count_tokens(text: str) -> int:
    """Estimate token count (rough: 4 chars ≈ 1 token)"""
    return len(text) // 4


class Compressor:
    """Main COON compression engine"""
    
    def __init__(self, component_registry: Optional[str] = None):
        """
        Initialize compressor
        
        Args:
            component_registry: Path to component registry JSON (optional)
        """
        self.component_registry = component_registry
        # TODO: Load component registry if provided
    
    def compress(
        self,
        dart_code: str,
        strategy: str = "auto"
    ) -> CompressionResult:
        """
        Compress Dart code to COON format
        
        Args:
            dart_code: Original Dart source code
            strategy: Compression strategy ("auto", "basic", "aggressive")
            
        Returns:
            CompressionResult with compressed code and stats
        """
        original_tokens = count_tokens(dart_code)
        
        # Select strategy
        if strategy == "auto":
            strategy_enum = CompressionStrategy.BASIC  # For now
        else:
            strategy_enum = CompressionStrategy[strategy.upper()]
        
        # Apply compression
        compressed = self._compress_basic(dart_code)
        
        compressed_tokens = count_tokens(compressed)
        ratio = 1 - (compressed_tokens / original_tokens)
        
        return CompressionResult(
            compressed_code=compressed,
            original_tokens=original_tokens,
            compressed_tokens=compressed_tokens,
            compression_ratio=ratio,
            strategy_used=strategy_enum
        )
    
    def decompress(self, coon_code: str) -> str:
        """
        Decompress COON format back to Dart
        
        Args:
            coon_code: Compressed COON code
            
        Returns:
            Original Dart code (approximately)
        """
        return self._decompress_basic(coon_code)
    
    def _compress_basic(self, dart_code: str) -> str:
        """Basic compression using regex transformations"""
        coon = dart_code
        
        # 1. Remove unnecessary whitespace
        coon = re.sub(r'[ \t]+', ' ', coon)
        coon = re.sub(r' *\n *', '\n', coon)
        
        # 2. Remove @override annotations
        coon = re.sub(r'@override\s*\n', '', coon)
        
        # 3. Compress class declarations
        coon = re.sub(
            r'class (\w+) extends (\w+) \{',
            r'c:\1<\2>',
            coon
        )
        
        # 4. Compress field declarations
        coon = re.sub(
            r'final (\w+) (\w+) = (\w+)\(\);',
            r'f:\2=\3',
            coon
        )
        
        # 5. Compress method declarations
        coon = re.sub(
            r'Widget build\(BuildContext context\) \{',
            r'm:build(ctx)->Widget',
            coon
        )
        
        # 6. Compress return statements
        coon = re.sub(r'\breturn\b', 'ret', coon)
        
        # 7. Abbreviate widgets
        for full, abbrev in WIDGET_ABBREV.items():
            if full != abbrev:
                coon = re.sub(r'\b' + full + r'\b', abbrev, coon)
        
        # 8. Abbreviate properties
        for full, abbrev in PROPERTY_ABBREV.items():
            coon = re.sub(r'\b' + full + r':', abbrev, coon)
        
        # 9. Compress context
        coon = re.sub(r'BuildContext context', 'ctx', coon)
        coon = re.sub(r'\bcontext\b', 'ctx', coon)
        
        # 10. Remove semicolons at line end
        coon = re.sub(r';\s*\n', '\n', coon)
        
        # 11. Compress EdgeInsets
        coon = re.sub(r'EdgeInsets\.all\((\d+(?:\.\d+)?)\)', r'pd:\1', coon)
        
        return coon
    
    def _decompress_basic(self, coon_code: str) -> str:
        """Basic decompression - reverse transformations"""
        dart = coon_code
        
        # Reverse in opposite order
        
        # 1. Expand EdgeInsets
        dart = re.sub(r'pd:(\d+(?:\.\d+)?)', r'EdgeInsets.all(\1)', dart)
        
        # 2. Expand context
        dart = re.sub(r'\bctx\b', 'context', dart)
        
        # 3. Expand properties
        for full, abbrev in PROPERTY_ABBREV.items():
            dart = re.sub(abbrev.replace(':', r'\:'), full + ':', dart)
        
        # 4. Expand widgets
        for full, abbrev in WIDGET_ABBREV.items():
            if full != abbrev:
                dart = re.sub(r'\b' + abbrev + r'\b', full, dart)
        
        # 5. Expand return
        dart = re.sub(r'\bret\b', 'return', dart)
        
        # 6. Expand method declarations
        dart = re.sub(
            r'm:build\(ctx\)->Widget',
            r'@override\n  Widget build(BuildContext context) {',
            dart
        )
        
        # 7. Expand fields
        dart = re.sub(
            r'f:(\w+)=(\w+)',
            r'final \2 \1 = \2();',
            dart
        )
        
        # 8. Expand class declarations
        dart = re.sub(
            r'c:(\w+)<(\w+)>',
            r'class \1 extends \2 {',
            dart
        )
        
        # 9. Add semicolons back (heuristic)
        lines = dart.split('\n')
        formatted_lines = []
        for line in lines:
            stripped = line.strip()
            if stripped and not stripped.endswith(('{', '}', ';', ',')):
                if not stripped.startswith(('c:', 'f:', 'm:', '@', '//')):
                    line = line.rstrip() + ';'
            formatted_lines.append(line)
        dart = '\n'.join(formatted_lines)
        
        return dart


# Convenience functions
def compress_dart(dart_code: str, strategy: str = "auto") -> str:
    """
    Compress Dart code to COON format
    
    Args:
        dart_code: Original Dart source code
        strategy: Compression strategy
        
    Returns:
        Compressed COON code string
    """
    compressor = Compressor()
    result = compressor.compress(dart_code, strategy)
    return result.compressed_code


def decompress_coon(coon_code: str) -> str:
    """
    Decompress COON format back to Dart
    
    Args:
        coon_code: Compressed COON code
        
    Returns:
        Decompressed Dart code
    """
    compressor = Compressor()
    return compressor.decompress(coon_code)
