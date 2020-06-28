import styled from 'styled-components/macro';
import { Navbar as NavbarBase } from 'react-bootstrap';

const Navbar = styled(NavbarBase)`
  color: #5c7080;
  font-size: 14px;
  box-shadow: 0 0 0 1px rgba(16, 22, 26, .1), 0 0 0 rgba(16, 22, 26, 0), 0 1px 1px rgba(16, 22, 26, .2);

  @media screen and (max-width: 575px) {
    flex-direction: column;
    align-items: flex-start;
  }
`;

const ExternalLink = styled.a.attrs({
  target: '_blank',
})`
  margin: 0 4px;
`;

const RightContainer = styled.div`
  display: flex;
  margin-left: auto;

  @media screen and (max-width: 575px) {
    width: 100%;
    margin-top: 10px;
    margin-left: 0;
    justify-content: space-between;
  }
`;

const DownloadImageButton = styled.button`
  padding: 0;
  border: 0;
  color: #007bff;
  background: transparent;
  white-space: nowrap;

  &:hover {
    text-decoration: underline;
  }

  @media screen and (max-width: 575px) {
    font-size: 12px;
  }
`;

const InformationSourceDescription = styled.span``;

export {
  Navbar,
  ExternalLink,
  RightContainer,
  DownloadImageButton,
  InformationSourceDescription,
};
