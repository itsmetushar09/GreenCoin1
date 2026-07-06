import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import Link from "next/link"

export default function LoginPage() {
  return (
    <div className="w-full max-w-md">
      <div className="rounded-xl border-0 bg-white shadow-2xl dark:bg-neutral-900">
        <div className="flex flex-col space-y-1.5 p-6">
          <div className="flex justify-center mb-4">
            <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-emerald-900 text-2xl text-white">
              🌿
            </span>
          </div>
          <h3 className="text-2xl font-semibold leading-none tracking-tight text-center">
            Welcome back
          </h3>
          <p className="text-sm text-muted-foreground text-center">
            Sign in to your GreenCoin admin panel
          </p>
        </div>
        <div className="p-6 pt-0 grid gap-4">
          <div className="grid gap-2">
            <label htmlFor="email" className="text-sm font-medium leading-none">
              Email
            </label>
            <Input id="email" type="email" placeholder="admin@greencoin.eco" />
          </div>
          <div className="grid gap-2">
            <div className="flex items-center justify-between">
              <label htmlFor="password" className="text-sm font-medium leading-none">
                Password
              </label>
              <Link href="#" className="text-xs text-muted-foreground hover:text-emerald-600">
                Forgot password?
              </Link>
            </div>
            <Input id="password" type="password" placeholder="••••••••" />
          </div>
          <Button className="w-full bg-emerald-800 hover:bg-emerald-900 text-white">
            Sign in
          </Button>
        </div>
        <div className="p-6 pt-0 flex justify-center text-xs text-muted-foreground">
          Protected dashboard. Unauthorised access is prohibited.
        </div>
      </div>
    </div>
  )
}