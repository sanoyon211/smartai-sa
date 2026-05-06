import LoginForm from "@/components/auth/LoginForm";
import GoogleButton from "@/components/auth/GoogleButton";
import Link from "next/link";

export default function LoginPage() {
  return (
    <div className="min-h-screen bg-black flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-md space-y-8">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-white tracking-tighter">Welcome back</h1>
          <p className="text-zinc-400 mt-2">Log in to your SmartChat account</p>
        </div>

        <GoogleButton />

        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <span className="w-full border-t border-zinc-800"></span>
          </div>
          <div className="relative flex justify-center text-xs uppercase">
            <span className="bg-black px-2 text-zinc-500">or continue with email</span>
          </div>
        </div>

        <LoginForm />

        <p className="text-center text-zinc-500 text-sm">
          Don&apos;t have an account?{" "}
          <Link href="/register" className="text-white hover:underline">
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
}
