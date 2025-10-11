# Script PowerShell pour automatiser Git add, commit et push

param (
    [string]$message = "Mise à jour automatique"  # Message de commit par défaut
)

# Aller dans le dossier du projet (à adapter si besoin)
Set-Location "C:\Users\maxim\Documents\Recueil\trajectoire-interactive\src"

# Ajouter tous les fichiers modifiés et non suivis
git add .

# Commit avec le message fourni
git commit -m "$message"

# Récupérer les changements du remote et rebaser pour éviter les conflits
git pull origin master --rebase

# Pousser les changements sur GitHub
git push origin master
