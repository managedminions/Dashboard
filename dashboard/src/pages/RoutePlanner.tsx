import PageBreadcrumb from "../components/common/PageBreadCrumb";
import PageMeta from "../components/common/PageMeta";
import MapComponent from "../components/georoute/MapComponent";
import "../index.css";

export default function RoutePlanner() {
    const initialCenter: [number, number] = [38.2527, -85.7585];
    const initialZoom: number = 6;
    return (
        <div>
            <PageMeta
                title="React.js Route Dashboard | TailAdmin - Next.js Admin Dashboard Template"
                description="This is React.js Route Planner page for TailAdmin - React.js Tailwind CSS Admin Dashboard Template"
            />
            <PageBreadcrumb pageTitle="Route Planner" />
            <div className="min-h-screen rounded-2xl border border-gray-200 bg-white px-5 py-7 dark:border-gray-800 dark:bg-white/[0.03] xl:px-10 xl:py-12">
                <div className="mx-auto w-full text-center">
                    <MapComponent center={initialCenter} zoom={initialZoom} />
                    <p className="text-sm text-gray-500 dark:text-gray-400 sm:text-base mt-5">
                        You can render the Map component wherever it's needed in your
                        application.
                    </p>
                </div>
            </div>
        </div>
    );
}
