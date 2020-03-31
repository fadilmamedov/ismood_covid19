import React from 'react';
import html2canvas from 'html2canvas';
import styled from 'styled-components/macro';
import { Navbar as NavbarBase } from 'react-bootstrap';

import { saveToFile } from 'Utilities';

const Navbar = styled(NavbarBase)`
  color: #5c7080;
  font-size: 14px;
  box-shadow: 0 0 0 1px rgba(16,22,26,.1), 0 0 0 rgba(16,22,26,0), 0 1px 1px rgba(16,22,26,.2);
`;

const ExternalLink = styled.a.attrs({
  target: '_blank',
})`
  margin: 0 4px;
`;

const DownloadImageButton = styled.button`
  margin-left: auto;
  padding: 0;
  border: 0;
  background: transparent;

  &:hover {
    text-decoration: underline;
  }
`;

const Footer = () => {
  const handleDownloadImageButtonClick = React.useCallback(() => {
    // TODO:
    // refactor this
    const header = document.querySelector('.header');
    const footer = document.querySelector('.footer');
    const contentContainer = document.querySelector('.content-container');

    header.style.position = 'initial';
    footer.style.position = 'initial';
    contentContainer.style.marginTop = '20px';
    contentContainer.style.marginBottom = '20px';

    const scrollPosition = window.scrollY;
    window.scrollTo(0, 0);

    html2canvas(document.querySelector("#root")).then(canvas => {
      saveToFile(canvas.toDataURL(), 'covid19-dashboard.png');

      header.style.position = 'fixed';
      footer.style.position = 'fixed';
      contentContainer.style.marginTop = '70px';
      contentContainer.style.marginBottom = '50px';

      window.scrollTo(0, scrollPosition);
    });
  }, []);

  return (
    <Navbar bg="light" fixed="bottom" className="footer">
      Statistical data collected through
      <ExternalLink href="https://www.who.int/">WHO</ExternalLink> and
      <ExternalLink href="https://eody.gov.gr/en">NPHO</ExternalLink>

      <DownloadImageButton onClick={handleDownloadImageButtonClick}>
        Download as image
      </DownloadImageButton>
    </Navbar>
  )
}

export { Footer };