import {useForm} from "react-hook-form";
import {LABOR_LEVELS, PAINT_COST_PERCENTAGE, STAIN_COST_PERCENTAGE, SUPPLIES_COST_PERCENTAGE} from "../../functions/consts";
import type {LaborAndSurfaceCost, RawCost}
from "../../functions/types";
import {computeLaborAndSurfaceCost} from "../../functions/functions";
import {useNavigate, useSearch, useRouter} from "@tanstack/react-router";

type FormValues = {
    laborLevel: keyof typeof LABOR_LEVELS,
    supplies: number,
    stains: number,
    paint: number
}

export const Form2 = () => {
    const {register, handleSubmit} = useForm < FormValues > ();
    const navigate = useNavigate();
    const router = useRouter();
    const search = useSearch({from: '/form2/'});

    // Parse the rawCost from search params
    const rawCost : RawCost | null = search.rawCost
        ? JSON.parse(search.rawCost)
        : null;

    const onSubmitCallback = (laborAndSurfaceCost : LaborAndSurfaceCost) => {
        navigate({
            to: '/form3',
            search: {
                laborAndSurfaceCost: JSON.stringify(laborAndSurfaceCost)
            }
        });
    };

    const onSubmit = (data : FormValues) => {

        if (!rawCost) {
            console.error("Raw cost is not provided");
            alert("Raw cost is not provided");
            return;
        }

        const laborCost = data.laborLevel;
        const suppliesCost = data.supplies;
        const stainsCost = data.stains;
        const paintCost = data.paint;

        const computedCost : LaborAndSurfaceCost = computeLaborAndSurfaceCost(rawCost, laborCost, stainsCost, suppliesCost, paintCost);
        console.log("Labor and Surface Cost:", computedCost);
        onSubmitCallback(computedCost);
    };

    const renderLaborOptions = () => {
        return Object
            .entries(LABOR_LEVELS)
            .map(([key, value]) => (
                <option key={key} value={key}>
                    {key
                        .charAt(0)
                        .toUpperCase() + key.slice(1)}
                    : {value}
                </option>
            ));
    };

    return (
        <div
            className='flex flex-col items-center justify-center w-full h-full bg-gray-400 min-h-screen min-w-screen'>
            <div
                className='flex flex-col items-center w-full max-w-[500px] bg-white rounded-lg shadow-lg p-4 gap-4'>

                {/* Display raw cost info */}
                {rawCost && (
                    <div className="w-full bg-blue-50 p-3 rounded-lg mb-4">
                        <h3 className="font-semibold mb-2">Raw Cost Summary:</h3>
                        <p>Total SQI: {rawCost
                                .totalSQI
                                .toFixed(2)}</p>
                        <p>Total Cost: ${rawCost
                                .totalCost
                                .toFixed(2)}</p>
                    </div>
                )}

                <form
                    className='flex flex-col items-center gap-4'
                    onSubmit={handleSubmit(onSubmit)}>
                    <table className="w-full text-left">
                        <tbody>
                            <tr>
                                <td className="px-2 py-1">
                                    <label htmlFor="laborLevel">Labor Level</label>
                                </td>
                                <td className="px-2 py-1">
                                    <select
                                        id="laborLevel"
                                        className="bg-gray-100 rounded-lg w-full px-2"
                                        {...register("laborLevel")}>
                                        {renderLaborOptions()}
                                    </select>
                                </td>
                            </tr>
                            <tr>
                                <td className="px-2 py-1">
                                    <label htmlFor="supplies">Supplies {SUPPLIES_COST_PERCENTAGE * 100}%</label>
                                </td>
                                <td className="px-2 py-1">
                                    <input
                                        id="supplies"
                                        className="bg-gray-100 rounded-lg w-full px-2"
                                        type="number"
                                        defaultValue={1}
                                        {...register("supplies")}/>
                                </td>
                            </tr>
                            <tr>
                                <td className="px-2 py-1">
                                    <label htmlFor="stains">Stains {STAIN_COST_PERCENTAGE * 100}%</label>
                                </td>
                                <td className="px-2 py-1">
                                    <input
                                        id="stains"
                                        className="bg-gray-100 rounded-lg w-full px-2"
                                        type="number"
                                        defaultValue={1}
                                        {...register("stains")}/>
                                </td>
                            </tr>
                            <tr>
                                <td className="px-2 py-1">
                                    <label htmlFor="paint">Paint {PAINT_COST_PERCENTAGE * 100}%</label>
                                </td>
                                <td className="px-2 py-1">
                                    <input
                                        id="paint"
                                        className="bg-gray-100 rounded-lg w-full px-2"
                                        type="number"
                                        defaultValue={0}
                                        {...register("paint")}/>
                                </td>
                            </tr>

                            <tr>
                                <td className="px-2 py-1">
                                    <button
                                        type="button"
                                        onClick={() => router.history.back()}
                                        className='bg-gray-500 text-white rounded-lg px-4 py-2 cursor-pointer hover:bg-gray-600 transition-colors duration-200'>
                                        Back
                                    </button>
                                </td>
                                <td className="px-2 py-1">
                                    <input
                                        type='submit'
                                        value='Calculate'
                                        className='bg-blue-500 text-white rounded-lg px-4 py-2 cursor-pointer hover:bg-blue-600 transition-colors duration-200'/>
                                </td>
                            </tr>

                        </tbody>
                    </table>
                </form>

            </div>
        </div>
    );
}