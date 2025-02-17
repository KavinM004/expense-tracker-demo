import React, { useState, useContext } from "react";
import { Button } from "@mui/material";
import { downloadReport } from "../utils/api";
import { AuthContext } from "../context/AuthContext";

const ReportDownload = ({ month = "02", year = "2025" }) => {
  const { auth } = useContext(AuthContext);
  const [loading, setLoading] = useState(false);

  const handleDownload = async () => {
    if (!auth?.token) return;
    setLoading(true);
    try {
      await downloadReport(month, year, auth.token);
    } catch (error) {
      console.error(
        "Error downloading report:",
        error.response?.data || error.message
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <Button
      variant="contained"
      color="primary"
      onClick={handleDownload}
      disabled={loading}
    >
      {loading ? "Downloading..." : "Download Report"}
    </Button>
  );
};

export default ReportDownload;
