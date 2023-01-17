import styled, { css } from "styled-components";

export const TabHeaderContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`;

export const StylizedTab = styled.button`
  width: 100%;
  padding: 10px 10px;
  margin: 0.5rem 0.8rem;
  font-size: 1.25rem;
  color: white;
  background: transparent;
  mix-blend-mode: normal;
  border-radius: 25px;
  font-family: 'Montserrat';
  border: none;
  border-bottom-color: none;
  outline: none;
  border:none;
  cursor: ${(p) => (p.disabled ? "default" : "pointer")};
  ${(p) =>
    p.active &&
    css`
      font-weight: bold;
      outline: none;
      border:none;
      background: #D13738;
    `}
  ${(p) => !p.active && p.inactiveStyle}
`;

export const StyledTabPanel = styled.div`
  display: ${(p) => (p.active ? "flex" : "none")};
  flex-direction: column;
  justify-content: center;
  border-radius:10px;
`;

export const TabsHolder = styled.div`
  display: flex;
  /* can be used to stack them vertically by using column*/
  flex-direction: row;
  background: #E75353;
  border-radius: 35px;
  width: 50%;
  align-self: center;
  margin: 50px 0px;
  @media(max-width: 1024px) {
    width: 100%;
  }
`;

export const inactiveTab = {
  opacity: 0.55
};

// width, index,
/**
 * [0] [1] [2] ...
 * W * index
 *
 */