import { Button } from "@/components/ui/button";

export function Header() {
  return (
    <header className="sticky top-0 z-50 bg-just_white">
      <div className="mx-auto flex h-16 items-center justify-between px-8">
        {/* Logo */}
        <div className="flex items-center">
          <img src="/logo.svg" alt="JustTalk" className="h-6 w-auto" />
        </div>

        {/* Navigation */}
        <nav className="hidden md:flex items-center gap-2">
          <a href="#about" className="px-[10px] py-[6px] rounded-lg text-just_scorpion text-sm font-medium tracking-[-0.14px] hover:bg-just_black-5 transition-colors">
            About
          </a>
          <a href="#features" className="px-[10px] py-[6px] rounded-lg text-just_scorpion text-sm font-medium tracking-[-0.14px] hover:bg-just_black-5 transition-colors">
            Features
          </a>
          <a href="#pricing" className="px-[10px] py-[6px] rounded-lg text-just_scorpion text-sm font-medium tracking-[-0.14px] hover:bg-just_black-5 transition-colors">
            Pricing
          </a>
        </nav>

        {/* CTA Buttons */}
        <div className="flex items-center gap-2">
          <a href="https://chat.justtalk.ai/signin?ref=justtalk.ai" target="_blank" rel="noopener">
            <Button variant="outline" className="cursor-pointer">
              Log in
            </Button>
          </a>
          <a href="https://chat.justtalk.ai/welcome?ref=justtalk.ai" target="_blank" rel="noopener">
            <Button className="cursor-pointer">
              Sign up
            </Button>
          </a>
        </div>
      </div>
    </header>
  );
}
