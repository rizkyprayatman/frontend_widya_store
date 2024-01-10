import React, { useState, useEffect } from "react";
import { useRouter } from "next/router"
import { DataGrid } from "@mui/x-data-grid";;
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Form from "react-bootstrap/Form";
import { BACKEND_URL } from '../../utils/constants';

export default function Produk() {
  const router = useRouter();
  const [token, setToken] = useState("");
  const [data, setData] = useState([]);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [newProductModal, setNewProductModal] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);

  const allProdukById = async (token) => {
    try {
      const response = await fetch(
        `${BACKEND_URL}/product/me`,
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
      if (response.status === 200) {
        setData(result.data);
      }
    } catch (err) {
      // console.error(err);
    }
  };

  const handleAddProduct = async () => {
    try {
      const response = await fetch(
        `${BACKEND_URL}/product/store`,
        {
          method: "POST",
          body: JSON.stringify(selectedProduct),
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          redirect: "follow",
        }
      );
      const result = await response.json();
      if (response.status === 201) {
        allProdukById(token);
        closeEditModal();
      }
    } catch (err) {
      // console.error(err);
    }
  };

  const handleEditProduct = async (editedProductId) => {
    try {
      const response = await fetch(
        `${BACKEND_URL}/product/update/${editedProductId}`,
        {
          method: "PUT",
          body: JSON.stringify(selectedProduct),
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          redirect: "follow",
        }
      );
      const result = await response.json();
      if (response.status === 200) {
        allProdukById(token);
        closeEditModal();
      }
    } catch (err) {
      // console.error(err);
    }
  };

  const handleDeleteProduct = async (productId) => {
    try {
      const response = await fetch(
        `${BACKEND_URL}/product/delete/${productId}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          redirect: "follow",
        }
      );
      const result = await response.json();
      if (response.status === 200) {
        allProdukById(token);
      }
    } catch (err) {
      // console.error(err);
    }
  };

  const handleSetEditForm = (type, event) => {
    setSelectedProduct((prevState) => ({
      ...prevState,
      [type]: event.target.value,
    }));
  };

  const rows =
    data &&
    data.map((item, index) => {
      return {
        no: index + 1,
        id: item.id,
        nama_product: item.nama_product,
        deskripsi: item.deskripsi,
        price: item.price,
        actions: (
          <>
            <Button
              variant="outlined"
              size="small"
              onClick={() => openEditModal(item)}
            >
              Edit
            </Button>
            <Button
              className="mx-2"
              variant="outlined"
              size="small"
              color="error"
              onClick={() => handleDeleteProduct(item.id)}
            >
              Delete
            </Button>
          </>
        ),
      };
    });

  const columns = [
    { field: "no", headerName: "No", width: 50 },
    { field: "id", headerName: "ID", width: 100 },
    { field: "nama_product", headerName: "Nama Produk", width: 150 },
    { field: "deskripsi", headerName: "Deskripsi", width: 450 },
    { field: "price", headerName: "Price", width: 150 },
    {
      field: "actions",
      headerName: "Actions",
      width: 150,
      sortable: false,
      renderCell: (params) => params.value,
    },
  ];

  const openEditModal = (product) => {
    if (product) {
      setSelectedProduct(product);
      setEditModalOpen(true);
      setNewProductModal(false);
    } else {
      setSelectedProduct({
        nama_product: "",
        deskripsi: "",
        price: "",
      });
      setNewProductModal(true);
      setEditModalOpen(true);
    }
  };

  const closeEditModal = () => {
    setSelectedProduct(null);
    setEditModalOpen(false);
  };

  useEffect(() => {
    const authToken = localStorage.getItem("TOKEN");

    if (authToken != null) {
      setToken(authToken);
      allProdukById(authToken);
    }
  }, []);

  return (
    <>
      <div className="mx-5">
        <Button
          variant="outlined"
          className="mb-4 btn-blue"
          onClick={() => openEditModal()}
        >
          Tambah Produk
        </Button>
        {data.length == 0 ? (
          <>
            <div className="d-flex justify-content-center align-items-center mt-4 mb-3">
              <h1>Widya Store</h1>
            </div>
            <div className="d-flex justify-content-center align-items-center mb-5 pb-5">
              <p>Kamu Belum memiliki Produk, Yuk Tambahkan Produk</p>
            </div>
          </>
        ) : (
          <DataGrid
            autoHeight
            rows={rows}
            columns={columns}
            pageSize={5}
            rowsPerPageOptions={[5]}
            disableSelectionOnClick
          />
        )}
      </div>

      <Modal open={editModalOpen} onClose={closeEditModal}>
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: 400,
            bgcolor: "background.paper",
            boxShadow: 24,
            p: 4,
          }}
        >
          <Typography variant="h6" gutterBottom>
            {newProductModal == true ? `Tambahkan Produk` : `Edit Produk`}
          </Typography>
          <Form.Group className="mb-2">
            <Form.Label>Nama Produk</Form.Label>
            <Form.Control
              className={`border-1 rounded-start`}
              type="text"
              value={selectedProduct?.nama_product || ""}
              onChange={(event) => handleSetEditForm("nama_product", event)}
            />
          </Form.Group>
          <Form.Group className="mb-2">
            <Form.Label>Deskripsi</Form.Label>
            <Form.Control
              as="textarea"
              className={`border-1 rounded-start`}
              value={selectedProduct?.deskripsi || ""}
              onChange={(event) => handleSetEditForm("deskripsi", event)}
            />
          </Form.Group>
          <Form.Group className="mb-2">
            <Form.Label>Price</Form.Label>
            <Form.Control
              className={`border-1 rounded-start`}
              type="number"
              value={selectedProduct?.price || ""}
              onChange={(event) => handleSetEditForm("price", event)}
            />
          </Form.Group>

          {newProductModal == true ? (
            <Button
              variant="contained"
              color="primary"
              onClick={() => handleAddProduct()}
            >
              Tambah
            </Button>
          ) : (
            <Button
              variant="contained"
              color="primary"
              onClick={() => handleEditProduct(selectedProduct?.id)}
            >
              Simpan
            </Button>
          )}
        </Box>
      </Modal>
    </>
  );
}
