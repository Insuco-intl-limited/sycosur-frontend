import { Trans } from "@/components/shared/Trans";
import { useTranslations } from "next-intl";

export default function NotFound() {
	const t = useTranslations();
	return (
		<div className="min-h-screen flex items-center justify-center bg-gray-50">
			<div className="text-center">
				<h1 className="text-6xl font-bold text-gray-900">404</h1>
				<p className="text-xl text-gray-600 mt-4">
					<Trans i18nKey="notFound.title" defaults="Page not found" />
				</p>
				<p className="text-gray-500 mt-2">
					<Trans
						i18nKey="notFound.description"
						defaults="The page you are looking for does not exist."
					/>
				</p>
			</div>
		</div>
	);
}
