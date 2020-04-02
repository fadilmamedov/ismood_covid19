import React from 'react';
import * as r from 'ramda';
import types from 'prop-types';
import { connect } from 'react-redux';
import html2canvas from 'html2canvas';

import { selectors } from 'Store';
import { saveToFile } from 'Utilities';
import * as translations from 'Assets/Translations';

import {
  Navbar,
  ExternalLink,
  ContactUsLink,
  RightContainer,
  DownloadImageButton,
  InformationSourceDescription,
} from './Footer.Components';

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
    <Navbar bg="light" className="footer">
      <InformationSourceDescription>
        {Strings.Footer.InformationSourceDescription.Prefix}

        <ExternalLink href="https://www.who.int/">WHO</ExternalLink>
        {Strings.Footer.InformationSourceDescription.And}
        <ExternalLink href="https://eody.gov.gr/en">NPHO</ExternalLink>
      </InformationSourceDescription>

      <RightContainer>
        <ContactUsLink href="mailto: covid19@ismood.com">
          {Strings.Footer.ContactUsLink}
        </ContactUsLink>

        <DownloadImageButton onClick={handleDownloadImageButtonClick}>
          {Strings.Footer.DownloadImageButton}
        </DownloadImageButton>
      </RightContainer>
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