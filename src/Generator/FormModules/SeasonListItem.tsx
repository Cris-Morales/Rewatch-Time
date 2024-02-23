import React from 'react';

const SeasonListItem = ({
    includedSeriesList,
    excludedSeasons,
    setExcludedSeasons,
    series_id,
    dbSeasonsList,
    dbSeriesList
}) => {

    const handleChecked = (checked: boolean, season_id: string) => {
        if (!checked) {
            setExcludedSeasons([...excludedSeasons, season_id]);
        } else {
            setExcludedSeasons(excludedSeasons.filter(s => s != season_id));
        }
    };

    let seriesName: string = '';
    for (let i = 0; i < dbSeriesList.length; i++) {
        if (dbSeriesList[i].series_id == series_id) {
            seriesName = dbSeriesList[i].series_name;
        }
    }

    console.log()
    return (
        <div>
            <div className='collapse-title shadow'>{seriesName}</div>
            <ul className='rounded-box'>
                {dbSeasonsList.map((season: any, index: number) => {
                    if (season.series_id == series_id) {
                        return (
                            <li
                                key={`${dbSeriesList.series_name} + ${season.season_id} + ${index}`}
                                className='w-full btn'>
                                <label className='label curser-pointer'>
                                    <span className=''>
                                        Season {season.season_number}
                                    </span>
                                    <input
                                        type='checkbox'
                                        className='ml-2 checkbox'
                                        value={season.season_id}
                                        defaultChecked
                                        onChange={e => {
                                            handleChecked(e.target.checked, e.target.value);
                                        }}></input>
                                </label>
                            </li>
                        );
                    }
                })}
            </ul>
        </div>
    );
};

export default SeasonListItem;