import {ADD_ON_MATERIAL_COST, ADD_ON_MATERIAL_DETAILS, type ADD_ON_MATERIAL_TYPE} from "../../functions/addOnMaterialCost";
import {useForm} from "react-hook-form";
import {computeCostWithAddOns} from "../../functions/functions";
import {useNavigate, useSearch, useRouter} from "@tanstack/react-router";
import type {LaborAndSurfaceCost}
from "../../functions/types";

type FormValues = Record < ADD_ON_MATERIAL_TYPE,
number >;

export const Form3 = () => {
    const {register, handleSubmit} = useForm < FormValues > ();
    const navigate = useNavigate();
    const router = useRouter();
    const search = useSearch({from: '/form3/'});

    // Parse the laborAndSurfaceCost from search params
    const laborAndSurfaceCostData : LaborAndSurfaceCost | null = search.laborAndSurfaceCost
        ? JSON.parse(search.laborAndSurfaceCost)
        : null;
    const laborAndSurfaceCost = laborAndSurfaceCostData
        ?.totalLaborAndSurfaceCost || 217.7;

    const onSubmitCallback = (cost : number) => {
        navigate({
            to: '/results',
            search: {
                totalCost: cost.toString()
            }
        });
    };

    const onSubmit = (data : FormValues) => {
        const computedCost = computeCostWithAddOns(laborAndSurfaceCost, data);
        console.log("Computed Cost with Add-Ons:", computedCost);
        onSubmitCallback(computedCost);
    };

    return (
        <div
            className='flex flex-col items-center justify-center w-full h-full bg-gray-400 min-h-screen min-w-screen'>
            <div
                className='flex flex-col items-center w-full max-w-[500px] bg-white rounded-lg shadow-lg p-4 gap-4'>

                {/* Display labor and surface cost info */}
                {laborAndSurfaceCostData && (
                    <div className="w-full bg-green-50 p-3 rounded-lg mb-4">
                        <h3 className="font-semibold mb-2">Labor & Surface Cost Summary:</h3>
                        <p>Labor Cost: ${laborAndSurfaceCostData
                                .totalLaborCost
                                .toFixed(2)}</p>
                        <p>Stain Cost: ${laborAndSurfaceCostData
                                .totalStainCost
                                .toFixed(2)}</p>
                        <p>Paint Cost: ${laborAndSurfaceCostData
                                .totalPaintCost
                                .toFixed(2)}</p>
                        <p>Supplies Cost: ${laborAndSurfaceCostData
                                .totalSuppliesCost
                                .toFixed(2)}</p>
                        <p className="font-semibold">Total: ${laborAndSurfaceCostData
                                .totalLaborAndSurfaceCost
                                .toFixed(2)}</p>
                    </div>
                )}

                <form
                    className='flex flex-col items-center gap-4'
                    onSubmit={handleSubmit(onSubmit)}>
                    <table className="w-full text-left">
                        <tbody>
                            {Object
                                .entries(ADD_ON_MATERIAL_COST)
                                .map(([key]) => (
                                    <tr key={key}>
                                        <td className="px-2 py-1">
                                            <label htmlFor={key}>{key}</label>
                                            <p className="text-xs text-gray-500">{ADD_ON_MATERIAL_DETAILS[key as ADD_ON_MATERIAL_TYPE]}</p>
                                        </td>
                                        <td className="px-2 py-1">
                                            <input
                                                id={key}
                                                className="bg-gray-100 rounded-lg w-full px-2"
                                                type="number"
                                                defaultValue={0}
                                                {...register(key as ADD_ON_MATERIAL_TYPE)}/>
                                        </td>
                                    </tr>
                                ))
}

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
                                    <button
                                        type="button"
                                        onClick={() => navigate({to: '/form1'})}
                                        className='bg-green-500 text-white rounded-lg px-4 py-2 cursor-pointer hover:bg-green-600 transition-colors duration-200'>
                                        Start Over
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