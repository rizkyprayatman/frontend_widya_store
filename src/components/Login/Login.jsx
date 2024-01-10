import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import InputGroup from "react-bootstrap/InputGroup";
import { useRouter } from "next/router";
import styles from "../../styles/Registrasi.module.css";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Swal from "sweetalert2";
import { BACKEND_URL } from '../../utils/constants';

function Login() {
  const router = useRouter();
  const [eyePassword, setEyePassword] = useState(false);
  const [password, setPassword] = useState(false);
  const [form, setForm] = useState({});
  const [processSend, setProcessSend] = useState(false);

  const clickEyePassword = () => {
    setPassword(true), setEyePassword(true);
  };

  const clickCloseEyePassword = () => {
    setPassword(false), setEyePassword(false);
  };

  const Alert = Swal.mixin({
    showConfirmButton: true,
    customClass: {
      confirmButton: "btn btn-secondary",
    },
    buttonsStyling: false,
  });

  const handleSetForm = (type, event) => {
    if (type === "email") {
      setForm({
        email: event.target.value,
      });
    }
    if (type === "password") {
      setForm((prevState) => ({
        ...prevState,
        password: event.target.value,
      }));
    }
  };

  const sendLogin = async () => {
    setProcessSend(true);
    try {
      const response = await fetch(
        `${BACKEND_URL}/user/login`,
        {
          method: "POST",
          body: JSON.stringify(form),
          headers: {
            "Content-Type": "application/json",
          },
          redirect: "follow",
        }
      );
      const result = await response.json();
      console.log(result)
      if (result.message === "User not found. Please register!") {
        Alert.fire({
          icon: "warning",
          title: "Email tidak terdaftar",
          text: "Silahkan daftar terlebih dahulu",
          color: "#000",
        });
        setProcessSend(false);
      } else if (result.message === "Incorrect Password. Please try again!") {
        Alert.fire({
          icon: "warning",
          title: "Password Salah",
          text: "Silahkan masukkan password yang benar",
          color: "#000",
        });
        setProcessSend(false);
      } else if (result.message === "Login Sukses!"){
        localStorage.setItem("ID", result.data.id);
        localStorage.setItem("TOKEN", result.data.token);
        if (router.pathname !== "/login") {
          window.location.reload();
        }
        router.push('/');
        setProcessSend(false);
      }
    } catch (err) {
      // console.error(err);
    }
  };

  useEffect(() => {}, []);

  return (
    <>
      <section className="mb-5">
        <div className="ms-sm-5 ps-sm-5 ms-5 mt-sm-3 mt-3">
          <h1 className="fs-3">Masuk</h1>
          <p className={`${styles.stripActive} pt-1`}></p>
        </div>
        <div className="d-flex justify-content-center mb-5 mx-sm-0 px-sm-0 mx-5 sm-3">
          <Form>
            <h1 className="fs-3 text-start mt-sm-2 mt-4">
              Selamat Datang Kembali,
            </h1>
            <Form.Group className="mb-2 mt-3" controlId="validationCustom01">
              <Form.Label>Email</Form.Label>
              <Form.Control
                required
                className={`border-1 rounded-start`}
                type="email"
                placeholder="emailkamu@gmail.com"
                onChange={(event) => handleSetForm("email", event)}
              />
            </Form.Group>
            <Form.Group className="mb-2" controlId="validationCustom05">
              <Form.Label>Password</Form.Label>
              <div
                className={`d-flex border rounded-1 ${styles.formControlEye}`}
              >
                <Form.Control
                  className={`border-0 rounded-start ${styles.formControl}`}
                  type={`${eyePassword === true ? `text` : `password`}`}
                  placeholder="Password"
                  onChange={(e) => {
                    handleSetForm("password", e);
                  }}
                  required
                />
                <InputGroup.Text
                  className={`border-0 ${styles.formControl} bg-white`}
                >
                  {password ? (
                    <FontAwesomeIcon
                      icon={faEyeSlash}
                      onClick={() => clickCloseEyePassword()}
                    />
                  ) : (
                    <FontAwesomeIcon
                      icon={faEye}
                      onClick={() => clickEyePassword()}
                    />
                  )}
                </InputGroup.Text>
              </div>
              <Form.Control.Feedback type="invalid">
                Please provide a Password.
              </Form.Control.Feedback>
            </Form.Group>

            <div className="d-flex justify-content-center mt-3">
              <Button
                className={`${styles.bgPurple} border w-100`}
                onClick={() => sendLogin()}
              >
                {processSend === false ? "Masuk" : "Proses..."}
              </Button>
            </div>
            <div className="mt-2">
              <Form.Text
                onClick={() => router.push("/register")}
                className="d-flex justify-content-start btn btn-link pt-0 mt-0"
              >
                Daftar
              </Form.Text>
            </div>
          </Form>
        </div>
      </section>
    </>
  );
}

export default Login;
