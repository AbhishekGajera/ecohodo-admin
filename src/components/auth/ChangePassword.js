import React from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import { changePassword, signin } from "../../Utils/api";
import useAuth from "../../Utils/hooks/useAuth";
import "../../assets/styles/SignupLogin.css";
import { toast } from "react-toastify";// Import the Bootstrap Alert component

const ChangePassword = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const initialValues = {
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  };

  const validationSchema = Yup.object({
    currentPassword: Yup.string()
      .required("Current password is required"),
    newPassword: Yup.string().required("New password is required"),
    confirmPassword: Yup.string().oneOf([Yup.ref('newPassword'), null], 'Passwords must match').required("Confirm password is required"),
  });

  const onSubmit = async (values, { setSubmitting, resetForm }) => {
    try {
      const response = await changePassword(values);
      resetForm();
      if (response?.data?.status) {
        toast.success("Password Changed successfully!");
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
    <div className="card-main">
      <h5 className="title-main">Change Password</h5>
      <div className="mt-2 inner-card p-3">
        <form onSubmit={formik.handleSubmit}>
          <div className="form-group">
            <label>Current Password:</label>
            <input
              type="password"
              name="currentPassword"
              value={formik.values.currentPassword}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className="form-control"
            />
            {formik.touched.currentPassword && formik.errors.currentPassword && (
              <p className="error-message">{formik.errors.currentPassword}</p>
            )}
          </div>
          <div className="form-group">
            <label>New Password:</label>
            <input
              type="password"
              name="newPassword"
              value={formik.values.newPassword}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className="form-control"
            />
            {formik.touched.newPassword && formik.errors.newPassword && (
              <p className="error-message">{formik.errors.newPassword}</p>
            )}
          </div>
          <div className="form-group">
            <label>Confirm Password:</label>
            <input
              type="password"
              name="confirmPassword"
              value={formik.values.confirmPassword}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className="form-control"
            />
            {formik.touched.confirmPassword && formik.errors.confirmPassword && (
              <p className="error-message">{formik.errors.confirmPassword}</p>
            )}
          </div>
          <button
            type="submit"
            className="btn btn-primary btn-changepassword"
            disabled={formik.isSubmitting}
          >
            Save
          </button>
          <button
            type="button"
            className="btn btn-primary btn-cancel"
            onClick={() => { formik.resetForm() }}
          >
            Cancel
          </button>
        </form>
      </div>
    </div>
  );
};

export default ChangePassword;
