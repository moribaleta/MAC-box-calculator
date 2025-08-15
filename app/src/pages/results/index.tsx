import { useMemo } from "react"
import { computeCostWithMargins } from "../../functions/functions";

export const Results = ({totalCost} : {totalCost?: number}) => {
    
    const totalCostFormatted = useMemo(() => {
        return computeCostWithMargins(totalCost || 0);
    }, [totalCost]);
    
    return (
        <div className="p-4">
            <h2 className="text-xl font-bold mb-4">Results</h2>
            {totalCost !== undefined ? (
                <div className="bg-white p-4 rounded shadow">
                    <div className="text-lg">
                        <p>Total Cost by Margin:</p>
                        <ul>
                            {Object.entries(totalCostFormatted).map(([margin, cost]) => (
                                <li key={margin}>
                                    Margin {margin}%: ₱{cost.toFixed(2)}
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            ) : (
                <p className="text-red-500">No cost calculated yet.</p>
            )}
        </div>
    )
}