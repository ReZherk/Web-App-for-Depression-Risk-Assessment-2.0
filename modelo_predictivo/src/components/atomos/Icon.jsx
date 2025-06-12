import styled from "styled-components";

import { FaHome, FaUser, FaClipboardList, FaChartLine, FaBars, FaBell, FaEye, FaEyeSlash, FaCheck } from "react-icons/fa";


export const Icon = ({ name, size = "medium", color = "black", className }) => {
 const getIcon = () => {

  switch (name) {
   case "home":
    return <FaHome />
   case "user":
    return <FaUser />
   case "clipboard":
    return <FaClipboardList />
   case "chart":
    return <FaChartLine />
   case "menu":
    return <FaBars />
   case "bell":
    return <FaBell />
   case "eye":
    return <FaEye />
   case "eye-slash":
    return <FaEyeSlash />
   case "check":
    return <FaCheck />
   default:
    return null

  }
 }
 return (
  <StyledIcon size={size} color={color} className={className}>
   {getIcon()}
  </StyledIcon>
 )

}

const StyledIcon = styled.span`
   display: inline-flex;
   align-items: center;
   justify-content: center;
   color:${(props) => props.color || "currentColor"};

   ${(props) => props.size === "small" && `font-size: 16px;`}

   ${(props) => props.size === "medium" && `font-size: 20px;`}

   ${(props) => props.size === "large" && `font-size: 24px;`}
   `


