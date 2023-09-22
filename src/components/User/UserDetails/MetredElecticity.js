import React, { useEffect, useState } from "react";
import BootstrapTable from "react-bootstrap-table-next";
import img from "../../../assets/images/logo/logo.png";
import { toast } from "react-toastify";
import {
  getMeteredElectricityListByUserId,
  updateMeteredElectricty,
} from "../../../Utils/api";
import { useParams } from "react-router-dom";
import defaultImg from "../../../assets/images/public/default_question.jpeg";
import getMonthName from "../../../Utils/functions/helpers";

const MetredElecticity = ({ year }) => {
  const [isLoading, setisLoading] = useState(true);
  const [data, setData] = useState([]);
  const { id } = useParams();

  useEffect(() => {
    getData();
  }, [year]);

  const getData = async () => {
    setisLoading(true);
    try {
      const items = await (
        await getMeteredElectricityListByUserId(year, id)
      ).data;
      setData(items);
    } catch (error) {
      toast.error(
        error?.response?.data?.message ||
          error?.message ||
          "Internal server error"
      );
    } finally {
      setisLoading(false);
    }
  };

  const onChangeVerificationHandler = async (status, id) => {
    const formData = {
      verification: status,
    };

    try {
      await updateMeteredElectricty(id, JSON.stringify(formData));
    } catch (error) {
      toast.error(
        error?.response?.data?.message ||
          error?.message ||
          "Internal server error"
      );
    } finally {
      getData();
    }
  };

  const columns = [
    {
      dataField: "id",
      text: "Id",
      formatter: (cell) => {
        return <div>{cell}</div>;
      },
    },
    {
      dataField: "month",
      text: "Month",
      formatter: (cell) => {
        return <div>{getMonthName(cell)}</div>;
      },
    },
    {
      dataField: "unitConsumption",
      text: "Unit Consumption",
      formatter: (cell) => {
        return <div>{cell}</div>;
      },
    },
    {
      dataField: "emissions",
      text: "Emissions",
      formatter: (cell) => {
        return <div>{cell}</div>;
      },
    },
    {
      dataField: "document_name",
      text: "Document Name",
      formatter: (cell) => {
        return <div>{cell ? cell : "-"}</div>;
      },
    },
    {
      dataField: "document_path",
      text: "Document",
      formatter: (cell) => {
        return (
          <div>
            <img
              height={40}
              width={40}
              className="rounded-circle"
              src={cell || defaultImg}
            />
          </div>
        );
      },
    },
    {
      dataField: "verification",
      text: "Document Verification",
      formatter: (cell, row) => {
        return (
          <div>
            <select
              onChange={(e) =>
                onChangeVerificationHandler(e?.target?.value, row?.id)
              }
            >
              <option selected={cell === "pending"} value="pending">
                Pending
              </option>
              <option selected={cell === "approved"} value="approved">
                Approved
              </option>
            </select>
          </div>
        );
      },
    },
  ];

  const documentData = [
    {
      id: 1133,
      document: <img src={img} alt="img" />,
    },
  ];

  return (
    <div>
      <div className="custom-table">
        <BootstrapTable keyField="id" data={data} columns={columns} />
      </div>
    </div>
  );
};

export default MetredElecticity;
