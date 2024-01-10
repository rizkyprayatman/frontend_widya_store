import React, { useState, useEffect } from "react";
import Head from "next/head";
import Login from '@/components/Login/Login';
import MenuTab from "@/components/Tab/Tab";
import NavbarSection from "@/components/Navbar/Navbar";
import Footer from "@/components/Footer";

export default function Home() {
  const [isLogin, setIsLogin] = useState(false);

  useEffect(() => {
    const Token = localStorage.getItem("TOKEN");

    if (Token != null) {
      setIsLogin(true);
    }
  }, []);

  return (
    <>
      <Head>
        <title>Widya Store</title>
        <meta name="description" content="Widya Store App" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      {isLogin == true ? (
        <>
          <div style={{ width: "100%" }}>
            <NavbarSection />
            <MenuTab />
            <Footer />
          </div>
        </>
      ) : (
        <>
          <Login />
        </>
      )}

    </>
  );
}
