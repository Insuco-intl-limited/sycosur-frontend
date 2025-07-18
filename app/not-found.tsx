import { useTranslations } from "next-intl";

export default function GlobalNotFound() {
	const t = useTranslations("notFound");
	return (
		<div className="min-h-screen flex items-center justify-center bg-gray-50">
			<div className="text-center">
				<h1 className="text-6xl font-bold text-gray-900">404</h1>
				<p className="text-xl text-gray-600 mt-4">{t("title")}</p>
				<p className="text-gray-500 mt-2">{t("description")}</p>
			</div>
		</div>
	);
}
