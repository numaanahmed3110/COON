"""
Compression strategies
"""

from enum import Enum


class CompressionStrategy(Enum):
    """Available compression strategies"""
    AUTO = "auto"
    BASIC = "basic"
    AGGRESSIVE = "aggressive"
    COMPONENT_REF = "component_ref"
    TEMPLATE_REF = "template_ref"
