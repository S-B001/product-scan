import React, { useState } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import './FormMy.css'
import { Container, Row, Col, Button, Form, Table, InputGroup } from "react-bootstrap";
import { FaRupeeSign, FaWeight, FaWeightHanging } from "react-icons/fa"
import QRCode from "react-qr-code";
import Barcode from "react-barcode";
import { FaWeightScale } from "react-icons/fa6";

const ParcelForm = () => {
  // const [totalCost, setTotalCost] = useState("");
  // const [pricePerKg, setPricePerKg] = useState("");
  // const [weight, setWeight] = useState("");
  // const [qrData, setQrData] = useState("");
  // const [barcodeData, setBarcodeData] = useState("");
  const [pricePerKg, setPricePerKg] = useState("");
  const [weight, setWeight] = useState("");
  const [qrData, setQrData] = useState("");
  const [barcodeData, setBarcodeData] = useState("");

//   const handleQRCodeGeneration = () => {
//     const totalCostInPaise = Math.round(parseFloat(totalCost) * 1000);
//     const pricePerKgInPaise = Math.round(parseFloat(pricePerKg) * 100);

//     // Ensure weight is in grams, and format it to 5 digits
//     const weightInGrams = Math.round(parseFloat(weight) * 1);
//     const formattedWeightInGrams = String(weightInGrams).padStart(5, "0"); // Ensure 5 digits
// alert(formattedWeightInGrams);
//     // Format the data for the QR code
//     const qrValue = `${String(totalCostInPaise).padStart(6, "0")}%${String(pricePerKgInPaise).padStart(5, "0")}%${formattedWeightInGrams}`;
//     setQrData(qrValue);

//     // Set barcode data to the same as QR for demonstration
//     setBarcodeData(qrValue);
//   };
const handleQRCodeGeneration = () => {
  const weightInGrams = Math.round(parseFloat(weight) * 1);
  const formattedWeightInGrams = String(weightInGrams).padStart(5, "0");
  
  const pricePerGram = parseFloat(pricePerKg) / 1000;
  const totalCost = Math.round(weightInGrams * pricePerGram * 1000); // Convert to paise
  const pricePerKgInPaise = Math.round(parseFloat(pricePerKg) * 100);

  const qrValue = `${String(totalCost).padStart(6, "0")}%${String(pricePerKgInPaise).padStart(5, "0")}%${formattedWeightInGrams}`;
  setQrData(qrValue);
  setBarcodeData(qrValue);
};


  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name === "pricePerKg") {
      setPricePerKg(value);
    } else if (name === "weight") {
      setWeight(value);
    }
  };
  return (
    <>
    <div className="container" >
      <div className="main-card">
        <h2 className="text-center py-3">QR And BAR Code Generator</h2>

        <div className="input-card my-2">
        <Form>
        <div className="row">
          <div className="col-lg-6">
            <Form.Group controlId="pricePerKg">
              <Form.Label>Price Per Kg (₹)</Form.Label>
              <InputGroup>
                <InputGroup.Text>
                  <FaRupeeSign />
                </InputGroup.Text>
              <Form.Control
                type="number"
                name="pricePerKg"
                value={pricePerKg}
                onChange={handleInputChange}
                placeholder="Enter price per kg"
              />
              </InputGroup>
            </Form.Group>
            </div>
            <div className="col-lg-6">
            <Form.Group controlId="weight">
              <Form.Label>Weight (grams)</Form.Label>
              <InputGroup>
                <InputGroup.Text>
                  <FaWeightScale />
                </InputGroup.Text>
              <Form.Control
                type="number"
                name="weight"
                value={weight}
                onChange={handleInputChange}
                placeholder="Enter weight in grams"
              />
              </InputGroup>
            </Form.Group>
            </div>
            <div className="col-lg-12 text-center">
            <Button className="mt-3 btn-submit"  onClick={handleQRCodeGeneration}>
              Generate QR and Barcode
            </Button>
            </div>
          </div>
        </Form>
        </div>  

        <div className=" my-3">
        <div className="row d-flex justify-content-evenly mx-1">
        {qrData && (
            <div className="col-lg-5 d-flex align-items-center justify-content-center input-row-div">
              <div>
                  <QRCode value={qrData} size={256} />
            </div>
          </div>
             )}
          
            {qrData && (
            <div className="col-lg-5 d-flex align-items-center justify-content-center input-row-div">
                <div>
                  <Barcode value={barcodeData} format="CODE128" />
                </div>
            </div>
          )}
        </div>
        </div>
            
       
       {qrData && (
        <div className="table-div">
        <Row className="">
          <Col md={12}>
            <Table bordered>
              <thead>
                <tr>
                  <th>NET WT/QTY</th>
                  <th>TOTAL PRICE</th>
                  <th>PER/Kg</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>{String(parseFloat(weight) * 1).padStart(3, "0")}g</td>
                  <td>₹ {(parseFloat(weight) * (parseFloat(pricePerKg) / 1000)).toFixed(2)}</td>
                  <td>₹ {(parseFloat(pricePerKg)).toFixed(2)}</td>
                </tr>
              </tbody>
            </Table>
          </Col>
        </Row>
       </div>
       )}

      </div>
    </div>
    </>
   
  );
};

export default ParcelForm;
