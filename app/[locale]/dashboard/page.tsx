export default function DashboardPage() {
  return (
    <div className="space-y-6">
      {/* En-tête de la page */}
      <div className="bg-[#3189a1] text-white p-4">
        <h1 className="text-2xl font-bold">Mes activités - Total : 4</h1>
      </div>

      {/* Statistiques */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 shadow">
          <h3 className="text-lg font-semibold text-gray-800 mb-2">En cours</h3>
          <div className="text-3xl font-bold text-[#3189a1]">4</div>
        </div>

        <div className="bg-white p-6 shadow">
          <h3 className="text-lg font-semibold text-gray-800 mb-2">En retard</h3>
          <div className="text-3xl font-bold text-[#3853a1]">4</div>
        </div>

        <div className="bg-white p-6 shadow">
          <h3 className="text-lg font-semibold text-gray-800 mb-2">Clôture</h3>
          <div className="text-3xl font-bold text-[#416c78]">4</div>
        </div>
      </div>

      {/* Sections principales */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-[#3189a1] text-white p-6">
          <h2 className="text-xl font-bold mb-4">Activités à venir</h2>
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <span>2023-02-28</span>
              <span>formation</span>
            </div>
            <div className="flex justify-between items-center">
              <span>2023-02-28</span>
              <span>mise en place d'un fonds d'appui</span>
            </div>
          </div>
        </div>

        <div className="bg-red-500 text-white p-6">
          <h2 className="text-xl font-bold mb-4">Activités en retard</h2>
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <span>2023-04-28</span>
              <span>formation</span>
            </div>
            <div className="flex justify-between items-center">
              <span>2023-04-28</span>
              <span>mise en place d'un fonds d'appui</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
