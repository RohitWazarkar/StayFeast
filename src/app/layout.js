import "./globals.css";
import Layout from "../components/Layout";

export const metadata = {
  title: "StayFeast App",
  description: "Hotel Management app Dev. with Next.js",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <Layout>{children}</Layout>
      </body>
    </html>
  );
}
