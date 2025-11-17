import {useGetFormSubmissionsQuery} from "@/lib/redux/features/surveys/surveyApiSlice";
import {GenFormParams} from "@/types/odk";


export default function useHasSubmissions({formId, projectId}: GenFormParams) {
    const {data} = useGetFormSubmissionsQuery({formId, projectId});

    const hasSubmissions = data?.submissions?.results?.length ? data.submissions.results.length > 0 : false;

    return {
        has: hasSubmissions,
        data: data?.submissions?.results || []
    };
}