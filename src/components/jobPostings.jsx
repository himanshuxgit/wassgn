import React, { useEffect, useState } from "react";
import Select from "react-select";
import makeAnimated from "react-select/animated";
import { useSelector, useDispatch } from "react-redux";
import { addJD, updateTotalCount } from "../redux/store";
import JobCard from "./JobCard";
import { TextField } from "@mui/material";
const animatedComponents = makeAnimated();

const JobPostings = () => {
  const dispatch = useDispatch();
  const locations = useSelector((state) => state.locations);
  const [tempJDList, setTempJDList] = useState([]);
  const init_filter= {
    roles: [],
    experience: null,
    minPay: null,
    locationType: [],
    location: [],
    name: "",
  };
  const [filter, setFilter] = useState(init_filter);
  const [loading, setLoading] = useState(false);
  const handleInfiniteScroll = () => {
    if (
      window.innerHeight + document.documentElement.scrollTop >=
      document.documentElement.offsetHeight - 5
    ) {
      jobsData();
    }
  };
var fetching = false;
var page = 0;

// Fetching Data from API with retry Logic
const fetchJobs = async (retry = 3) => {
  if (fetching) return;
  fetching = true;
  try {
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    const body = JSON.stringify({
      limit: 10,
      offset: page++ * 10,
    });

    const requestOptions = {
      method: "POST",
      headers: myHeaders,
      body,
    };

    const response = await fetch(
      "https://api.weekday.technology/adhoc/getSampleJdJSON",
      requestOptions
    );

    const data = await response.json();
    fetching = false;
    return data;
  } catch (e) {
    await delay(500);
    if (retry > 0) return fetchJobs(retry - 1);
    fetching = false;
    return null;
  }
};
const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));


  // Fetching Data from API
  const jobsData = async () => {
    setLoading(true);
    try {
      const data = await fetchJobs();
      if (!data) return;
      dispatch(addJD(data?.jdList));
      dispatch(updateTotalCount(data?.totalCount));
      setTempJDList(data?.jdList);
    } catch (e) {
      console.log(e);
    }
    setLoading(false);
  };

  //Adding Scroll Event Listener

  useEffect(() => {
    window.addEventListener("scroll", handleInfiniteScroll, {
      passive: true,
    });
    return () => window.removeEventListener("scroll", handleInfiniteScroll);
  }, []);

  useEffect(() => {
    jobsData();
  }, []);

  //Filtering Data based on filters

  // Constants for filters
  const ROLES = [
    {
      label: "ENGINEERING",
      options: [
        {
          label: "Backend",
          value: "backend",
        },
        {
          label: "Frontend",
          value: "frontend",
        },
        {
          label: "Fullstack",
          value: "fullstack",
        },
        {
          label: "Mobile",
          value: "mobile",
        },
        {
          label: "IOS",
          value: "ios",
        },
        {
          label: "Flutter",
          value: "flutter",
        },
      ],
    },
    {
      label: "PRODUCT",
      options: [
        {
          label: "Design",
          value: "design",
        },
      ],
    },
    {
      label: "SALES",
      options: [
        {
          label: "Marketing",
          value: "marketing",
        },
      ],
    },
    {
      label: "FINANCE",
      options: [
        {
          label: "Finance",
          value: "Finance",
        },
      ],
    },
  ];
  

  
  const EXPERIENCE = [
    { label: "1", value: "1" },
    { label: "2", value: "2" },
    { label: "3", value: "3" },

  ];
  
  const PAY = [
    { label: "0", value: "0" },
    { label: "5L", value: "5" },
    { label: "10L", value: "10" },

  ];

  return (
    <div className="container">
      <div className="filters">
        <div className="inputWrapper">
          {filter?.roles?.length > 0 && (
            <label htmlFor="role" className="label">
              Role
            </label>
          )}
          <Select
            closeMenuOnSelect={false}
            inputId="role"
            components={animatedComponents}
            isMulti
            options={ROLES}
            className="select"
            classNamePrefix="select"
            placeholder="Role"
            onChange={(data) =>
              setFilter({ ...filter, roles: data.map((e) => e.value) })
            }
          />
        </div>
        <div className="inputWrapper">
          {filter?.experience && (
            <label htmlFor="experience" className="label">
              Experience
            </label>
          )}
          <Select
            inputId="experience"
            closeMenuOnSelect={false}
            components={animatedComponents}
            options={EXPERIENCE}
            className="select"
            classNamePrefix="select"
            placeholder="Experience"
            isClearable={true}
            onChange={(data) =>
              setFilter({ ...filter, experience: data?.value || null })
            }
          />
        </div>
        <div className="inputWrapper">
          {filter?.location?.length > 0 && (
            <label htmlFor="location" className="label">
              Location
            </label>
          )}
          <Select
            inputId="location"
            closeMenuOnSelect={false}
            components={animatedComponents}
            isMulti
            options={locations.map((location) => ({
              label: location,
              value: location,
            }))}
            className="select"
            classNamePrefix="select"
            placeholder="Location"
            onChange={(data) =>
              setFilter({ ...filter, location: data.map((e) => e.value) })
            }
          />
        </div>
        <div className="inputWrapper">
          {filter?.locationType?.length > 0 && (
            <label htmlFor="locationType" className="label">
              Work Mode
            </label>
          )}


        </div>
        <div className="inputWrapper">
          <Select
            closeMenuOnSelect={false}
            components={animatedComponents}
            isMulti
            options={ROLES}
            className="select"
            isDisabled="true"
            classNamePrefix="select"
            placeholder="Tech Stack"
          />
        </div>
        <div className="inputWrapper">
          {filter?.minPay && (
            <label htmlFor="basepay" className="label">
              Base Pay
            </label>
          )}
          <Select
            inputId="basepay"
            closeMenuOnSelect={false}
            components={animatedComponents}
            options={PAY}
            className="select"
            classNamePrefix="select"
            placeholder="Min Base Pay"
            onChange={(data) => setFilter({ ...filter, minPay: data.value })}
          />
        </div>
        <div className="inputWrapper">
          {filter?.name && (
            <label htmlFor="companyName" className="label">
              Company Name
            </label>
          )}
          <TextField
            id="companyName"
            label="Company Name"
            placeholder="Company Name"
            variant="outlined"
            className="input"
            size="small"
            value={filter.name}
            onChange={(e) => setFilter({ ...filter, name: e.target.value })}
          />
        </div>
      </div>

      <div className="jobs">
        {tempJDList?.length > 0
          ? tempJDList?.map((jd, i) => (
              <JobCard
                key={i}
                name={jd?.companyName}
                role={jd?.jobRole}
                experience={jd?.minExp}
                location={jd?.location}
                details={jd?.jobDetailsFromCompany}
                salary={jd?.minJdSalary}
                logo={jd?.logoUrl}
                jdLink={jd?.jdLink}
              />
            ))
          : !loading && <p>No Jobs Found</p>}
        {loading && (
          <>
            return <div className="cardgrid" />;
          </>
        )}
      </div>
    </div>
  );
};

export default JobPostings;
