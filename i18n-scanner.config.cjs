// Constants for better maintainability
const SUPPORTED_EXTENSIONS = [".js", ".jsx", ".ts", ".tsx"];
const SUPPORTED_LANGUAGES = ["en", "fr", "es"];
const DEFAULT_LANGUAGE = "en";
const UNTRANSLATED_PLACEHOLDER = "__STRING_NOT_TRANSLATED__";

// Path configurations
const SCAN_PATHS = {
	excluded: [
		"!**/node_modules/**",
		"!**/i18n/**",
		"!**/messages/**",
		"!**/components/ui/**",
	],
	included: [
		"utils/**/*.{js,jsx,ts,tsx}",
		"lib/**/*.{js,jsx,ts,tsx}",
		"scripts/*.{js,jsx,ts,tsx}",
		"app/**/*.{js,jsx,ts,tsx}",
		"components/**/*.{js,jsx,ts,tsx}",
		"hooks/**/*.{js,jsx,ts,tsx}",
	],
};

module.exports = {
	input: [...SCAN_PATHS.excluded, ...SCAN_PATHS.included],
	output: "./messages/",
	options: {
		debug: true,
		func: {
			list: ["t"],
			extensions: SUPPORTED_EXTENSIONS,
		},
		trans: {
			component: "Trans",
			extensions: SUPPORTED_EXTENSIONS,
		},
		lngs: SUPPORTED_LANGUAGES,
		defaultLng: DEFAULT_LANGUAGE,
		resource: {
			loadPath: "./messages/{{lng}}.json",
			savePath: "{{lng}}.json",
			jsonIndent: 2,
			lineEnding: "\n",
		},
		nsSeparator: ":",
		keySeparator: ".",
		pluralSeparator: "_",
		contextSeparator: "_",
		contextDefaultValues: [],
		interpolation: {
			prefix: "{{",
			suffix: "}}",
		},
		removeUnusedKeys: false,
		sort: true,
		skipDefaultValues: true,
		defaultValue: function (lng, ns, key) {
			if (lng === DEFAULT_LANGUAGE) {
				return key;
			}
			return UNTRANSLATED_PLACEHOLDER;
		},
		resetDefaultValueLocale: null,
		useKeysAsDefaultValue: false,
	},
};
