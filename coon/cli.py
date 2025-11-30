#!/usr/bin/env python3
"""
COON CLI - Command-line interface for COON compression
"""

import click
from pathlib import Path
from coon import compress_dart, decompress_coon, Compressor


@click.group()
@click.version_option(version="0.1.0")
def cli():
    """COON: Code-Oriented Object Notation
    
    Token-efficient compression for Dart/Flutter code
    """
    pass


@cli.command()
@click.argument('input_file', type=click.Path(exists=True))
@click.option('-o', '--output', type=click.Path(), help='Output file (default: stdout)')
@click.option('-s', '--strategy', type=click.Choice(['auto', 'basic', 'aggressive']), default='auto', help='Compression strategy')
def compress(input_file, output, strategy):
    """Compress Dart code to COON format"""
    # Read input file
    input_path = Path(input_file)
    dart_code = input_path.read_text(encoding='utf-8')
    
    # Compress
    compressor = Compressor()
    result = compressor.compress(dart_code, strategy=strategy)
    
    # Show stats
    click.echo(f"✅ Compressed successfully!", err=True)
    click.echo(f"📊 Original tokens: {result.original_tokens}", err=True)
    click.echo(f"📊 Compressed tokens: {result.compressed_tokens}", err=True)
    click.echo(f"💰 Compression ratio: {result.percentage_saved:.1f}%", err=True)
    click.echo(f"⚡ Token savings: {result.token_savings}", err=True)
    
    # Write output
    if output:
        output_path = Path(output)
        output_path.write_text(result.compressed_code, encoding='utf-8')
        click.echo(f"📁 Saved to: {output}", err=True)
    else:
        click.echo(result.compressed_code)


@cli.command()
@click.argument('input_file', type=click.Path(exists=True))
@click.option('-o', '--output', type=click.Path(), help='Output file (default: stdout)')
def decompress(input_file, output):
    """Decompress COON format back to Dart"""
    # Read input file
    input_path = Path(input_file)
    coon_code = input_path.read_text(encoding='utf-8')
    
    # Decompress
    dart_code = decompress_coon(coon_code)
    
    click.echo("✅ Decompressed successfully!", err=True)
    
    # Write output
    if output:
        output_path = Path(output)
        output_path.write_text(dart_code, encoding='utf-8')
        click.echo(f"📁 Saved to: {output}", err=True)
    else:
        click.echo(dart_code)


@cli.command()
@click.argument('input_file', type=click.Path(exists=True))
def stats(input_file):
    """Show compression statistics for a Dart file"""
    # Read file
    input_path = Path(input_file)
    dart_code = input_path.read_text(encoding='utf-8')
    
    # Compress
    compressor = Compressor()
    result = compressor.compress(dart_code, strategy='auto')
    
    # Display detailed stats
    click.echo("="*70)
    click.echo("COON COMPRESSION STATISTICS")
    click.echo("="*70)
    click.echo(f"\n📄 File: {input_file}")
    click.echo(f"\n📊 Original:")
    click.echo(f"   - Tokens: {result.original_tokens}")
    click.echo(f"   - Characters: {len(dart_code)}")
    click.echo(f"\n📦 Compressed:")
    click.echo(f"   - Tokens: {result.compressed_tokens}")
    click.echo(f"   - Characters: {len(result.compressed_code)}")
    click.echo(f"\n💰 Savings:")
    click.echo(f"   - Token reduction: {result.token_savings} tokens ({result.percentage_saved:.1f}%)")
    click.echo(f"   - Compression ratio: {result.compression_ratio:.2f}")
    click.echo(f"   - Strategy used: {result.strategy_used.value}")
    click.echo(f"\n💵 Cost Impact (GPT-4 pricing):")
    input_cost_saved = (result.token_savings / 1000) * 0.03
    output_cost_saved = (result.token_savings / 1000) * 0.06
    click.echo(f"   - Input cost saved: ${input_cost_saved:.4f} per 1K tokens")
    click.echo(f"   - Output cost saved: ${output_cost_saved:.4f} per 1K tokens")
    click.echo()


if __name__ == '__main__':
    cli()
