#!/bin/bash

echo "Creating FranklyFX architecture..."

# Create directories
mkdir -p core infrastructure

# Create __init__ files for module imports
touch core/__init__.py infrastructure/__init__.py

# Create requirements file
echo "requests==2.31.0" > requirements.txt

# Create application files
touch core/models.py core/interfaces.py core/service.py
touch infrastructure/providers.py
touch main.py

echo "✅ Setup complete! You can now paste the code into the files."
