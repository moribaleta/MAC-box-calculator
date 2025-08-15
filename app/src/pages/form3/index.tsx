import { useState } from "react";
import { ADD_ON_MATERIAL_COST, ADD_ON_MATERIAL_DETAILS, type ADD_ON_MATERIAL_TYPE } from "../../functions/addOnMaterialCost";
import { useForm } from "react-hook-form";
import { computeCostWithAddOns } from "../../functions/functions";

type FormValues = Record<ADD_ON_MATERIAL_TYPE, number>;

export const Form3 = ({laborAndSurfaceCost = 217.7, onSubmitCallback}: {laborAndSurfaceCost?: number, onSubmitCallback: (cost: number) => void}) => {

    const [computedCostWithAddOns, setComputedCostWithAddOns] = useState<number>();
    const {register, handleSubmit} = useForm<FormValues>();

    const onSubmit = (data: FormValues) => {
        const computedCost = computeCostWithAddOns(laborAndSurfaceCost, data);
        setComputedCostWithAddOns(computedCost);
        console.log("Computed Cost with Add-Ons:", computedCost);
        onSubmitCallback(computedCost);
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
                            {
                                Object.entries(ADD_ON_MATERIAL_COST).map(([key]) => (
                                    <tr key={key}>
                                        <td className="px-2 py-1">
                                            <label htmlFor={key}
                                            >{key}</label>
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
                            
                            

                            <input
                                type='submit'
                                value='Calculate'
                                className='bg-blue-500 text-white rounded-lg px-4 py-2 cursor-pointer hover:bg-blue-600 transition-colors duration-200'/>
                        </tbody>
                    </table>
                </form>
            </div>
            {computedCostWithAddOns && (
                <div className='mt-4 p-4 bg-white rounded-lg shadow-lg w-full max-w-[500px]'>
                    <h2 className='text-xl font-bold mb-2'>Box Details</h2>
                    <pre className='bg-gray-100 p-2 rounded-lg'>{JSON.stringify(computedCostWithAddOns, null, 2)}</pre>
                </div>
            )}
        </div>
    );
}