#!/bin/bash

# Para una corrección rápida
# ./release.sh patch "Arreglado el error en los botones de PayPal"
# Para una nueva sección
# ./release.sh minor "Añadida la nueva sección de Recomendaciones"
# Para un gran lanzamiento
# ./release.sh major "Lanzamiento oficial de AnimeZone v2"

if [ -z "$1" ]; then
    echo "Usage: ./release.sh [patch|minor|major] \"Commit message\""
    exit 1
fi

VERSION_TYPE=$1
COMMIT_MESSAGE=$2

if [ -z "$COMMIT_MESSAGE" ]; then
    COMMIT_MESSAGE="Release $VERSION_TYPE version"
fi

# 1. Add all changes first
git add .

# 2. Commit changes
git commit -m "$COMMIT_MESSAGE"

# 3. Update version and create tag
npm version $VERSION_TYPE -m "chore: bump version to %s"

# 4. Push
git push origin main --follow-tags

echo "Successfully released $VERSION_TYPE version and pushed to GitHub! 🚀"
