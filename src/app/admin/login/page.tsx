import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { LoginForm } from "@/components/admin/login-form";
import { authOptions } from "@/lib/auth";

export default async function AdminLoginPage() {
  const session = await getServerSession(authOptions);

  if (session?.user) {
    redirect("/admin");
  }

  return (
    <div className="mx-auto flex w-full max-w-5xl flex-1 items-center px-4 py-12 md:px-6">
      <div className="grid w-full gap-6 md:grid-cols-[1fr_1fr]">
        <div className="hero-grid rounded-3xl p-7 text-white md:p-8">
          <p className="text-xs font-semibold uppercase tracking-[0.16em] text-sky-200">Secure Access</p>
          <h2 className="mt-3 font-heading text-3xl font-black leading-tight">Administrative Login Console</h2>
          <p className="mt-4 text-sm leading-7 text-sky-100">
            Authorized officers can manage homepage ticker, publish notices, and update public communications.
          </p>
          <ul className="mt-6 space-y-2 text-sm text-sky-100">
            <li>Role-based secure authentication</li>
            <li>Centralized content management</li>
            <li>Audit-ready publishing operations</li>
          </ul>
        </div>
        <div className="w-full">
          <h2 className="mb-4 font-heading text-3xl font-black text-[#0c2f50]">Admin Login</h2>
          <LoginForm />
        </div>
      </div>
    </div>
  );
}
