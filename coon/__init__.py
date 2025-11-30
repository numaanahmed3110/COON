"""
COON: Code-Oriented Object Notation
Token-efficient compression for Dart/Flutter code
"""

__version__ = "0.1.0"
__author__ = "FlutterAI Team"
__license__ = "MIT"

from .compressor import compress_dart, decompress_coon, Compressor, CompressionResult
from .strategy import CompressionStrategy

__all__ = [
    "compress_dart",
    "decompress_coon",
    "Compressor",
    "CompressionResult",
    "CompressionStrategy",
]
