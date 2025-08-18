interface Project {
	ID: string | number;
	name: string;
	description: string;
	createdAt: string;
}

interface OdkProject {
	id: number;
	name: string;
	description: string | null;
	archived: boolean | null;
	keyId: number | null;
	createdAt: string;
	updatedAt: string | null;
	deletedAt: string | null;
	verbs: string[];
}

interface OdkProjectsResponse {
	status_code: number;
	odkProjects: {
		count: number;
		results: OdkProject[];
		cached: boolean;
		userRole: string;
	};
}
