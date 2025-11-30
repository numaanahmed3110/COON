"""
Tests for COON compression
"""

import pytest
from coon import compress_dart, decompress_coon, Compressor


def test_basic_compression():
    """Test basic compression works"""
    dart_code = """class MyWidget extends StatelessWidget {
  Widget build(BuildContext context) {
    return Text("Hello");
  }
}"""
    
    compressed = compress_dart(dart_code)
    
    # Should be shorter
    assert len(compressed) < len(dart_code)
    
    # Should contain COON syntax
    assert 'c:MyWidget<StatelessWidget>' in compressed
    assert 'm:build(ctx)->Widget' in compressed
    assert 'Txt("Hello")' in compressed


def test_compression_ratio():
    """Test that compression achieves at least 30% reduction"""
    dart_code = """class LoginScreen extends StatelessWidget {
  final TextEditingController emailController = TextEditingController();
  
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: Column(
        children: [
          Text("Welcome"),
        ],
      ),
    );
  }
}"""
    
    compressor = Compressor()
    result = compressor.compress(dart_code)
    
    # Should achieve at least 30% compression
    assert result.compression_ratio >= 0.30


def test_round_trip_preserves_semantics():
    """Test that compress → decompress preserves code structure"""
    dart_code = """class TestWidget extends StatelessWidget {
  Widget build(BuildContext context) {
    return Scaffold(
      body: Text("Test"),
    );
  }
}"""
    
    compressed = compress_dart(dart_code)
    decompressed = decompress_coon(compressed)
    
    # Should contain key elements
    assert 'class TestWidget extends StatelessWidget' in decompressed
    assert 'Widget build' in decompressed
    assert 'Scaffold' in decompressed
    assert 'Text("Test")' in decompressed


def test_widget_abbreviation():
    """Test that widgets are properly abbreviated"""
    dart_code = "Scaffold(body: Column(children: [Text('Hi')]))"
    compressed = compress_dart(dart_code)
    
    assert 'Scf' in compressed
    assert 'Col' in compressed
    assert 'Txt' in compressed


def test_property_abbreviation():
    """Test that properties are properly abbreviated"""
    dart_code = "Scaffold(appBar: AppBar(title: Text('Title')))"
    compressed = compress_dart(dart_code)
    
    assert 'ap:' in compressed
    assert 't:' in compressed


def test_empty_input():
    """Test handling of empty input"""
    result = compress_dart("")
    assert result == ""


def test_compressor_result_object():
    """Test CompressionResult object has correct fields"""
    compressor = Compressor()
    result = compressor.compress("class Test {}")
    
    assert hasattr(result, 'compressed_code')
    assert hasattr(result, 'original_tokens')
    assert hasattr(result, 'compressed_tokens')
    assert hasattr(result, 'compression_ratio')
    assert hasattr(result, 'strategy_used')
    assert hasattr(result, 'token_savings')
    assert hasattr(result, 'percentage_saved')


if __name__ == '__main__':
    pytest.main([__file__, '-v'])
