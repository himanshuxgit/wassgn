import React, { useState } from "react";
import { Box, Button, Typography } from "@mui/material";

const JobCard = ({
  name = "",
  role = "",
  location = "",
  salary = "",
  details = "",
  experience = "",
  logo = "",
  jdLink = "",
}) => {
  const [showMore, setShowMore] = useState(false);
  const capitalizeFirstLetter = (str = "") => {
    return str
      .split(" ")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");
  };
  return (
    <div className="card">
      <div className="companyInfo">
        <div className="logo">
          <Box>
            <img
              alt="logo"
              src={logo}
              style={{ width: "100%", height: "100%", objectFit: "contain" }}
            />
          </Box>
        </div>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "0.2rem",
          }}
        >
          <Typography style={{ fontWeight: "bold", color: "#8b8b8b" }}>
            {name}
          </Typography>
          <Typography>{capitalizeFirstLetter(role)}</Typography>
          <Typography style={{ fontSize: 14 }}>
            {capitalizeFirstLetter(location)}
          </Typography>
        </div>
      </div>
      <div
        style={{
          display: "flex",
          gap: "0.5rem",
          marginTop: "1rem",
          fontWeight: "400",
        }}
      >
        <Typography>Estimated Salary:</Typography>
        <Typography>{salary ? salary + "LPA" : "Undisclosed"}</Typography>
        <Typography>✅</Typography>
      </div>
      <div
        style={{
          display: "flex",
          gap: "0.5rem",
          flexDirection: "column",
          marginTop: "0.5rem",
        }}
      >
        <Typography style={{ fontWeight: "bold" }}>Job Details:</Typography>
        <div
          className="jobDetail"
          style={{ height: showMore ? "fit-content" : "12rem" }}
          onClick={() => showMore && setShowMore(false)}
        >
          <Typography>{details}</Typography>
          {!showMore && <div className="overlay" />}
          {!showMore && (
            <Typography
              style={{
                position: "absolute",
                bottom: "1rem",
                cursor: "pointer",
                color: "#4943da",
              }}
              onClick={() => setShowMore(!showMore)}
            >
              Expand
            </Typography>
          )}
        </div>
      </div>
      <div
        style={{
          display: "flex",
          gap: "0.2rem",
          marginTop: "1rem",
          flexDirection: "column",
        }}
      >
        <Typography
          style={{ fontWeight: "bold", color: "#8b8b8b", letterSpacing: "1px" }}
        >
          Minimum Experience
        </Typography>
        <Typography>{experience || 0} years</Typography>
      </div>
      <Button
        className="button"
        href={jdLink}
        target="_blank"
        rel="noopener noreferrer"
        variant="contained"
        color="primary"
        style={{
          borderRadius: 35,
          backgroundColor: "#58ecc4",
          marginTop: "1rem",
          fontSize: "16px",
          color: "black",
          textDecoration: "none",
        }}
      >
        ⚡ Easy Apply
      </Button>
    </div>
  );
};

export default JobCard;
