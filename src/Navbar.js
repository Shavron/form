import React from "react";
import "./Navbar.css";
import {
  BrowserRouter,
  Route,
  Switch,
  Redirect,
  Link,
  useLocation,
  NavLink
} from "react-router-dom";

export default function Navbar() {
  return (
    <ul style={{ marginBottom: "20px" }}>
      <li>
        <a href="/form">Form</a>
      </li>
      <li>
        <a href="/react-hook-form"> React Hook Form </a>
      </li>
      <li>
        <a href="/Ifsc">Ifsc</a>
      </li>
      <li>
        <a href="/addmore">addmore</a>
      </li>
    </ul>
  );
}
