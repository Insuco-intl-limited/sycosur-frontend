// Importation des composants et dépendances nécessaires
import Link from "next/link";
import React from "react"

// Définition du type pour les props du composant
type FormHeaderProps = {
  title?: string;
  staticText?: string;
  linkText?: string;
  linkHref?: string;
  icon?: boolean;
};

// Définition du composant avec destructuration des props
function AuthFormHeader({
  title,
  staticText,
  linkHref,
  linkText,
  icon = true,
}: FormHeaderProps) {
  return (
    // Conteneur principal avec design plat et moderne
    <div className="w-full max-w-2xl mx-auto px-6 py-8">
      {/* Logo SYCOSUR2.0 avec design atypique */}
      {icon && (
        <div className="flex justify-center mb-8">
          <div className="relative group">
            {/* Fond décoratif avec effet de profondeur */}
            <div className="absolute inset-0 bg-gradient-to-br from-lime-400/20 via-green-500/20 to-emerald-600/20 dark:from-lime-500/30 dark:via-green-400/30 dark:to-emerald-500/30 rounded-2xl blur-xl transform rotate-3 scale-110"></div>
            
            {/* Container principal du logo */}
            <div className="relative bg-white/90 dark:bg-gray-900/90 backdrop-blur-sm rounded-2xl border border-gray-200/50 dark:border-gray-700/50 shadow-lg px-8 py-6 transform transition-all duration-300 group-hover:scale-105 group-hover:rotate-1">
              
              {/* Logo textuel avec styles atypiques */}
              <div className="text-center">
                <div className="font-black text-3xl tracking-wider">
                  {/* SYCO avec style moderne */}
                  <span className="bg-gradient-to-r from-gray-800 via-gray-900 to-black dark:from-lime-400 dark:via-green-400 dark:to-emerald-400 bg-clip-text text-transparent">
                    SYCO
                  </span>
                  
                  {/* SUR avec accent coloré */}
                  <span className="bg-gradient-to-r from-lime-500 via-green-500 to-emerald-600 dark:from-lime-300 dark:via-green-300 dark:to-emerald-300 bg-clip-text text-transparent">
                    SUR
                  </span>
                  
                  {/* 2.0 avec style tech */}
                  <span className="relative ml-1">
                    <span className="text-xs font-bold text-gray-600 dark:text-gray-300 relative top-[-8px] bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded-md border border-gray-300 dark:border-gray-600">
                      2.0
                    </span>
                  </span>
                </div>
                
                {/* Ligne décorative sous le logo */}
                <div className="mt-3 flex items-center justify-center space-x-2">
                  <div className="h-px w-8 bg-gradient-to-r from-transparent via-lime-400 to-transparent"></div>
                  <div className="w-2 h-2 bg-lime-500 rounded-full animate-pulse"></div>
                  <div className="h-px w-8 bg-gradient-to-r from-transparent via-green-500 to-transparent"></div>
                </div>

              </div>
            </div>
            
            {/* Éléments décoratifs flottants */}
            <div className="absolute -top-2 -right-2 w-3 h-3 bg-lime-400 rounded-full opacity-60 animate-bounce delay-75"></div>
            <div className="absolute -bottom-1 -left-3 w-2 h-2 bg-green-500 rounded-full opacity-40 animate-bounce delay-150"></div>
          </div>
        </div>
      )}

      {/* Titre avec design plat et moderne */}
      <div className="text-center space-y-3">
        <h1 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-babyPowder font-robotoSlab">
          {title}
        </h1>
        
        {/* Ligne décorative subtile */}
        <div className="flex items-center justify-center">
          <div className="h-px w-16 bg-gradient-to-r from-transparent via-gray-300 dark:via-gray-600 to-transparent"></div>
        </div>
      </div>

      {/* Section du texte et lien avec design plat */}
      {(staticText || linkText) && linkHref && (
        <div className="mt-6 text-center">
          <p className="text-base text-gray-600 dark:text-gray-300 leading-relaxed">
            {/* Affiche le texte statique s'il existe */}
            {staticText && <span className="mr-2">{staticText}</span>}

            {/* Lien avec design plat et moderne */}
            {linkText && (
              <Link
                href={linkHref}
                className="inline-flex items-center font-medium text-gray-900 dark:text-lime-400 hover:text-gray-700 dark:hover:text-lime-300 transition-colors duration-200 underline decoration-2 underline-offset-4 decoration-gray-300 dark:decoration-lime-400/50 hover:decoration-gray-500 dark:hover:decoration-lime-300"
              >
                {linkText}
              </Link>
            )}
          </p>
        </div>
      )}
    </div>
  );
}

export default React.memo(AuthFormHeader)