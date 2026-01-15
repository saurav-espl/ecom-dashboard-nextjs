import "@/styles/globals.css";
import "@/styles/dashboard.css";
import type { AppProps } from "next/app";
import { useRouter } from "next/router";
import { useState } from "react"; // 1. Added useState
import Header from "./components/header";
import Footer from "./components/footer";

// FontAwesome Fix
import "@fortawesome/fontawesome-svg-core/styles.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import { config } from "@fortawesome/fontawesome-svg-core";
config.autoAddCss = false;

export default function App({ Component, pageProps }: AppProps) {
  const router = useRouter();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false); // 2. Manage state here

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const isDashboard = router.pathname.startsWith("/dashboard");

  return (
    <>
      {/* 3. Pass the real state and function to Header */}
      {!isDashboard && (
        <Header
          isSidebarOpen={isSidebarOpen}
          toggleSidebar={toggleSidebar}
        />
      )}

      <main>
        <Component
          {...pageProps}
          isSidebarOpen={isSidebarOpen} // Optional: pass to pages if needed
          toggleSidebar={toggleSidebar}
        />
      </main>

      {!isDashboard && <Footer />}
    </>
  );
}