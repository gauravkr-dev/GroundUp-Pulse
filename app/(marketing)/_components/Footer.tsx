/* eslint-disable @next/next/no-img-element */
import { Button } from "@/components/ui/button";
import { GithubIcon, Linkedin } from "lucide-react";
import Image from "next/image";

const navLinks = [
    { href: "#hero", label: "Home" },
    { href: "#how-it-works", label: "How It Works" },
    { href: "#role-of-ai", label: "Role of AI" },
    { href: "#citizen", label: "Citizen" },
    { href: "#authority", label: "Authority" },
    { href: "#privacy", label: "Privacy" },
];

const socialLinks = [
    {
        href: "https://www.linkedin.com/in/gaurav474/",
        label: "LinkedIn",
        icon: <Linkedin />,
    },
    {
        href: "https://github.com/gauravkr-dev",
        label: "Github",
        icon: (
            <GithubIcon
            />
        ),
    },
];

export function Footer() {
    return (
        <footer className="px-4 md:px-24">
            <div className="flex flex-col gap-4 py-6">
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                        <Image src="/groundup_pulse2.png" alt="GroundUp Pulse Logo" width={100} height={80} />
                    </div>
                    <div className="flex items-center">
                        {socialLinks.map(({ href, label, icon }) => (
                            <Button asChild key={label} size="icon-sm" variant="ghost">
                                <a aria-label={label} href={href}>
                                    {icon}
                                </a>
                            </Button>
                        ))}
                    </div>
                </div>

                <nav>
                    <ul className="flex flex-wrap gap-4 font-medium text-muted-foreground text-sm md:gap-6">
                        {navLinks.map((link) => (
                            <li key={link.label}>
                                <a className="hover:text-foreground" href={link.href}>
                                    {link.label}
                                </a>
                            </li>
                        ))}
                    </ul>
                </nav>
            </div>

            <div className="flex items-center justify-between gap-4 border-t py-4 text-muted-foreground text-sm">
                <p>&copy; {new Date().getFullYear()} GroundUp Pulse</p>

                <p className="inline-flex items-center gap-1">
                    <span>Built by</span>
                    <a
                        aria-label="x/twitter"
                        className="inline-flex items-center gap-1 text-foreground/80 hover:text-foreground hover:underline"
                        href={"https://portfolio-silk-rho-58.vercel.app/"}
                        rel="noreferrer"
                        target="_blank"
                    >
                        <img
                            alt="shaban"
                            className="size-4 rounded-full"
                            height="auto"
                            src="https://avatars.githubusercontent.com/u/232183048?v=4"
                            width="auto"
                        />
                        Gaurav
                    </a>
                </p>
            </div>
        </footer>
    );
}
