"use client";

import { useViewNavigation } from "@/hooks/useViewNavigation";

export default function DashboardPage() {
  const { projects } = useViewNavigation();
  
  // Get the three most recent projects
  const latestProjects = [...projects]
    .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
    .slice(0, 3);

  // Format date to a more readable format
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('fr-FR', { 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric' 
    });
  };

  return (
    <div className="space-y-8 p-2">
      {/* En-tête de la page avec gradient */}
      <div className="bg-gradient-to-r from-[#3189a1] to-[#41a1b8] text-white p-6 rounded-lg shadow-md">
        <h1 className="text-3xl font-bold">Tableau de bord</h1>
        <p className="mt-2 text-white/80">Bienvenue sur votre espace de gestion de projets</p>
      </div>

      {/* Statistiques avec icônes */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-md border-l-4 border-[#3189a1] hover:shadow-lg transition-shadow">
          <div className="flex items-center mb-2">
            <div className="w-10 h-10 rounded-full bg-[#3189a1]/10 flex items-center justify-center mr-3">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-[#3189a1]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
              </svg>
            </div>
            <h3 className="text-lg font-semibold text-gray-800">Projets en cours</h3>
          </div>
          <div className="text-3xl font-bold text-[#3189a1]">4</div>
          <p className="text-sm text-gray-500 mt-1">Dernière mise à jour: aujourd'hui</p>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md border-l-4 border-[#e74c3c] hover:shadow-lg transition-shadow">
          <div className="flex items-center mb-2">
            <div className="w-10 h-10 rounded-full bg-[#e74c3c]/10 flex items-center justify-center mr-3">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-[#e74c3c]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h3 className="text-lg font-semibold text-gray-800">Échéances proches</h3>
          </div>
          <div className="text-3xl font-bold text-[#e74c3c]">2</div>
          <p className="text-sm text-gray-500 mt-1">Dans les 7 prochains jours</p>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md border-l-4 border-[#27ae60] hover:shadow-lg transition-shadow">
          <div className="flex items-center mb-2">
            <div className="w-10 h-10 rounded-full bg-[#27ae60]/10 flex items-center justify-center mr-3">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-[#27ae60]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h3 className="text-lg font-semibold text-gray-800">Projets complétés</h3>
          </div>
          <div className="text-3xl font-bold text-[#27ae60]">3</div>
          <p className="text-sm text-gray-500 mt-1">Ce trimestre</p>
        </div>
      </div>

      {/* Projets récents */}
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-xl font-bold mb-4 text-gray-800 flex items-center">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-2 text-[#3189a1]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 12l3-3 3 3 4-4M8 21l4-4 4 4M3 4h18M4 4h16v12a1 1 0 01-1 1H5a1 1 0 01-1-1V4z" />
          </svg>
          Projets récents
        </h2>
        <div className="space-y-4">
          {latestProjects.map(project => (
            <div key={project.ID} className="border-b border-gray-100 pb-4 last:border-0">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="font-medium text-[#3189a1]">{project.name}</h3>
                  <p className="text-sm text-gray-600 mt-1">{project.description}</p>
                </div>
                <span className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded">
                  {formatDate(project.createdAt)}
                </span>
              </div>
            </div>
          ))}
        </div>
        <button className="mt-4 text-[#3189a1] hover:text-[#41a1b8] text-sm font-medium flex items-center">
          Voir tous les projets
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>

      {/* Sections principales */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-gradient-to-br from-[#3189a1] to-[#41a1b8] text-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-bold mb-4 flex items-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            Activités à venir
          </h2>
          <div className="space-y-3">
            <div className="flex justify-between items-center bg-white/10 p-3 rounded">
              <span className="font-medium">28 fév 2023</span>
              <span>Formation sur le terrain</span>
            </div>
            <div className="flex justify-between items-center bg-white/10 p-3 rounded">
              <span className="font-medium">28 fév 2023</span>
              <span>Mise en place d'un fonds d'appui</span>
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-br from-[#e74c3c] to-[#f39c12] text-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-bold mb-4 flex items-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            Activités en retard
          </h2>
          <div className="space-y-3">
            <div className="flex justify-between items-center bg-white/10 p-3 rounded">
              <span className="font-medium">28 avr 2023</span>
              <span>Formation des bénéficiaires</span>
            </div>
            <div className="flex justify-between items-center bg-white/10 p-3 rounded">
              <span className="font-medium">28 avr 2023</span>
              <span>Mise en place d'un fonds d'appui</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
