from setuptools import setup, find_packages

with open("README.md", "r", encoding="utf-8") as fh:
    long_description = fh.read()

setup(
    name="coon-compress",
    version="0.1.0",
    author="FlutterAI Team",
    author_email="contact@flutterai.dev",
    description="Token-efficient compression for Dart/Flutter code",
    long_description=long_description,
    long_description_content_type="text/markdown",
    url="https://github.com/yourusername/COON",
    project_urls={
        "Bug Tracker": "https://github.com/yourusername/COON/issues",
        "Documentation": "https://github.com/yourusername/COON/blob/main/docs/SPECIFICATION.md",
        "Demo": "https://coon-demo.vercel.app",
    },
    packages=find_packages(),
    classifiers=[
        "Development Status :: 3 - Alpha",
        "Intended Audience :: Developers",
        "Topic :: Software Development :: Code Generators",
        "Topic :: Software Development :: Compilers",
        "License :: OSI Approved :: MIT License",
        "Programming Language :: Python :: 3",
        "Programming Language :: Python :: 3.8",
        "Programming Language :: Python :: 3.9",
        "Programming Language :: Python :: 3.10",
        "Programming Language :: Python :: 3.11",
    ],
    python_requires=">=3.8",
    install_requires=[
        "click>=8.0.0",
    ],
    extras_require={
        "dev": [
            "pytest>=7.0.0",
            "pytest-cov>=3.0.0",
            "black>=22.0.0",
            "flake8>=4.0.0",
            "mypy>=0.950",
        ],
    },
    entry_points={
        "console_scripts": [
            "coon=coon.cli:cli",
        ],
    },
)
