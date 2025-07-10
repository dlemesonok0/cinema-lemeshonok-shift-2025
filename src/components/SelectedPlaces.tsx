import {Place} from "@/types";

interface SelectedPlacesListProps {
    selectedPlaces: Place[];
}

const SelectedPlaces = ({ selectedPlaces }: SelectedPlacesListProps) => {
    const groupedByRow = selectedPlaces.reduce((acc, place) => {
        if (!place.row || !place.column) {
            return acc;
        }
        if (!acc[place.row]) {
            acc[place.row] = [];
        }
        acc[place.row].push(place.column + 1);
        return acc;
    }, {} as Record<number, number[]>);

    const sortedRows = Object.keys(groupedByRow)
        .map(Number)
        .sort((a, b) => a - b);

    return (
        <div>
            <h3 className='text-xs text-textSecondary dark:text-border'>Места</h3>
                <ul className="space-y-1 text-base">
                    {sortedRows.map((row) => (
                        <li key={row}>
                            {row + 1} ряд - {groupedByRow[row].sort((a, b) => a - b).join(', ')}
                        </li>
                    ))}
                </ul>
        </div>
    );
};

export default SelectedPlaces;