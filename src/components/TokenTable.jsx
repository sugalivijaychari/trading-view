import React, { useEffect, useState } from "react";
import TokenRow from "./common/TokenRow";
import TokenData from "./TokenData";
import "./style.css";

const TokenTable = ({ tokenData }) => {
  const [sortedData, setSortedData] = useState([...tokenData]);
  const [sortConfig, setSortConfig] = useState({ key: null, direction: "asc" });
  const [selectedToken, setSelectedToken] = useState(null);
  const [showTokenData, setShowTokenData] = useState(false);

  const sortData = (key) => {
    let direction = "asc";
    if (
      sortConfig &&
      sortConfig.key === key &&
      sortConfig.direction === "asc"
    ) {
      direction = "desc";
    }
    const sorted = [...tokenData].sort((a, b) => {
      if (a[key] * 1 < b[key] * 1) {
        return direction === "asc" ? -1 : 1;
      }
      if (a[key] * 1 > b[key] * 1) {
        return direction === "asc" ? 1 : -1;
      }
      return 0;
    });
    setSortedData([...sorted]);
    setSortConfig({ key, direction });
  };

  const renderSortIcon = (columnName) => {
    if (sortConfig && sortConfig.key === columnName) {
      return sortConfig.direction === "asc" ? "▲" : "▼";
    }
    return null;
  };

  const tableStyle = {
    backgroundColor: "#191919",
    overflowY: "auto",
    maxHeight: "90vh",
    width: "100%",
    cursor: "pointer",
  };
  useEffect(() => {
    setSortedData(tokenData);
  }, [tokenData]);

  const handleRowClick = (token) => {
    setSelectedToken(token);
    setShowTokenData(true);
  };

  const handleCloseOverlay = () => {
    setShowTokenData(false);
  };

  return (
    <div style={{ position: "relative" }}> {/* Add relative positioning to parent div */}
      {/* Table displaying rows */}
      <div className="table-container font-header" style={{ zIndex: showTokenData ? 0 : 1 }}> {/* Keep table under overlay */}
        <table
          className="custom-table"
          style={{
            width: "100%",
            marginTop: "15px",
            marginBottom: "20px",
            fontSize: "medium",
          }}
        >
          <thead className="font-header">
            <tr>
              <th>TOKEN</th>
              <th>PRICE</th>
              <th>MARKETCAP</th>
              <th>LIQUIDITY</th>
              <th>VOLUME</th>
              <th>TOKEN AGE</th>
            </tr>
          </thead>

          <tbody style={{ backgroundColor: "black" }}>
            {sortedData.map((rowData, index) => (
              <TokenRow
                key={index}
                data={rowData}
                onRowClick={handleRowClick} // Pass row click handler to TokenRow
              />
            ))}
          </tbody>
        </table>
      </div>

      {showTokenData && selectedToken && (
        <div className="token-data-overlay">
          <TokenData tokenData={selectedToken} onClose={handleCloseOverlay} />
        </div>
      )}
    </div>
  );
};

export default TokenTable;
