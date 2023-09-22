import React from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import { signin } from "../../Utils/api";
import useAuth from "../../Utils/hooks/useAuth";
import "../../assets/styles/SignupLogin.css";
import { toast } from "react-toastify";
import Alert from "react-bootstrap/Alert"; // Import the Bootstrap Alert component

const Login = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { login } = useAuth();

  const initialValues = {
    email: "",
    password: "",
  };

  const validationSchema = Yup.object({
    email: Yup.string()
      .email("Invalid email address")
      .required("Email is required"),
    password: Yup.string().required("Password is required"),
  });

  const onSubmit = async (values, { setSubmitting, resetForm }) => {
    try {
      const response = await signin(values);
      login(response?.data?.data, response?.data?.token); // Call login from useAuth hook
      resetForm();
      if(response?.data?.status){
        toast.success("Logged in successfully!");
      } else {
        toast.success(response?.data?.message);
      }
      navigate("/");
    } catch (error) {
      toast.error(error?.response?.data?.message || "Internal server error");
    } finally {
      setSubmitting(false);
    }
  };

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit,
  });

  return (
    <div className="login-container">
      {location.state?.successMessage && (
        <Alert variant="success">
          {location.state.successMessage}
        </Alert>
      )}
      <form onSubmit={formik.handleSubmit} className="login-form">
        <div className="form-group">
          <label>Email:</label>
          <input
            type="text"
            name="email"
            value={formik.values.email}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            className="form-control"
          />
          {formik.touched.email && formik.errors.email && (
            <p className="error-message">{formik.errors.email}</p>
          )}
        </div>
        <div className="form-group">
          <label>Password:</label>
          <input
            type="password"
            name="password"
            value={formik.values.password}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            className="form-control"
          />
          {formik.touched.password && formik.errors.password && (
            <p className="error-message">{formik.errors.password}</p>
          )}
        </div>
        <button
          type="submit"
          className="btn btn-primary"
          disabled={formik.isSubmitting}
        >
          Login
        </button>
      </form>
    </div>
  );
};

export default Login;
