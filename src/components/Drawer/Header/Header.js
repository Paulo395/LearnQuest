import React from "react";
import { Link } from "react-router-dom";
import "./Header.css";
import { Button } from "@mui/material";

export default function Header(props) {
  return (          
    <section className="MenuHeader">
      <h1>
        {props.headerTitle}
        <section className="sectionButtons">
          {props.button && (
            <Link to={props.buttonPath} onClick={props.onClick}>
              <Button variant="contained" startIcon="+"> 
                {props.buttonLabel}
              </Button>
            </Link>
          )}
          {props.buttonAssignDisplay && (
            <Button variant="contained"> 
              {props.buttonLabelAssignDisplay}
            </Button>
          )}
          {props.buttonGenerateQrCode && (
            <Button variant="contained" startIcon="+"> 
              {props.buttonLabelGenerateQrCode}
            </Button>
          )}
        </section>
      </h1>
    </section>
  );
}
