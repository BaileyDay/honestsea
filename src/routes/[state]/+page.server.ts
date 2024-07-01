import type { PageServerLoad } from './$types';
import db from '$lib/server/database/drizzle';
import { geodata } from '$lib/server/database/drizzle-schemas';
import { eq, sql } from 'drizzle-orm';

const abr = {
	alabama: 'AL',
	alaska: 'AK',
	arizona: 'AZ',
	arkansas: 'AR',
	california: 'CA',
	colorado: 'CO',
	connecticut: 'CT',
	delaware: 'DE',
	florida: 'FL',
	georgia: 'GA',
	hawaii: 'HI',
	idaho: 'ID',
	illinois: 'IL',
	indiana: 'IN',
	iowa: 'IA',
	kansas: 'KS',
	kentucky: 'KY',
	louisiana: 'LA',
	maine: 'ME',
	maryland: 'MD',
	massachusetts: 'MA',
	michigan: 'MI',
	minnesota: 'MN',
	mississippi: 'MS',
	missouri: 'MO',
	montana: 'MT',
	nebraska: 'NE',
	nevada: 'NV',
	'new hampshire': 'NH',
	'new jersey': 'NJ',
	'new mexico': 'NM',
	'new york': 'NY',
	'north carolina': 'NC',
	'north dakota': 'ND',
	ohio: 'OH',
	oklahoma: 'OK',
	oregon: 'OR',
	pennsylvania: 'PA',
	'rhode island': 'RI',
	'south carolina': 'SC',
	'south dakota': 'SD',
	tennessee: 'TN',
	texas: 'TX',
	utah: 'UT',
	vermont: 'VT',
	virginia: 'VA',
	washington: 'WA',
	'west virginia': 'WV',
	wisconsin: 'WI',
	wyoming: 'WY'
};

export const load: PageServerLoad = async ({ params, fetch }) => {
	const stateName = params.state.toString();
	const stateAbr = abr[stateName];
	const stateJson = await db
		.select()
		.from(geodata)
		.where(sql`state = ${stateAbr} and ${geodata.level} = 'state'`);
	console.log(stateJson);
	try {
		return {
			stateData: { name: stateName, stateJson: stateJson }
		};
	} catch (error) {
		console.error('Error fetching state data:', error);
		return {
			status: 500,
			error: 'Failed to load state data'
		};
	}
};

function processStateData(data: any) {
	// Transform the API response into the format your frontend expects
	// This is a placeholder function - implement the actual logic based on the API response structure
	return {
		name: data.normalizedInput.state,
		officials: data.officials,
		offices: data.offices
		// Add more processed data as needed
	};
}
