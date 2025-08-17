import { createFileRoute } from "@tanstack/react-router";
import { Results } from "../pages/results";

type SearchParams = {
    totalCost?: string;
}

export const Route = createFileRoute("/results")({
    validateSearch: (search: Record<string, unknown>): SearchParams => {
        return {
            totalCost: (search.totalCost as string) || undefined,
        }
    },
    component: () => <Results />
})