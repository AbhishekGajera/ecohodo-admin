import React, { useState, useEffect } from "react";
import Loader from "../Loader";
import { toast } from "react-toastify";
import { useParams } from "react-router-dom";
import Tabs from "react-bootstrap/Tabs";
import Tab from "react-bootstrap/Tab";
import { getUserById } from "../../Utils/api";
import General from "./UserDetails/General";
import MetredElecticity from "./UserDetails/MetredElecticity";

function UserDetail() {
  const { id } = useParams();
  const [loader, setLoader] = useState(false);
  const [key, setKey] = useState("genral");
  const [data, setData] = useState(null);
  const [year, setYear] = useState(2022);

  const getUserDetail = async () => {
    setLoader(true);
    try {
      const items = await (await getUserById(id)).data;
      setData(items);
    } catch (error) {
      toast.error(error?.response?.data?.message || "Internal server error");
    } finally {
      setLoader(false);
    }
  };

  useEffect(() => {
    getUserDetail();
  }, [id]);

  return (
    <div className="card-main">
      <div className="d-flex justify-content-between align-items-center">
        <h5 className="title-main">User Detail</h5>
        <div>
          <label className="pb-3 mx-2 text-left">
            Select Year:
            <select
              value={year}
              onChange={(e) => {
                setYear(e.target.value);
              }}
              className="form-control select-box"
            >
              <option value="2021">2021</option>
              <option value="2022">2022</option>
              <option value="2023">2023</option>
              <option value="2024">2024</option>
            </select>
          </label>
        </div>
      </div>
      <div className="mt-3">
        {loader && <Loader />}
        {!loader && (
          <div>
            <Tabs
              id="controlled-tabs"
              className="userdetail-tab"
              activeKey={key}
              onSelect={(k) => setKey(k)}
            >
              <Tab eventKey="genral" title="User Info">
                <div className="mt-3">
                  <General data={data} />
                </div>
              </Tab>
              <Tab eventKey="metered" title="Metered Electricity">
                <div className="mt-3">
                  <MetredElecticity year={year} />
                </div>
              </Tab>
            </Tabs>
          </div>
        )}
      </div>
    </div>
  );
}

export default UserDetail;
