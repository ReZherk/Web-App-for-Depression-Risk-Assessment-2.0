import styled from "styled-components";
import { FaBars, FaBell } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { useNotification } from "../../context/useNotification";


export function HeaderWithNotification() {
 const navigate = useNavigate();
 const { hasNewEvaluation } = useNotification();

 return (
  <Header>
   <MenuButton>
    <FaBars />
   </MenuButton>

   <NotificationWrapper onClick={() => navigate("/results")}>
    <FaBell />
    {hasNewEvaluation && <NotificationDot />}
   </NotificationWrapper>
  </Header>
 );
}

const Header = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
`;

const MenuButton = styled.button`
  background: none;
  border: none;
  font-size: 24px;
  cursor: pointer;
  color: #0A3D62;
`;

const NotificationWrapper = styled.button`
  position: relative;
  background: none;
  border: none;
  font-size: 24px;
  cursor: pointer;
  color: #0A3D62;
`;

const NotificationDot = styled.span`
  position: absolute;
  top: 2px;
  right: 2px;
  width: 10px;
  height: 10px;
  background-color: red;
  border-radius: 50%;
`;