import React, { useState } from "react";
import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";
import ProfileUser from "../Profile/Profile";
import Produk from "../Produk/Produk";

function MenuTab() {
  const [key, setKey] = useState("produk");

  return (
    <>
      <div className="mx-5 mt-5 pt-5">
        <h1 className="mx-5 fs-3">Dashboard</h1>
        <Tabs
          activeKey={key}
          onSelect={(k) => setKey(k)}
          className="mb-3 mx-5"
        >
          <Tab eventKey="profile" title="Profile">
            <ProfileUser />
          </Tab>
          <Tab eventKey="produk" title="Produk">
            <Produk />
          </Tab>
        </Tabs>
      </div>
    </>
  );
}

export default MenuTab;
