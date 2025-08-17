import { createFileRoute } from "@tanstack/react-router";
import { Form3 } from "../pages/form3";

type SearchParams = {
    laborAndSurfaceCost?: string;
}

export const Route = createFileRoute("/form3/")({
    validateSearch: (search: Record<string, unknown>): SearchParams => {
        return {
            laborAndSurfaceCost: (search.laborAndSurfaceCost as string) || undefined,
        }
    },
    component: () => <Form3 />
})