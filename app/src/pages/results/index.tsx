import { useMemo } from "react"
import { computeCostWithMargins } from "../../functions/functions";
import { useSearch, useNavigate, useRouter } from "@tanstack/react-router";

export const Results = () => {
    const search = useSearch({ from: '/results' });
    const navigate = useNavigate();
    const router = useRouter();
    const totalCost = search.totalCost ? parseFloat(search.totalCost) : undefined;
    
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
            
            {/* Navigation buttons */}
            <div className="flex gap-2 mt-4">
                <button
                    onClick={() => router.history.back()}
                    className='bg-gray-500 text-white rounded-lg px-4 py-2 cursor-pointer hover:bg-gray-600 transition-colors duration-200'>
                    Back
                </button>
                <button
                    onClick={() => navigate({ to: '/form1' })}
                    className='bg-green-500 text-white rounded-lg px-4 py-2 cursor-pointer hover:bg-green-600 transition-colors duration-200'>
                    Start Over
                </button>
            </div>
        </div>
    )
}