import RegisterForm from "@/components/auth/RegisterForm";
import Link from "next/link";

export default function RegisterPage() {
  return (
    <div className="min-h-screen bg-black flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-md space-y-8">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-white tracking-tighter">Create an account</h1>
          <p className="text-zinc-400 mt-2">Join SmartChat AI today</p>
        </div>
        
        <RegisterForm />
        
        <p className="text-center text-zinc-500 text-sm">
          Already have an account?{" "}
          <Link href="/login" className="text-white hover:underline">
            Log in
          </Link>
        </p>
      </div>
    </div>
  );
}
