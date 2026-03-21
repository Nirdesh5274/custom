import Link from "next/link";
import { redirect } from "next/navigation";
import { UpdateForm } from "@/components/admin/update-form";
import { requireAdmin } from "@/lib/require-admin";

export default async function NewUpdatePage() {
  const session = await requireAdmin();
  if (!session) {
    redirect("/admin/login");
  }

  return (
    <section className="mx-auto w-full max-w-4xl px-4 py-10 md:px-6">
      <div className="admin-shell p-6 md:p-8">
        <div className="mb-5 flex items-center justify-between">
          <div>
            <p className="gov-kicker">Publish Communication</p>
            <h2 className="mt-1 font-heading text-3xl font-black text-[#0c2f50]">Create Update</h2>
          </div>
          <Link href="/admin/updates" className="gov-link text-sm">
            Back to List
          </Link>
        </div>
        <UpdateForm mode="create" />
      </div>
    </section>
  );
}
