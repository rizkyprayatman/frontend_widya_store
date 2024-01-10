import React, { useState, useEffect } from "react";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import { useRouter } from "next/router";
import Navbar from "react-bootstrap/Navbar";
import styles from "../../styles/LandingPage.module.css";

function NavbarSection() {
  const router = useRouter();
  const [token, setToken] = useState("");
  const [userName, setUserName] = useState("");

  const logoutHandler = async () => {
    localStorage.clear();
    window.location.reload();
  };

  useEffect(() => {
    const authToken = localStorage.getItem("TOKEN");
    const username = localStorage.getItem("USERNAME");

    if (authToken != null) {
      setToken(authToken);
      setUserName(username);
    }
  }, []);
  return (
    <>
      <Navbar
        expand="lg"
        className={`px-sm-5 px-4 shadow-sm border-bottom fixed-top bg-white`}
      >
        <Container fluid>
          <Navbar.Brand>
            <div className="mx-sm-2 px-sm-3 px-0">
              <h2>
                <span className="">Widya Store</span>
              </h2>
            </div>
          </Navbar.Brand>
          {token ? (
            <>
              <Navbar.Toggle aria-controls="navbarScroll" className="" />
              <Navbar.Collapse id="navbarScroll">
                <Nav className="me-auto" style={{ maxHeight: "100px" }}></Nav>
                <div className="d-flex align-items-center">
                  <Nav.Link
                    onClick={() => router.push("/dashboard")}
                    className="nav-link active fw-bold me-3 text-capitalize"
                  >
                    {userName}
                  </Nav.Link>
                  <button
                    type="button"
                    className={`btn border border-dark fw-bold rounded-3 me-4 px-4 py-1 ${styles.bgPurpleLight}`}
                    onClick={() => logoutHandler()}
                  >
                    Keluar
                  </button>
                </div>
              </Navbar.Collapse>
            </>
          ) : (
            <>
              <Navbar.Toggle
                aria-controls="navbarScroll"
                className="bg-light"
              />
              <Navbar.Collapse id="navbarScroll">
                <Nav className="me-auto" style={{ maxHeight: "100px" }}>
                  <Nav.Link
                    onClick={() => router.push("/")}
                    className="nav-link active fw-bold me-3"
                  >
                    Beranda
                  </Nav.Link>
                </Nav>
                <div className="mx-sm-5 mx-0">
                  <button
                    type="button"
                    className={`btn border shadow-sm fw-bold rounded-3 me-4 px-4 ${styles.bgPurpleLight}`}
                    onClick={() => router.push("/login")}
                  >
                    Masuk
                  </button>
                  <button
                    type="button"
                    className={`btn ${styles.bgGrey} border shadow-sm fw-bold rounded-3 px-4 `}
                    onClick={() => router.push("/register")}
                  >
                    Daftar
                  </button>
                </div>
              </Navbar.Collapse>
            </>
          )}
        </Container>
      </Navbar>
    </>
  );
}

export default NavbarSection;
