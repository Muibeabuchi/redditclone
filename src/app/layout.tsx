import Providers from "@/Providers"
import Navbar from "@/components/Navbar/Navbar"


export const metadata = {
  title: 'Chiki Reddit Clone',
  description: 'Reddit clone home page',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body >
        <Providers>
          <Navbar />
          <main>
            {children}
          </main>
        </Providers>
      </body>
    </html>
  )
}
