export const exportToCSV = (data: any[], filename = "export.csv") => {
	if (data.length === 0) return;

	const headers = Object.keys(data[0]);
	const csvContent = [
		headers.join(","),
		...data.map((row) =>
			headers
				.map((header) => {
					const value = row[header];
					return typeof value === "string" && value.includes(",")
						? `"${value}"`
						: value;
				})
				.join(","),
		),
	].join("\n");

	const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
	const link = document.createElement("a");
	const url = URL.createObjectURL(blob);
	link.setAttribute("href", url);
	link.setAttribute("download", filename);
	link.style.visibility = "hidden";
	document.body.appendChild(link);
	link.click();
	document.body.removeChild(link);
};

export const exportToJSON = (data: any[], filename = "export.json") => {
	const jsonContent = JSON.stringify(data, null, 2);
	const blob = new Blob([jsonContent], { type: "application/json" });
	const link = document.createElement("a");
	const url = URL.createObjectURL(blob);
	link.setAttribute("href", url);
	link.setAttribute("download", filename);
	link.style.visibility = "hidden";
	document.body.appendChild(link);
	link.click();
	document.body.removeChild(link);
};

// export const exportToExcel = async (data: any[], filename = "export.xlsx") => {
// 	const ExcelJS = await import("exceljs");
// 	const workbook = new ExcelJS.Workbook();
// 	const worksheet = workbook.addWorksheet("Sheet1");
//
// 	// Add headers
// 	if (data.length > 0) {
// 		worksheet.columns = Object.keys(data[0]).map(key => ({ header: key, key }));
// 	}
// 	// Add data rows
// 	worksheet.addRows(data);
//
// 	const buffer = await workbook.xlsx.writeBuffer();
// 	const blob = new Blob([buffer], {
// 		type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
// 	});
// 	const link = document.createElement("a");
// 	const url = URL.createObjectURL(blob);
// 	link.setAttribute("href", url);
// 	link.setAttribute("download", filename);
// 	link.style.visibility = "hidden";
// 	document.body.appendChild(link);
// 	link.click();
// 	document.body.removeChild(link);
// };
