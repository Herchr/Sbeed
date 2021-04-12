import React from "react";
import Description from "../Description/Description";

const desc = `Subvocalization (also known as auditory reassurance) is a very common
habit among readers. It involves saying words in your head while
reading and it’s one of the main reasons why people read slowly and
have trouble improving their reading speed.`;

const SubvocalizationDescription = () => {
  return <Description title="Subvocalization" desc={desc} />;
};

export default SubvocalizationDescription;
