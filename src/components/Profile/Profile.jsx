/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import styles from "../../styles/Registrasi.module.css";
import { BACKEND_URL } from '../../utils/constants';

function ProfileUser() {
  const router = useRouter();
  const [readyProfile, setReadyProfile] = useState(false);
  const [profile, setProfile] = useState({});
  const [token, setToken] = useState("");
  const [form, setForm] = useState({});
  const [exit, setExit] = useState(false);
  const [data, setData] = useState(false);

  const handleExit = () => {
    setExit(false);
    localStorage.clear();
    router.push("/login");
  };

  const handleSetForm = (type, event) => {
    if (type === "nama") {
      setForm((prevState) => ({
        ...prevState,
        nama: event.target.value,
      }));
    }
    if (type === "email") {
      setForm((prevState) => ({
        ...prevState,
        email: event.target.value,
      }));
    }
    if (type === "jenis_kelamin") {
      setForm((prevState) => ({
        ...prevState,
        jenis_kelamin: event.target.value,
      }));
    }
  };

  const getProfile = async (token) => {
    setReadyProfile(false);
    try {
      const response = await fetch(
        `${BACKEND_URL}/user/profile`,
        {
          method: "GET",
          headers: {
            "Content-type": "application/json; charset-UTF-8",
            Authorization: `Bearer ${token}`,
          },
          redirect: "follow",
        }
      );
      const result = await response.json();
      setProfile(result);
      setReadyProfile(true);
    } catch (err) {
      // console.error(err);
    }
  };

  const sendUpdate = async () => {
    setData(true);
    try {
      const response = await fetch(
        "https://be-widya-store.rprayatman.my.id/api/user/update-profile",
        {
          method: "PUT",
          body: JSON.stringify({
            nama: form.nama || profile.profile.nama,
            email: form.email || profile.email,
            jenis_kelamin: form.jenis_kelamin || profile.profile.jenis_kelamin,
          }),
          headers: {
            "Content-type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          redirect: "follow",
        }
      );
      const result = await response.json();

      if (response.status === 200) {
        setProfile(result);
        router.reload(window.location.pathname);
      }
      setData(false);
    } catch (err) {
      // console.error(err);
    }
  };

  useEffect(() => {
    const authToken = localStorage.getItem("TOKEN");
    if (authToken) {
      getProfile(authToken);
      setToken(authToken);
    } else {
      setExit(true);
    }
  }, []);

  return (
    <>
      <section>
        {readyProfile == true ? (
          <>
            <div className="d-flex justify-content-center mb-5 mx-sm-0 px-sm-0 mx-5">
              <Form className={`mt-2`} style={{ width: "40%" }}>
                <Form.Group className="mb-2">
                  <Form.Label>Nama</Form.Label>
                  <Form.Control
                    className={`border-1 rounded-start text-capitalize`}
                    type="text"
                    placeholder={`${profile.profile.nama}`}
                    onChange={(event) => handleSetForm("nama", event)}
                  />
                </Form.Group>
                <Form.Group className="mb-2">
                  <Form.Label>Jenis Kelamin</Form.Label>
                  <Form.Select
                    aria-label="Default select example"
                    onChange={(event) => handleSetForm("jenis_kelamin", event)}
                    defaultValue={profile.profile.jenis_kelamin}
                  >
                    <option>Jenis Kelamin</option>
                    <option value="Pria">Pria</option>
                    <option value="Wanita">Wanita</option>
                  </Form.Select>
                </Form.Group>
                <Form.Group className="mb-2">
                  <Form.Label>Email</Form.Label>
                  <Form.Control
                    className={`border-1 rounded-start`}
                    type="email"
                    placeholder={profile.email}
                    onChange={(event) => handleSetForm("email", event)}
                  />
                </Form.Group>
                <div className="d-flex justify-content-center">
                  <Button
                    className={`${styles.bgPurple} border`}
                    onClick={() => sendUpdate()}
                  >
                    {data === false ? "Update" : "Proses..."}
                  </Button>
                </div>
              </Form>
            </div>
          </>
        ) : (
          <>
            <div className="d-flex justify-content-center align-items-center mt-5 pt-5 mb-3">
              <h1>Widya Store</h1>
            </div>
            <div className="d-flex justify-content-center align-items-center mb-5 pb-5">
              <p>Loading...</p>
            </div>
          </>
        )}
      </section>

      <Modal show={exit} onHide={handleExit}>
        <Modal.Body>
          <h1 className="fs-4 mt-1 text-center">Hai Kamu !</h1>

          <p className="fs-6 text-center">
            Kamu tidak dapat mengakses halaman ini, Login dulu yuk
          </p>
          <div className="d-flex justify-content-center">
            <Button
              onClick={handleExit}
              className={`${styles.bgPurple} border`}
            >
              Login
            </Button>
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
}

export default ProfileUser;
