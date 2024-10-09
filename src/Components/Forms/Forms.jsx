import React, { useState } from "react";
import { useParams } from "react-router-dom";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Header from "../Essentials/Header";
import Footer from "../Essentials/Footer";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function Forms() {
  const params = useParams();
  const title = params.type;
  const navigate = useNavigate();

  const [files, setFiles] = useState([]);
  const [formData, setFormData] = useState({
    name: "",
    degree: "",
    address: "",
    address2: "",
    city: "",
    state: "",
    zip: "",
    serviceCategory: title,
  });

  const handleFileChange = (e) => {
    const uploadedFiles = Array.from(e.target.files).map((file) => ({
      file,
      url: URL.createObjectURL(file),
    }));
    setFiles(uploadedFiles);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === "age" ? Number(value) : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(formData);

    const combinedAddress = `${formData.address}, ${formData.address2}`;

    // Create a FormData object to send the form data and files
    const data = new FormData();

    data.append("name", formData.name);
    data.append("degree", formData.degree);
    data.append("address", combinedAddress);
    data.append("city", formData.city);
    data.append("state", formData.state);
    data.append("zip", formData.zip);
    data.append("serviceCategory", formData.serviceCategory);


    // Append files only if they exist
    const documents = [];
    if (files.length > 0) {
      files.forEach((fileData) => {
        documents.push(fileData.url) // Append each file
      });
    }
    data.append("documents", documents)

    for (const [key, value] of data.entries()) {
      console.log(`${key}: ${value}`);
    }

    try {
      const res = await axios.post(
        "http://localhost:5000/api/service/submit",
        data,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      alert("Registration successfull"); // Use a success message from the server
      navigate(`/care/${title}`)
      // Reset the form or do something else on success
      setFormData({
        name: "",
        degree: "",
        address: "",
        address2: "",
        city: "",
        state: "",
        zip: "",
        serviceCategory: title,
      });
      setFiles([]);
    } catch (error) {
      console.error("Error submitting form:", error);
      alert("Failed to submit the form. Please try again.");
    }
  };

  return (
    <div>
      <Header />
      <hr className="mt-0" />
      <Form className="p-3" onSubmit={handleSubmit}>
        <Row className="mb-3">
          <Form.Group as={Col} controlId="formName">
            <Form.Label>Name</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter your full name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </Form.Group>

          <Form.Group as={Col} controlId="formDegree">
            <Form.Label>Degree</Form.Label>
            <Form.Control
              type="text"
              placeholder="Degree"
              name="degree"
              value={formData.degree}
              onChange={handleChange}
              required
            />
          </Form.Group>

          {/* <Form.Group as={Col} controlId="formGender">
            <Form.Label>Gender</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter gender"
              name="gender"
              value={formData.gender}
              onChange={handleChange}
              required
            >
            </Form.Control>
          </Form.Group> */}
        </Row>

        {/* <Form.Group as={Col} controlId="formAge">
          <Form.Label>Age</Form.Label>
          <Form.Control
            type="number"
            placeholder="Enter your age"
            name="age"
            value={formData.age}
            onChange={handleChange}
            required
          />
        </Form.Group> */}

        {/* <Row className="mb-3">
          <Form.Group as={Col} controlId="formAge">
            <Form.Label>Age</Form.Label>
            <Form.Control
              type="number"
              placeholder="Enter your age"
              name="age"
              value={formData.age}
              onChange={handleChange}
              required
            />
          </Form.Group>

          <Form.Group as={Col} controlId="formGender">
            <Form.Label>Gender</Form.Label>
            <Form.Select
              name="gender"
              value={formData.gender} // Correct field name
              onChange={handleChange}
              required
            >
              <option value="">Select Gender</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="other">Other</option>
            </Form.Select>
          </Form.Group>
        </Row> */}

        <Form.Group className="mb-3" controlId="formGridAddress1">
          <Form.Label>Address</Form.Label>
          <Form.Control
            placeholder="1234 Main St"
            name="address"
            value={formData.address}
            onChange={handleChange}
            required
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formGridAddress2">
          <Form.Label>Address 2</Form.Label>
          <Form.Control
            placeholder="Apartment, studio, or floor"
            name="address2"
            value={formData.address2}
            onChange={handleChange}
          />
        </Form.Group>

        <Row className="mb-3">
          <Form.Group as={Col} controlId="formGridCity">
            <Form.Label>City</Form.Label>
            <Form.Control
              name="city"
              value={formData.city}
              onChange={handleChange}
              required
            />
          </Form.Group>

          <Form.Group as={Col} controlId="formGridState">
            <Form.Label>State</Form.Label>
            <Form.Control
              name="state"
              value={formData.state}
              onChange={handleChange}
              required
            ></Form.Control>
          </Form.Group>

          <Form.Group as={Col} controlId="formGridZip">
            <Form.Label>Zip</Form.Label>
            <Form.Control
              name="zip"
              value={formData.zip}
              onChange={handleChange}
              required
            />
          </Form.Group>
        </Row>

        <Form.Group className="mb-3">
          <Form.Label>Service Category</Form.Label>
          <Form.Select disabled>
            <option>{title}</option>
          </Form.Select>
        </Form.Group>

        {/* Multiple File Upload Section */}
        <Form.Group className="mb-3" controlId="formFileMultiple">
          <Form.Label>Upload documents (Optional)</Form.Label>
          <Form.Control type="file" multiple onChange={handleFileChange} />
        </Form.Group>

        {/* Display Uploaded Files as Links */}
        <div className="mb-3">
          <h6>Uploaded documents:</h6>
          {files.length > 0 ? (
            <ul>
              {files.map((fileData, index) => (
                <li key={index}>
                  <a
                    href={fileData.url}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {fileData.file.name}
                  </a>
                </li>
              ))}
            </ul>
          ) : (
            <p>No files uploaded yet</p>
          )}
        </div>

        <Form.Group className="mb-3" id="formGridCheckbox">
          <Form.Check
            type="checkbox"
            label="I agree to the terms and conditions"
            required
          />
        </Form.Group>

        <Button variant="primary" type="submit">
          Submit
        </Button>
      </Form>
      <Footer />
    </div>
  );
}
