import "./globals.css";
import Layout from "../components/Layout";

export const metadata = {
  title: "Khatabook App",
  description: "Simple accounting app built with Next.js",
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
