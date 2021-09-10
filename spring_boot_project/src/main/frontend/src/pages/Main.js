import React from "react";
import { Col, Row, Container } from '@themesberg/react-bootstrap';

export default () => (
  <main class="ms-n3 me-n3">
    <section className="section-header overflow-hidden pt-5 pt-lg-6 pb-9 pb-lg-12 bg-indigo text-white" id="home">
      <Container>
        <Row>
          <Col xs={12} className="text-center">
            <div className="react-big-icon d-none d-lg-block"><span className="fas fa-heartbeat"></span></div>
            <h1 className="fw-bolder text-secondary">Medical Cabinet</h1>
            <p className="text-muted fw-light mb-5 h5">You no longer have to stand in a grueling queue</p>
            <p className="text-muted fw-light mb-5 h6">It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for 'lorem ipsum' will uncover many web sites still in their infancy. Various versions have evolved over the years, sometimes by accident, sometimes on purpose (injected humour and the like).
            </p>
          </Col>
        </Row>
        <figure className="position-absolute bottom-0 left-0 w-100 d-none d-md-block mb-n2">
          <svg className="fill-soft" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 3000 185.4">
            <path d="M3000,0v185.4H0V0c496.4,115.6,996.4,173.4,1500,173.4S2503.6,115.6,3000,0z" />
          </svg>
        </figure>
        <p className="text-muted fw-light mb-5 h6">There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don't look even slightly believable. If you are going to use a passage of Lorem Ipsum, you need to be sure there isn't anything embarrassing hidden in the middle of text. All the Lorem Ipsum generators on the Internet tend to repeat predefined chunks as necessary, making this the first true generator on the Internet. It uses a dictionary of over 200 Latin words, combined with a handful of model sentence structures, to generate Lorem Ipsum which looks reasonable. The generated Lorem Ipsum is therefore always free from repetition, injected humour, or non-characteristic words etc.
        </p>
      </Container>
    </section>
  </main>
);