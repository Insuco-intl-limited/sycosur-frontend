import initiateSocialAuth from "@/utils/initiateSocialAuth";
export { default as extractErrorMessage } from "@/utils/extractErrorMessage";
export { default as PersistAuth } from "@/utils/PersistAuth";

export const GoogleLogin = () => initiateSocialAuth("google-oauth2", "google");

export { capitalizeWord } from "@/utils/capitalizeWord";
export { formatDate } from "@/utils/formatDate";
export { getCurrentLocale } from "@/utils/locale";
export { translateWithMyMemory } from "@/utils/translate";
