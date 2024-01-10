import { Container } from "react-bootstrap";

const Footer = () => {
  return (
    <>
      <section id="footer" className="mt-5 fixed-bottom">
        <Container className="mt-3">
          <p className="text-muted text-center fs-6">Copyright 2024 • All rights reserved</p>
        </Container>
      </section>
    </>
  );
};

export default Footer;
