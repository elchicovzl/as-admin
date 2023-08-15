export type SiteConfig = typeof siteConfig;

export const siteConfig = {
	name: "AS Admin",
	description: "Administrador para app afiliación segura.",
	navItems: [
		{
			label: "Inicio",
			href: "/",
		},
	],
	navMenuItems: [
		{
			label: "Dashboard",
			href: "/dashboard",
		},
		
		{
			label: "Logout",
			href: "/logout",
		},
	],
	links: {
		github: "https://github.com/nextui-org/nextui",
		twitter: "https://twitter.com/getnextui",
		docs: "https://nextui.org",
		discord: "https://discord.gg/9b6yyZKmH4",
    sponsor: "https://patreon.com/jrgarciadev"
	},
};
