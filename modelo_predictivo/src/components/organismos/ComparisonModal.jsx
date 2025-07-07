"use client"

import styled from "styled-components"
import { ComparisonTable } from "../moleculas/ComparisonTable"

export function ComparisonModal({ isOpen, onClose, monthlyData, months }) {
 if (!isOpen) return null

 return (
  <Overlay onClick={onClose}>
   <Modal onClick={(e) => e.stopPropagation()}>
    <Header>
     <Title>COMPARACIÓN IA vs EVALUACIÓN MANUAL</Title>
     <CloseButton onClick={onClose}>✕</CloseButton>
    </Header>

    <Content>
     <ComparisonTable monthlyData={monthlyData} months={months} />
    </Content>
   </Modal>
  </Overlay>
 )
}

const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`

const Modal = styled.div`
  background: white;
  border-radius: 12px;
  max-width: 800px;
  width: 90%;
  max-height: 80vh;
  overflow-y: auto;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
`

const Header = styled.div`
  background: #0A3D62;
  color: white;
  padding: 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-radius: 12px 12px 0 0;
`

const Title = styled.h2`
  margin: 0;
  font-size: 18px;
  font-weight: 600;
`

const CloseButton = styled.button`
  background: none;
  border: none;
  color: white;
  font-size: 24px;
  cursor: pointer;
  padding: 0;
  width: 30px;
  height: 30px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  
  &:hover {
    background: rgba(255, 255, 255, 0.1);
  }
`

const Content = styled.div`
  padding: 20px;
`
