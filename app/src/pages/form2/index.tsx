import { useForm } from "react-hook-form";
import { LABOR_LEVELS, PAINT_COST_PERCENTAGE, STAIN_COST_PERCENTAGE, SUPPLIES_COST_PERCENTAGE } from "../../functions/consts";
import type { LaborAndSurfaceCost, RawCost } from "../../functions/types";
import { useState } from "react";
import { computeLaborAndSurfaceCost } from "../../functions/functions";

type FormValues = {
    laborLevel: keyof typeof LABOR_LEVELS,
    supplies:number,
    stains:number,
    paint:number,
}

export const Form2 = ({cost, onSubmitCallback}: {cost?: RawCost, onSubmitCallback: (cost: LaborAndSurfaceCost) => void}) => {

    const [laborAndSurfaceCost, setLaborAndSurfaceCost] = useState<LaborAndSurfaceCost>();
    const {register, handleSubmit} = useForm<FormValues>();

    const onSubmit = (data: FormValues) => {

        if (!cost) {
            console.error("Cost is not provided");
            alert("Cost is not provided");
            return;
        }

        const laborCost = data.laborLevel;
        const suppliesCost = data.supplies;
        const stainsCost = data.stains;
        const paintCost = data.paint;

        const computedCost: LaborAndSurfaceCost = computeLaborAndSurfaceCost(cost, laborCost, stainsCost, suppliesCost, paintCost);
        console.log("Labor and Surface Cost:", computedCost);
        setLaborAndSurfaceCost(computedCost);
        onSubmitCallback(computedCost);
    };


    const renderLaborOptions = () => {
        return Object.entries(LABOR_LEVELS).map(([key, value]) => (
            <option key={key} value={key}>
                {key.charAt(0).toUpperCase() + key.slice(1)} : {value}
            </option>
        ));
    };

    return (
        <div
            className='flex flex-col items-center justify-center w-full h-full bg-gray-400 min-h-screen min-w-screen'>
            <div
                className='flex flex-col items-center w-full max-w-[500px] bg-white rounded-lg shadow-lg p-4 gap-4'>
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

                            <input
                                type='submit'
                                value='Calculate'
                                className='bg-blue-500 text-white rounded-lg px-4 py-2 cursor-pointer hover:bg-blue-600 transition-colors duration-200'/>
                        </tbody>
                    </table>
                </form>
            </div>
            {laborAndSurfaceCost && (
                <div className='mt-4 p-4 bg-white rounded-lg shadow-lg w-full max-w-[500px]'>
                    <h2 className='text-xl font-bold mb-2'>Box Details</h2>
                    <pre className='bg-gray-100 p-2 rounded-lg'>{JSON.stringify(laborAndSurfaceCost, null, 2)}</pre>
                </div>
            )}
        </div>
    );
}