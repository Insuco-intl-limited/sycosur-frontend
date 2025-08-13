// import { DataTable } from "./components/datatable"
// import { Badge } from "@/components/ui/badge"
// import { Edit, Trash2, Eye, UserCheck, UserX } from "lucide-react"
// import type { Column, ActionItem } from "./types/datatable"
//
// // Données d'exemple
// const sampleData = [
//   { id: 1, name: "Alice Martin", email: "alice@example.com", role: "Admin", status: "active", createdAt: "2024-01-15" },
//   { id: 2, name: "Bob Dupont", email: "bob@example.com", role: "User", status: "inactive", createdAt: "2024-01-20" },
//   {
//     id: 3,
//     name: "Claire Bernard",
//     email: "claire@example.com",
//     role: "Editor",
//     status: "active",
//     createdAt: "2024-02-01",
//   },
//   { id: 4, name: "David Moreau", email: "david@example.com", role: "User", status: "active", createdAt: "2024-02-10" },
//   { id: 5, name: "Emma Leroy", email: "emma@example.com", role: "Admin", status: "inactive", createdAt: "2024-02-15" },
//   {
//     id: 6,
//     name: "François Petit",
//     email: "francois@example.com",
//     role: "Editor",
//     status: "active",
//     createdAt: "2024-03-01",
//   },
//   {
//     id: 7,
//     name: "Gabrielle Roux",
//     email: "gabrielle@example.com",
//     role: "User",
//     status: "active",
//     createdAt: "2024-03-05",
//   },
//   { id: 8, name: "Henri Blanc", email: "henri@example.com", role: "User", status: "inactive", createdAt: "2024-03-10" },
//   {
//     id: 9,
//     name: "Isabelle Noir",
//     email: "isabelle@example.com",
//     role: "Editor",
//     status: "active",
//     createdAt: "2024-03-15",
//   },
//   {
//     id: 10,
//     name: "Julien Vert",
//     email: "julien@example.com",
//     role: "Admin",
//     status: "active",
//     createdAt: "2024-03-20",
//   },
// ]
//
// type User = (typeof sampleData)[0]
//
// export default function DataTableExample() {
//   const columns: Column<User>[] = [
//     {
//       key: "id",
//       header: "ID",
//       width: "80px",
//       sortable: true,
//     },
//     {
//       key: "name",
//       header: "Nom",
//       sortable: true,
//       filterable: true,
//     },
//     {
//       key: "email",
//       header: "Email",
//       sortable: true,
//       filterable: true,
//     },
//     {
//       key: "role",
//       header: "Rôle",
//       sortable: true,
//       filterable: true,
//       render: (value) => (
//         <Badge variant={value === "Admin" ? "default" : value === "Editor" ? "secondary" : "outline"}>{value}</Badge>
//       ),
//     },
//     {
//       key: "status",
//       header: "Statut",
//       sortable: true,
//       filterable: true,
//       render: (value) => (
//         <Badge variant={value === "active" ? "default" : "destructive"}>
//           {value === "active" ? "Actif" : "Inactif"}
//         </Badge>
//       ),
//     },
//     {
//       key: "createdAt",
//       header: "Date de création",
//       sortable: true,
//       accessor: (user) => new Date(user.createdAt).toLocaleDateString("fr-FR"),
//     },
//   ]
//
//   const actions: ActionItem<User>[] = [
//     {
//       label: "Voir les détails",
//       icon: <Eye className="h-4 w-4" />,
//       onClick: (user) => {
//         alert(`Voir les détails de ${user.name}`)
//       },
//     },
//     {
//       label: "Modifier",
//       icon: <Edit className="h-4 w-4" />,
//       onClick: (user) => {
//         alert(`Modifier ${user.name}`)
//       },
//     },
//     {
//       label: (user) => (user.status === "active" ? "Désactiver" : "Activer"),
//       icon: (user) => (user.status === "active" ? <UserX className="h-4 w-4" /> : <UserCheck className="h-4 w-4" />),
//       onClick: (user) => {
//         const action = user.status === "active" ? "désactivé" : "activé"
//         alert(`${user.name} a été ${action}`)
//       },
//     },
//     {
//       label: "Supprimer",
//       icon: <Trash2 className="h-4 w-4" />,
//       variant: "destructive" as const,
//       onClick: (user) => {
//         if (confirm(`Êtes-vous sûr de vouloir supprimer ${user.name} ?`)) {
//           alert(`${user.name} a été supprimé`)
//         }
//       },
//       disabled: (user) => user.role === "Admin", // Les admins ne peuvent pas être supprimés
//     },
//   ]
//
//   return (
//     <div className="container mx-auto py-10">
//       <div className="mb-8">
//         <h1 className="text-3xl font-bold">DataTable Réutilisable</h1>
//         <p className="text-muted-foreground">
//           Un composant DataTable complet avec recherche, filtrage, tri, pagination et exportation.
//         </p>
//       </div>
//
//       <DataTable
//         data={sampleData}
//         columns={columns}
//         actions={actions}
//         searchable={true}
//         searchPlaceholder="Rechercher des utilisateurs..."
//         paginated={true}
//         pageSize={5}
//         exportable={true}
//         filterable={true}
//         sortable={true}
//       />
//     </div>
//   )
// }
