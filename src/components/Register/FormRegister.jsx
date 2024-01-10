import React, { useState, useEffect } from "react";
import validator from "validator";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import styles from "../../styles/Registrasi.module.css";
import Image from "next/image";
import Swal from "sweetalert2";
import { useRouter } from "next/router";
import { BACKEND_URL } from '../../utils/constants';

function FormRegister(props) {
  const router = useRouter();
  const [validated, setValidated] = useState(false);
  const [password, setPassword] = useState(false);
  const [valuePassword, setvaluePassword] = useState("");
  const [valueKonfirmasiPassword, setvalueKonfirmasiPassword] = useState("");
  const [konfirmasiPassword, setKonfirmasiPassword] = useState(false);
  const [eyePassword, setEyePassword] = useState(false);
  const [eyeKonfirmasiPassword, setEyeKonfirmasiPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [errorKonfirmasiPassword, setErrorKonfirmasiPassword] = useState("");
  const [disabledButton, setDisabledButton] = useState(false);
  const [form, setForm] = useState({});
  const [data, setData] = useState(false);

  const btnReady = () => {
    if (disabledButton === false) {
      setDisabledButton(true);
    } else {
      setDisabledButton(false);
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const formCheck = event.currentTarget;
    if (formCheck.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
      setData(false);
    }
    setValidated(true);
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
    if (type === "password") {
      setForm((prevState) => ({
        ...prevState,
        password: event.target.value,
      }));
    }
  };

  const validate = (value) => {
    setPassword(true);
    if (
      validator.isStrongPassword(value, {
        minLength: 8,
        minUppercase: 1,
        minNumbers: 1,
        minSymbols: 1,
      })
    ) {
      setErrorMessage("Password Baik");
      setvaluePassword(value);
    } else {
      setErrorMessage("Password tidak sesuai");
    }
  };

  const konfirmasi = (value) => {
    setKonfirmasiPassword(true);
    if (value === valuePassword) {
      setErrorKonfirmasiPassword("");
      setvalueKonfirmasiPassword(value);
    } else {
      setErrorKonfirmasiPassword("Password tidak sama");
      setvalueKonfirmasiPassword("");
    }
  };

  const clickEyePassword = () => {
    setPassword(false), setEyePassword(true);
  };

  const clickCloseEyePassword = () => {
    setPassword(true), setEyePassword(false);
  };

  const clickEyeKonfirmasiPassword = () => {
    setKonfirmasiPassword(false), setEyeKonfirmasiPassword(true);
  };

  const clickCloseEyeKonfirmasiPassword = () => {
    setKonfirmasiPassword(true), setEyeKonfirmasiPassword(false);
  };

  const Alert = Swal.mixin({
    showConfirmButton: true,
    customClass: {
      confirmButton: "btn btn-secondary",
    },
    buttonsStyling: false,
  });

  const sendRegister = async () => {
    setData(true);
    try {
      const response = await fetch(
        `${BACKEND_URL}/user/register`,
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
      if (result.message === "Email telah terdaftar") {
        Alert.fire({
          icon: "warning",
          title: "Email telah terdaftar",
          text: "Silahkan gunakan email lainnya",
          color: "#000",
        });
        setValidated(false);
        setData(false);
      }
      setData(false);
      router.push({
        pathname: "/login",
        query: null,
      });
    } catch (err) {
      // console.error(err);
    }
  };

  useEffect(() => {}, []);

  return (
    <>
      <div className="d-flex justify-content-between mx-5 px-5 mt-sm-2 mt-5">
        <div className="d-none d-sm-flex align-items-center justify-content-end">
          <Image
            src="https://images.unsplash.com/photo-1684230415060-c59210cd5666?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=385&q=80"
            alt="login"
            className="img-fluid"
            width={"500"}
            height={"1000"}
          />
        </div>
        <div className="d-flex justify-content-center mb-5">
          <Form noValidate validated={validated} onSubmit={handleSubmit}>
            <h1 className="fs-3 text-start mt-2">Daftar</h1>
            <div>
              <Form.Group className="mb-2" controlId="validationCustom01">
                <Form.Label>Nama</Form.Label>
                <Form.Control
                  required
                  className={`border-1 rounded-start ${styles.formControl} ${styles.formControlEye}`}
                  type="text"
                  placeholder="Nama"
                  onChange={(event) => handleSetForm("nama", event)}
                />
              </Form.Group>
            </div>
            <div>
              <Form.Group className="mb-2" controlId="validationEmail">
                <Form.Label>Email</Form.Label>
                <InputGroup hasValidation>
                  <Form.Control
                    className={`border-1 rounded-start ${styles.formControl} ${styles.formControlEye}`}
                    type="email"
                    placeholder="emailaktif@gmail.com"
                    aria-describedby="inputGroupPrepend"
                    required
                    onChange={(event) => handleSetForm("email", event)}
                  />
                  <Form.Control.Feedback type="invalid">
                    Please provide a valid email.
                  </Form.Control.Feedback>
                </InputGroup>
              </Form.Group>
            </div>
            <div>
              <Form.Group className="mb-2" controlId="validationEmail">
                <Form.Label>Jenis Kelamin</Form.Label>
                <InputGroup hasValidation>
                  <Form.Select aria-label="Default select example"
                   onChange={(event) => handleSetForm("jenis_kelamin", event)}>
                    <option>Jenis Kelamin</option>
                    <option value="Pria">Pria</option>
                    <option value="Wanita">Wanita</option>
                  </Form.Select>
                  
                </InputGroup>
              </Form.Group>
            </div>
            <div className="mb-3">
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
                      validate(e.target.value), handleSetForm("password", e);
                    }}
                    required
                  />
                  <InputGroup.Text
                    className={`border-0 ${styles.formControl} bg-white`}
                  >
                    {password ? (
                      <FontAwesomeIcon
                        icon={faEye}
                        onClick={() => clickEyePassword()}
                      />
                    ) : (
                      <FontAwesomeIcon
                        icon={faEyeSlash}
                        onClick={() => clickCloseEyePassword()}
                      />
                    )}
                  </InputGroup.Text>
                </div>
                <Form.Text id="passwordHelpBlock" muted>
                  Password harus disi dengan minimal 8 karakter, tedapat 1 huruf
                  besar, 1 angka dan 1 symbol<br></br>
                  <span
                    className={`fw-bold ${
                      errorMessage === "Password Baik"
                        ? `text-success`
                        : `text-danger`
                    }`}
                  >
                    {errorMessage}
                  </span>
                </Form.Text>

                <Form.Control.Feedback type="invalid">
                  Please provide a Password.
                </Form.Control.Feedback>
              </Form.Group>
              <Form.Group className="mb-2" controlId="validationCustom06">
                <Form.Label>Konfirmasi Password</Form.Label>
                <div
                  className={`d-flex border rounded-1 ${styles.formControlEye}`}
                >
                  <Form.Control
                    className={`border-0 rounded-start ${styles.formControl}`}
                    type={`${
                      eyeKonfirmasiPassword === true ? `text` : `password`
                    }`}
                    placeholder="Password"
                    onChange={(e) => konfirmasi(e.target.value)}
                    required
                  />
                  <InputGroup.Text
                    className={`border-0 ${styles.formControl} bg-white`}
                  >
                    {konfirmasiPassword ? (
                      <FontAwesomeIcon
                        icon={faEye}
                        onClick={() => clickEyeKonfirmasiPassword()}
                      />
                    ) : (
                      <FontAwesomeIcon
                        icon={faEyeSlash}
                        onClick={() => clickCloseEyeKonfirmasiPassword()}
                      />
                    )}
                  </InputGroup.Text>
                </div>
                <Form.Text id="passwordHelpBlock" muted>
                  Isi kembali password di atas<br></br>
                  <span
                    className={`fw-bold`}
                    style={{
                      color: "red",
                    }}
                  >
                    {errorKonfirmasiPassword}
                  </span>
                </Form.Text>

                <Form.Control.Feedback type="invalid">
                  Please provide a Password.
                </Form.Control.Feedback>
              </Form.Group>
            </div>
            <Form.Group className="mb-3">
              <Form.Check
                value={true}
                required
                label="Saya menyetujui kebijakan privasi"
                feedback="Kamu harus menyetujui sebelum Daftar"
                feedbackType="invalid"
                onClick={() => {
                  btnReady();
                }}
              />
            </Form.Group>
            <div className="d-flex justify-content-center">
              {disabledButton === true &&
              valueKonfirmasiPassword !== "" ? (
                <Button
                  type="submit"
                  className={`${styles.bgPurple} border w-100`}
                  onClick={() => sendRegister()}
                >
                  {data === false ? "Daftar" : "Proses..."}
                </Button>
              ) : (
                <Button
                  type="submit"
                  disabled
                  className={`bg-secondary border w-100`}
                >
                  Daftar
                </Button>
              )}
            </div>
            <div className="mt-2">
              <Form.Text
                onClick={() => router.push("/login")}
                className="d-flex justify-content-start btn btn-link pt-0 mt-0"
              >
                Sudah memiliki akun
              </Form.Text>
            </div>
          </Form>
        </div>
      </div>
    </>
  );
}

export default FormRegister;
