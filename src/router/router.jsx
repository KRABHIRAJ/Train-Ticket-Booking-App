import { createBrowserRouter, createRoutesFromElements, Route } from "react-router-dom";
import Layout from "../Layout";
import { Home, TrainDetails } from "../components";

const router = createBrowserRouter(
    createRoutesFromElements(
        <Route path="/" element={<Layout />}>
            <Route path="" element={<Home />} />
            <Route path="/:data" element={<TrainDetails />} />
        </Route>
    )
)

export default router;