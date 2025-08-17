import { createFileRoute } from "@tanstack/react-router";
import { Form2 } from "../pages/form2";

type SearchParams = {
    rawCost?: string;
}

export const Route = createFileRoute("/form2/")({
    validateSearch: (search: Record<string, unknown>): SearchParams => {
        return {
            rawCost: (search.rawCost as string) || undefined,
        }
    },
    component: () => <Form2 />
})