"use client";

import React from "react";

import { useTranslations } from "next-intl";

interface TransProps {
	i18nKey: string;
	defaults?: string;
	values?: Record<string, string | number>;
	components?: Record<string, React.ReactElement>;
}

interface ParsedContent {
	type: "text" | "component";
	content: string;
	componentKey?: string;
}

function parseTranslationWithComponents(
	translation: string,
	components: Record<string, React.ReactElement>,
): ParsedContent[] {
	const parts: ParsedContent[] = [];
	let lastIndex = 0;

	const componentKeys = Object.keys(components);
	if (componentKeys.length === 0) {
		return [{ type: "text", content: translation }];
	}

	const combinedRegex = new RegExp(
		`<(${componentKeys.join("|")})>(.*?)</\\1>`,
		"g",
	);

	let match;
	while ((match = combinedRegex.exec(translation)) !== null) {
		// Add text before the component
		if (match.index > lastIndex) {
			const textContent = translation.slice(lastIndex, match.index);
			if (textContent) {
				parts.push({ type: "text", content: textContent });
			}
		}

		// Add the component
		parts.push({
			type: "component",
			content: match[2],
			componentKey: match[1],
		});

		lastIndex = match.index + match[0].length;
	}

	// Add remaining text
	if (lastIndex < translation.length) {
		const remainingText = translation.slice(lastIndex);
		if (remainingText) {
			parts.push({ type: "text", content: remainingText });
		}
	}

	return parts;
}

export function Trans({
	i18nKey,
	defaults,
	values = {},
	components = {},
}: TransProps) {
	const t = useTranslations();
	// @ts-ignore
	const translation = t(i18nKey, { ...values, defaultValue: defaults });

	const parsedContent = parseTranslationWithComponents(translation, components);

	return (
		<span>
			{parsedContent.map((part, index) => {
				if (part.type === "text") {
					return part.content;
				}

				if (part.type === "component" && part.componentKey) {
					const component = components[part.componentKey];
					return React.cloneElement(component, { key: index }, part.content);
				}

				return null;
			})}
		</span>
	);
}
