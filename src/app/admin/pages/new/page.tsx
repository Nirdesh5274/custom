import Link from "next/link";
import { redirect } from "next/navigation";
import { requireAdmin } from "@/lib/require-admin";
import { PageForm } from "@/components/admin/page-form";

export default async function NewPagePage() {
  const session = await requireAdmin();
  if (!session) redirect("/admin/login");

  return (
    <section className="mx-auto w-full max-w-4xl px-4 py-10 md:px-6">
      <div className="mb-6 flex items-center gap-4">
        <Link href="/admin/pages" className="text-sm font-bold text-[#35618f] hover:text-[#132c45]">
          ← Back to List
        </Link>
      </div>
      <div className="admin-shell p-6 md:p-8">
        <h2 className="font-heading text-3xl font-black text-[#0c2f50]">Create Custom Page</h2>
        <p className="mt-2 mb-6 text-sm text-[#50667e]">Create a new custom full-page article or HTML content.</p>
        <PageForm />
      </div>
    </section>
  );
}
