import React from 'react';
import * as r from 'ramda';
import types from 'prop-types';
import { connect } from 'react-redux';
import html2canvas from 'html2canvas';

import { selectors } from 'Store';
import { saveToFile } from 'Utilities';
import * as translations from 'Assets/Translations';

import { GreeceRegionsMap } from 'Components/Maps';

import {
  Navbar,
  ExternalLink,
  RightContainer,
  DownloadImageButton,
  InformationSourceDescription,
} from './Footer.Components';

const FooterBase = ({ language }) => {
  const {
    DownloadImageButton: DownloadImageButtonText,
    InformationSourceDescription: InformationSourceDescriptionText,
  } = translations[language].Footer;

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

    GreeceRegionsMap.setFixedWidth();

    html2canvas(document.querySelector("#root")).then(canvas => {
      saveToFile(canvas.toDataURL(), 'covid19-dashboard.png');

      header.style.position = 'fixed';
      footer.style.position = 'fixed';
      contentContainer.style.marginTop = '70px';
      contentContainer.style.marginBottom = '50px';

      window.scrollTo(0, scrollPosition);

      GreeceRegionsMap.setFullWidth();
    });
  }, []);

  return (
    <Navbar bg="light" fixed="bottom" className="footer">
      <InformationSourceDescription>
        {InformationSourceDescriptionText.Prefix}

        <ExternalLink href="https://www.who.int/">
          {InformationSourceDescriptionText.WHO}
        </ExternalLink>
        &
        <ExternalLink href="https://eody.gov.gr/en">
          {InformationSourceDescriptionText.NPHO}
        </ExternalLink>
      </InformationSourceDescription>

      <RightContainer>
        <DownloadImageButton onClick={handleDownloadImageButtonClick}>
          {DownloadImageButtonText}
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