import LeadersTable from "./table/table";
import List from "./list/list";

export default function Collector() {
    return (
        <main className="text-white h-main">
            <div className="flex justify-between h-full">
                <List />
                <LeadersTable />
            </div>
        </main>
    );
}
