import React, { useEffect, useState } from "react";
var ifsc = require("ifsc");

export default function Ifsc() {
  const [value, setValue] = useState("KKBK0000261");
  const [details, setdetails] = useState({});
  const [error, setError] = useState("");

  //ifsc.validate("KKBK0000261");
  //ifsc.validate("BOTM0XEEMRA");

  useEffect(() => {
    if (value.length > 10 && ifsc.validate(value)) {
      fetchBankDetails(value);
    } else {
      //setdetails({});
    }
  }, [value]);

  const fetchBankDetails = value => {
    ifsc
      .fetchDetails(value)
      .then(function(res) {
        setdetails(res);
      })
      .catch(function(error) {
        setdetails({});
        console.log(error);
      });
  };

  return (
    <div>
      <input
        type="text"
        name="ifsc_code"
        placeholder="Search IFSC code ..."
        value={value}
        onChange={e => setValue(e.target.value)}
      />
      {Object.keys(details).length > 0 && details.constructor === Object && (
        <pre>{JSON.stringify(details, undefined, 2)}</pre>
      )}
    </div>
  );
}
