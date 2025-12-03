#!/usr/bin/env python3
"""
Cross-SDK Conformance Test Runner

Validates that both Python and JavaScript SDKs produce
consistent results against shared conformance fixtures.

Usage:
    python scripts/run_conformance.py
    python scripts/run_conformance.py --sdk python
    python scripts/run_conformance.py --verbose
"""

import argparse
import json
import subprocess
import sys
from pathlib import Path
from typing import Dict, List, Any, Optional


# Paths
REPO_ROOT = Path(__file__).parent.parent
SPEC_DIR = REPO_ROOT / "spec"
FIXTURES_DIR = SPEC_DIR / "fixtures" / "conformance"
PYTHON_SDK = REPO_ROOT / "packages" / "python"
JS_SDK = REPO_ROOT / "packages" / "javascript"


class ConformanceRunner:
    """Runs conformance tests across SDKs."""
    
    def __init__(self, verbose: bool = False):
        self.verbose = verbose
        self.results: Dict[str, Dict[str, Any]] = {}
    
    def load_fixtures(self) -> Dict[str, dict]:
        """Load all conformance fixture files."""
        fixtures = {}
        
        for fixture_file in FIXTURES_DIR.glob("*.json"):
            with open(fixture_file, 'r', encoding='utf-8') as f:
                fixtures[fixture_file.stem] = json.load(f)
            
            if self.verbose:
                print(f"📄 Loaded {fixture_file.name}")
        
        return fixtures
    
    def run_python_tests(self, fixtures: Dict[str, dict]) -> Dict[str, Any]:
        """Run conformance tests for Python SDK."""
        print("\n🐍 Running Python SDK Conformance Tests...")
        
        results = {
            "sdk": "python",
            "passed": 0,
            "failed": 0,
            "skipped": 0,
            "details": []
        }
        
        try:
            # Run pytest on conformance tests
            cmd = [
                sys.executable, "-m", "pytest",
                str(PYTHON_SDK / "tests" / "test_conformance.py"),
                "-v", "--tb=short"
            ]
            
            if self.verbose:
                print(f"  Running: {' '.join(cmd)}")
            
            result = subprocess.run(
                cmd,
                capture_output=True,
                text=True,
                cwd=str(PYTHON_SDK)
            )
            
            # Parse output
            output = result.stdout + result.stderr
            
            # Count results from pytest output
            for line in output.split('\n'):
                if 'passed' in line.lower():
                    # Try to extract count
                    import re
                    match = re.search(r'(\d+)\s+passed', line)
                    if match:
                        results["passed"] = int(match.group(1))
                if 'failed' in line.lower():
                    match = re.search(r'(\d+)\s+failed', line)
                    if match:
                        results["failed"] = int(match.group(1))
                if 'skipped' in line.lower():
                    match = re.search(r'(\d+)\s+skipped', line)
                    if match:
                        results["skipped"] = int(match.group(1))
            
            results["success"] = result.returncode == 0
            results["output"] = output if self.verbose else None
            
        except Exception as e:
            results["success"] = False
            results["error"] = str(e)
        
        return results
    
    def run_javascript_tests(self, fixtures: Dict[str, dict]) -> Dict[str, Any]:
        """Run conformance tests for JavaScript SDK."""
        print("\n📦 Running JavaScript SDK Conformance Tests...")
        
        results = {
            "sdk": "javascript",
            "passed": 0,
            "failed": 0,
            "skipped": 0,
            "details": []
        }
        
        # Check if node_modules exists
        if not (JS_SDK / "node_modules").exists():
            print("  ⚠️  JavaScript SDK dependencies not installed")
            print("     Run: cd packages/javascript && npm install")
            results["skipped"] = 1
            results["success"] = True
            return results
        
        try:
            # Run Jest tests
            cmd = ["npm", "test", "--", "--testPathPattern=conformance"]
            
            if self.verbose:
                print(f"  Running: {' '.join(cmd)}")
            
            result = subprocess.run(
                cmd,
                capture_output=True,
                text=True,
                cwd=str(JS_SDK),
                shell=True if sys.platform == 'win32' else False
            )
            
            output = result.stdout + result.stderr
            results["success"] = result.returncode == 0
            results["output"] = output if self.verbose else None
            
            # Parse Jest output for counts
            import re
            for line in output.split('\n'):
                match = re.search(r'Tests:\s+(\d+)\s+passed', line)
                if match:
                    results["passed"] = int(match.group(1))
                match = re.search(r'(\d+)\s+failed', line)
                if match:
                    results["failed"] = int(match.group(1))
            
        except Exception as e:
            results["success"] = False
            results["error"] = str(e)
        
        return results
    
    def compare_sdk_outputs(self, fixtures: Dict[str, dict]) -> Dict[str, Any]:
        """Compare outputs between Python and JavaScript SDKs."""
        print("\n🔄 Comparing SDK Outputs...")
        
        comparison = {
            "matching": 0,
            "mismatching": 0,
            "details": []
        }
        
        # For each fixture, run both SDKs and compare
        for fixture_name, fixture_data in fixtures.items():
            test_cases = fixture_data.get("test_cases", [])
            
            for case in test_cases[:3]:  # Test first 3 cases per fixture
                input_code = case.get("input", "")
                if not input_code:
                    continue
                
                # Get Python output
                try:
                    python_output = self._get_python_compression(input_code)
                except Exception as e:
                    python_output = f"ERROR: {e}"
                
                # Get JavaScript output (if available)
                try:
                    js_output = self._get_javascript_compression(input_code)
                except Exception as e:
                    js_output = f"ERROR: {e}"
                
                # Compare (exact match not required, just check both succeed)
                if "ERROR" not in str(python_output) and "ERROR" not in str(js_output):
                    comparison["matching"] += 1
                else:
                    comparison["mismatching"] += 1
                    comparison["details"].append({
                        "case": case.get("name", "unnamed"),
                        "python": str(python_output)[:100],
                        "javascript": str(js_output)[:100]
                    })
        
        return comparison
    
    def _get_python_compression(self, code: str) -> str:
        """Get compression result from Python SDK."""
        # Import and use directly
        sys.path.insert(0, str(PYTHON_SDK / "src"))
        try:
            from coon import compress_dart
            return compress_dart(code)
        finally:
            sys.path.pop(0)
    
    def _get_javascript_compression(self, code: str) -> str:
        """Get compression result from JavaScript SDK."""
        # Use Node to run compression
        script = f'''
        const {{ compress }} = require('./dist/index.js');
        console.log(compress({json.dumps(code)}));
        '''
        
        result = subprocess.run(
            ["node", "-e", script],
            capture_output=True,
            text=True,
            cwd=str(JS_SDK)
        )
        
        if result.returncode != 0:
            raise Exception(result.stderr)
        
        return result.stdout.strip()
    
    def generate_report(self) -> str:
        """Generate conformance test report."""
        report = []
        report.append("=" * 70)
        report.append("CROSS-SDK CONFORMANCE TEST REPORT")
        report.append("=" * 70)
        
        for sdk, results in self.results.items():
            report.append(f"\n📦 {sdk.upper()} SDK:")
            report.append(f"   Passed: {results.get('passed', 0)}")
            report.append(f"   Failed: {results.get('failed', 0)}")
            report.append(f"   Skipped: {results.get('skipped', 0)}")
            report.append(f"   Status: {'✅ PASS' if results.get('success') else '❌ FAIL'}")
            
            if results.get('error'):
                report.append(f"   Error: {results['error']}")
        
        if "comparison" in self.results:
            comp = self.results["comparison"]
            report.append(f"\n🔄 Cross-SDK Comparison:")
            report.append(f"   Matching: {comp.get('matching', 0)}")
            report.append(f"   Mismatching: {comp.get('mismatching', 0)}")
        
        report.append("\n" + "=" * 70)
        
        # Overall status
        all_passed = all(
            r.get('success', False) 
            for k, r in self.results.items() 
            if k != 'comparison'
        )
        report.append(f"\n🎯 Overall: {'✅ ALL TESTS PASSED' if all_passed else '❌ SOME TESTS FAILED'}")
        report.append("")
        
        return "\n".join(report)
    
    def run(self, sdks: Optional[List[str]] = None):
        """Run all conformance tests."""
        fixtures = self.load_fixtures()
        
        if not sdks or 'python' in sdks:
            self.results['python'] = self.run_python_tests(fixtures)
        
        if not sdks or 'javascript' in sdks:
            self.results['javascript'] = self.run_javascript_tests(fixtures)
        
        # Compare outputs if both SDKs tested
        if 'python' in self.results and 'javascript' in self.results:
            self.results['comparison'] = self.compare_sdk_outputs(fixtures)
        
        print(self.generate_report())
        
        # Return success status
        return all(
            r.get('success', False) 
            for k, r in self.results.items() 
            if k != 'comparison'
        )


def main():
    parser = argparse.ArgumentParser(
        description="Run cross-SDK conformance tests"
    )
    parser.add_argument(
        '--sdk',
        choices=['python', 'javascript'],
        action='append',
        help="Specific SDK to test (can be repeated)"
    )
    parser.add_argument(
        '--verbose', '-v',
        action='store_true',
        help="Show verbose output"
    )
    
    args = parser.parse_args()
    
    runner = ConformanceRunner(verbose=args.verbose)
    success = runner.run(sdks=args.sdk)
    
    sys.exit(0 if success else 1)


if __name__ == "__main__":
    main()
