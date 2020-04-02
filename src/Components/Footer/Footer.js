import React from 'react';
import * as r from 'ramda';
import types from 'prop-types';
import { connect } from 'react-redux';
import html2canvas from 'html2canvas';
import styled from 'styled-components/macro';
import { Navbar as NavbarBase } from 'react-bootstrap';

import { selectors } from 'Store';
import { saveToFile } from 'Utilities';
import * as translations from 'Assets/Translations';

const Navbar = styled(NavbarBase)`
  color: #5c7080;
  font-size: 14px;
  box-shadow: 0 0 0 1px rgba(16, 22, 26, .1), 0 0 0 rgba(16, 22, 26, 0), 0 1px 1px rgba(16, 22, 26, .2);
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

const FooterBase = ({ language }) => {
  const Strings = translations[language];

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
      {Strings.Footer.InformationSourceDescription.Prefix}

      <ExternalLink href="https://www.who.int/">WHO</ExternalLink>
      {Strings.Footer.InformationSourceDescription.And}
      <ExternalLink href="https://eody.gov.gr/en">NPHO</ExternalLink>

      <DownloadImageButton onClick={handleDownloadImageButtonClick}>
        {Strings.Footer.DownloadImageButton}
      </DownloadImageButton>
    </Navbar>
  )
};

FooterBase.propTypes = {
  language: types.string.isRequired,
};

const {
  getLanguage,
} = selectors.app;

const Footer = r.compose(
  connect(
    r.applySpec({
      language: getLanguage,
    })
  )
)(FooterBase);

export { Footer };