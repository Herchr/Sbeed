import React, { useContext } from "react";
import SubvocalizationDescription from "../Subvocalization/SubvocalizationDescription";
import Subvocalization from "../Subvocalization/Subvocalization";
import RegressionDescription from "../Regression/RegressionDescription";
import Regression from "../Regression/Regression";
import FixationDescription from "../Fixation/FixationDescription";
import Fixation from "../Fixation/Fixation";
import { BookContext } from "../../../shared/contexts/BookContext";

function Data() {
  const [storedBook, setStoredBook, loading, counter] = useContext(BookContext);
  const data = [
    {
      screen: <SubvocalizationDescription />,
      hasDesc: true,
    },
    {
      screen: <Subvocalization book={storedBook} />,
    },
    {
      screen: <RegressionDescription />,
      hasDesc: true,
    },
    {
      screen: <Regression book={storedBook} />,
    },
    { screen: <FixationDescription />, hasDesc: true },
    { screen: <Fixation book={storedBook} /> },
  ];
  return data;
}
export default Data;
