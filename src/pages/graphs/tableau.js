import React, { useState, useEffect, useRef } from "react";
import './tableau.css';
const { tableau } = window;

function BasicEmbed(props) {
  const [url] = useState(
    "https://public.tableau.com/views/WFViz/mortgagemap?:language=en&:display_count=y&:origin=viz_share_link"
  );
  const ref = useRef(null);

  const initViz = () => {
    new tableau.Viz(ref.current, url);
  };

  useEffect(initViz, []);

  return (
    <div>
      <div className="tableau-graph" ref={ref} />
    </div>
  );
}

const setVizStyle = {
  width: "800px",
  height: "700px",
};

export default BasicEmbed;