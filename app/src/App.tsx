
import { useState } from 'react';
import { Form3 } from './pages/form3';
import { Form1 } from './pages/form1';
import { Form2 } from './pages/form2';
import type { LaborAndSurfaceCost, RawCost } from './functions/types';
import { Results } from './pages/results';


function App() {
    //paginated forms
    const [currentPage, setCurrentPage] = useState(0);
    const [rawCost, setRawCost] = useState<RawCost>()
    const [laborAndSurfaceCost, setLaborAndSurfaceCost] = useState<LaborAndSurfaceCost>();
    const [computedCostWithAddOns, setComputedCostWithAddOns] = useState<number>();

    const handleOnSubmit1 = (data: RawCost) => {
        setRawCost(data);
        setCurrentPage(1);
    };

    const handleOnSubmit2 = (data: LaborAndSurfaceCost) => {
        setLaborAndSurfaceCost(data);
        setCurrentPage(2);
    };

    const handleOnSubmit3 = (data: number) => {
        setComputedCostWithAddOns(data);
        setCurrentPage(3);
    };


    return (
        
            <>
                <h1 className='text-2xl font-bold mb-4'>MAC Box Calculator</h1>
                {currentPage === 0 && <Form1 onSubmitCallback={handleOnSubmit1} />}
                {currentPage === 1 && <Form2 cost={rawCost} onSubmitCallback={handleOnSubmit2} />}
                {currentPage === 2 && <Form3 laborAndSurfaceCost={laborAndSurfaceCost?.totalLaborAndSurfaceCost} onSubmitCallback={handleOnSubmit3} />}
                {currentPage === 3 && <Results totalCost={computedCostWithAddOns} />}
            </>

    )
}

export default App;
