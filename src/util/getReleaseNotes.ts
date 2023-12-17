// Utiliza este archivo para implementar la lógica de obtención de datos de la carpeta "release-notes"
import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

const releaseNotesDirectory = path.join(
	process.cwd(),
	'src/content/docs/en/pages/main-menu/release-notes'
);

export function getReleaseNotes() {
	const fileNames = fs.readdirSync(releaseNotesDirectory);

	const releaseNotes = fileNames
		.map((fileName) => {
			const fullPath = path.join(releaseNotesDirectory, fileName);
			const fileContents = fs.readFileSync(fullPath, 'utf8');
			const { data, content } = matter(fileContents);

			return {
				id: fileName.replace(/\.md$/, ''),
				title: data.title,
				description: data.description,
				permalink: data.permalink,
				content,
			};
		})
		.sort((a, b) => new Date(b.date) - new Date(a.date));

	return releaseNotes;
}
