import LeadersTable from "./table/table";
import List from "./list/list";

export default function Collector() {
    return (
        <main className="text-white h-main">
            <div className="flex h-full">
                <List />
                <LeadersTable />
            </div>
        </main>
    );
}
