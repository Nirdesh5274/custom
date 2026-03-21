import { PortalRecord } from "@/lib/portal-data";

type OrdersTableProps = {
  title: string;
  records: PortalRecord[];
};

export function OrdersTable({ title, records }: OrdersTableProps) {
  return (
    <section className="admin-card p-5">
      <h3 className="font-heading text-xl font-black text-[#0f355a]">{title}</h3>
      <div className="mt-4 overflow-hidden rounded-xl border border-[#d7e1ec]">
        <table className="data-table w-full min-w-[680px] text-left text-sm">
          <thead>
            <tr>
              <th className="px-4 py-3">Reference No.</th>
              <th className="px-4 py-3">Title</th>
              <th className="px-4 py-3">Category</th>
              <th className="px-4 py-3">Date</th>
              <th className="px-4 py-3">Status</th>
            </tr>
          </thead>
          <tbody>
            {records.map((record) => (
              <tr key={record.id} className="border-t border-[#e3eaf2]">
                <td className="px-4 py-3 font-semibold text-[#1e4367]">{record.id}</td>
                <td className="px-4 py-3 text-[#3c5874]">{record.title}</td>
                <td className="px-4 py-3 text-[#3c5874]">{record.category}</td>
                <td className="px-4 py-3 text-[#3c5874]">{new Date(record.date).toLocaleDateString("en-IN")}</td>
                <td className="px-4 py-3">
                  <span className={`rounded-full px-2 py-1 text-xs font-bold ${record.status === "Active" ? "bg-emerald-100 text-emerald-800" : "bg-slate-200 text-slate-700"}`}>
                    {record.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}
