import React, { useState, useEffect } from "react";
import Loader from "../Loader";
import BootstrapTable from "react-bootstrap-table-next";
import paginationFactory from "react-bootstrap-table2-paginator";
import { Link } from "react-router-dom";
import { getUserList } from "../../Utils/api";
import { toast } from "react-toastify";

function UserList() {
  const [loader, setLoader] = useState(false);
  const [data, setdata] = useState([]);

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    try {
      const res = await getUserList();
      setdata(res?.data);
    } catch (error) {
      toast.error(
        error?.response?.data?.message ||
          error?.message ||
          "Internal server error"
      );
    }
  };

  const columns = [
    {
      dataField: "id",
      text: "User ID",
      headerAlign: "center",
      formatter: (cell) => {
        return <Link to={`/user/${cell}`}>{cell}</Link>
      },
    },
    {
      dataField: "name",
      text: "Name",
    },
    {
      dataField: "email",
      text: "Email",
    },
    {
      dataField: "status",
      text: "Status",
    },
  ];

  const options = {
    // pageStartIndex: 0,
    sizePerPage: 5,
    hideSizePerPage: true,
    hidePageListOnlyOnePage: true,
  };

  return (
    <div className="card-main">
      <h5 className="title-main">User List</h5>
      <div className="mt-3">
        {loader ? (
          <Loader />
        ) : (
          <div className="custom-table">
            <BootstrapTable
              keyField="id"
              data={data}
              columns={columns}
              pagination={paginationFactory(options)}
            />
          </div>
        )}
      </div>
    </div>
  );
}

export default UserList;
