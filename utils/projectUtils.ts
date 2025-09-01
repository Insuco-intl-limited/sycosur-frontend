/**
 * Utility functions for project-related operations
 */

// Define the Project interface
interface Project {
  ID: string | number;
  name: string;
  description: string;
  createdAt: string;
}

/**
 * Gets a project by its ID
 * @param id The project ID to look up
 * @returns The project object or null if not found
 */
export const getProjectById = (id: string | number) => {
  // For demo purposes, we're using the sample projects data
  const sampleProjects: Project[] = [
    {
      ID: 1,
      name: "Rural Development Project",
      description:
        "A project focused on developing rural areas through sustainable agriculture and infrastructure.",
      createdAt: "2024-01-15T09:00:00Z",
    },
    {
      ID: 2,
      name: "Water Access Program",
      description:
        "Program to improve access to clean water in underserved communities.",
      createdAt: "2024-02-10T10:30:00Z",
    },
    {
      ID: 3,
      name: "Community Health Initiative",
      description:
        "Initiative to improve healthcare services and education in local communities.",
      createdAt: "2024-03-01T08:15:00Z",
    },
    {
      ID: 4,
      name: "Digital Education Project",
      description:
        "Project to enhance digital literacy and provide technology resources to schools.",
      createdAt: "2024-02-15T14:45:00Z",
    },
    {
      ID: 5,
      name: "Food Security Program",
      description:
        "Program to address food insecurity through sustainable farming practices.",
      createdAt: "2024-04-01T11:20:00Z",
    },
    {
      ID: 6,
      name: "Microfinance Initiative",
      description:
        "Initiative to provide small loans to entrepreneurs in developing regions.",
      createdAt: "2024-05-15T13:10:00Z",
    },
    {
      ID: 7,
      name: "Reforestation Project",
      description:
        "Project to restore forest ecosystems in areas affected by deforestation.",
      createdAt: "2024-06-01T09:45:00Z",
    },
    {
      ID: 8,
      name: "Renewable Energy Program",
      description:
        "Program to implement renewable energy solutions in rural communities.",
      createdAt: "2024-07-01T10:00:00Z",
    },
  ];

  return (
    sampleProjects.find((project) => project.ID.toString() === id.toString()) ||
    null
  );
};