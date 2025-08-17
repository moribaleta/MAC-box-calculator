
import { createRootRoute, Outlet } from "@tanstack/react-router";

const Root = () => {
    return (
        <div className="app">
            <h1>MAC computation</h1>
            <main>
                <Outlet />
            </main>
        </div>
    )
}

export const Route = createRootRoute({
    component: Root
});

export default Route;
