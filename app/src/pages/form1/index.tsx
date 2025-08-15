import { useState } from "react";
import { useForm, type SubmitHandler } from "react-hook-form";
import { computeRawSQIandCost } from "../../functions/functions";
import type { Box, RawCost } from "../../functions/types";
import { THICKNESS } from "../../functions/consts";

  
    type FormValues = {
        panel1L: number;
        panel1W: number;
        panel1T: number;
        panel2L: number;
        panel2W: number;
        panel2T: number;
        bottomL: number;
        bottomW: number;
        bottomT: number;
        CoverL: number;
        CoverW: number;
        CoverT: number;
    };

export const Form1 = ({onSubmitCallback}: {onSubmitCallback: (cost: RawCost) => void}) => {

    const {register, handleSubmit, getValues, watch} = useForm<FormValues>();
    const [boxValues, setBoxValues] = useState<{box: Box, rawCost: RawCost}>();


    const [coverT, setCoverT] = useState<number>(0);

    watch((value) => {        // Update CoverT based on bottomT
        if (value.bottomT) {
            setCoverT(value.bottomT * 2);
        }
    });

    const onSubmit : SubmitHandler<FormValues> = data => {
        console.log(data);
        const box : Box = {
            panel1: {
                length: data.panel1L,
                width: data.panel1W,
                thickness: data.panel1T
            },
            panel2: {
                length: data.panel2L,
                width: data.panel2W,
                thickness: data.panel2T
            },
            bottom: {
                length: data.bottomL,
                width: data.bottomW,
                thickness: data.bottomT
            },
            cover: {
                length: data.CoverL,
                width: data.CoverW,
                thickness: coverT
            }
        };

        const rawSQI = computeRawSQIandCost(box);
        console.log('Raw SQI and Cost:', rawSQI);
        setBoxValues({box, rawCost: rawSQI});
        onSubmitCallback(rawSQI);
    };

    const renderThicknessOptions = () => {
        return Object.entries(THICKNESS).map(([key, value]) => (
            <option key={key} value={value}>
                {value}
            </option>
        ));
    }

    return (
        <div
            className='flex flex-col items-center justify-center w-full h-full bg-gray-400 min-h-screen min-w-screen'>
            <div
                className='flex flex-col items-center w-full max-w-[500px] bg-white rounded-lg shadow-lg p-4 gap-4'>
                <form
                    className='flex flex-col items-center gap-4'
                    onSubmit={handleSubmit(onSubmit)}>
                    <table className="w-full text-left">
                        <thead>
                            <tr>
                                <th className="px-2 py-1"></th>
                                <th className="px-2 py-1">Length</th>
                                <th className="px-2 py-1">Width</th>
                                <th className="px-2 py-1">Thickness</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td className="px-2 py-1">
                                    <label htmlFor="panel1L">Panel 1</label>
                                </td>
                                <td className="px-2 py-1">
                                    <input
                                        id="panel1L"
                                        className="bg-gray-100 rounded-lg w-full px-2"
                                        type="text"
                                        {...register("panel1L")}/>
                                </td>
                                <td className="px-2 py-1">
                                    <input
                                        id="panel1W"
                                        className="bg-gray-100 rounded-lg w-full px-2"
                                        type="text"
                                        {...register("panel1W")}/>
                                </td>
                                <td className="px-2 py-1">
                                    <select
                                        id="panel1T"
                                        className="bg-gray-100 rounded-lg w-full px-2"
                                        {...register("panel1T")}>
                                        {renderThicknessOptions()}
                                    </select>
                                </td>
                            </tr>
                            <tr>
                                <td className="px-2 py-1">
                                    <label htmlFor="panel2L">Panel 2</label>
                                </td>
                                <td className="px-2 py-1">
                                    <input
                                        id="panel2L"
                                        className="bg-gray-100 rounded-lg w-full px-2"
                                        type="text"
                                        {...register("panel2L")}/>
                                </td>
                                <td className="px-2 py-1">
                                    <input
                                        id="panel2W"
                                        className="bg-gray-100 rounded-lg w-full px-2"
                                        type="text"
                                        {...register("panel2W")}/>
                                </td>
                                <td className="px-2 py-1">
                                    <select
                                        id="panel2T"
                                        className="bg-gray-100 rounded-lg w-full px-2"
                                        {...register("panel2T")}>
                                        {renderThicknessOptions()}
                                    </select>
                                </td>
                            </tr>
                            <tr>
                                <td className="px-2 py-1">
                                    <label htmlFor="bottomL">Bottom</label>
                                </td>
                                <td className="px-2 py-1">
                                    <input
                                        id="bottomL"
                                        className="bg-gray-100 rounded-lg w-full px-2"
                                        type="text"
                                        {...register("bottomL")}/>
                                </td>
                                <td className="px-2 py-1">
                                    <input
                                        id="bottomW"
                                        className="bg-gray-100 rounded-lg w-full px-2"
                                        type="text"
                                        {...register("bottomW")}/>
                                </td>
                                <td className="px-2 py-1">
                                    <select
                                        id="bottomT"
                                        className="bg-gray-100 rounded-lg w-full px-2"
                                        {...register("bottomT")}>
                                        {renderThicknessOptions()}
                                    </select>
                                </td>
                            </tr>
                            <tr>
                                <td className="px-2 py-1">
                                    <label htmlFor="CoverL">Cover</label>
                                </td>
                    
                                        <>
                                        <td className="px-2 py-1">
                                    <input
                                        id="CoverL"
                                        className="bg-gray-100 rounded-lg w-full px-2"
                                        type="text"
                                        {...register("CoverL")}/>
                                </td>
                                <td className="px-2 py-1">
                                    <input
                                        id="CoverW"
                                        className="bg-gray-100 rounded-lg w-full px-2"
                                        type="text"
                                        {...register("CoverW")}/>
                                </td>
                                <td className="px-2 py-1">
                                    <input
                                        id="CoverT"
                                        className="bg-gray-100 rounded-lg w-full px-2"
                                        type="text"
                                        {...register("CoverT")}
                                        value={
                                           coverT ? coverT : getValues("bottomT") * 2
                                        }
                                        disabled
                                        />
                                </td>
                                        </>
                                    
                            </tr>
                            <input
                                type='submit'
                                value='Calculate'
                                className='bg-blue-500 text-white rounded-lg px-4 py-2 cursor-pointer hover:bg-blue-600 transition-colors duration-200'/>
                        </tbody>
                    </table>
                </form>
            </div>
            {boxValues && (
                <div className='mt-4 p-4 bg-white rounded-lg shadow-lg w-full max-w-[500px]'>
                    <h2 className='text-xl font-bold mb-2'>Box Details</h2>
                    <pre className='bg-gray-100 p-2 rounded-lg'>{JSON.stringify(boxValues, null, 2)}</pre>
                </div>
            )}
        </div>
    )

}