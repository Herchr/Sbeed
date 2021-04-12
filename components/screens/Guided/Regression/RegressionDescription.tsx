import React from "react";
import Description from "../Description/Description";

const desc = `One of the biggest obstacles to speed reading is regression.
It’s the habit of re-reading something you have already read in order to be sure you really understood the message you read.
When regression is compulsive, the habit can be harder to break.
“When you regress like this, you lose the flow and structure of the text, and your overall understanding of the subject can decrease. Be very conscious of regression, and don’t allow yourself to re-read material unless you absolutely have to”, says April Troester, PhD.`;

const RegressionDescription: React.FC = () => {
  return <Description title="Regression" desc={desc} />;
};

export default RegressionDescription;
