const teams = {};

const storageContains = (season, eventCode) => Object.hasOwn(teams, season) && Object.hasOwn(teams[season], eventCode);
const populateStorage = async(season, eventCode) => {
	const fTeams = await (await fetch(`${process.env.EVENTS_URL}/${season}/${eventCode}/teams`)).json();
	teams[season] = {};
	teams[season][eventCode] = {};
	fTeams.forEach(team => teams[season][eventCode][team.teamNumber] = {
		teamNumber: team.teamNumber,
		stats: team.stats
	});
}

export async function getTeamData(season, eventCode) {
	if (!storageContains(season, eventCode)) await populateStorage(season, eventCode);
	return teams[season][eventCode];
}

export async function getTeams(season, eventCode) {
	if (!storageContains(season, eventCode)) await populateStorage(season, eventCode);
	return Object.keys(teams[season][eventCode]);
}

export async function getEvents(season) {
	const query = JSON.stringify({
		query: `{
          eventsSearch(season: 2023) {
                name
                code
            }
        }`
	})
}