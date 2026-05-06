import React from 'react';
import Section from 'atoms/Section/Section';
import Body from 'molecules/Body/Body';
import HeadersList from 'molecules/HeadersList/HeadersList';

const Response = ({ ...otherProps }) => {
  return (
    <div className="request-view response-view wmax">
      <Section
        className="request-view__section"
        header={<h3>Response Body</h3>}
        isInitiallyOpen={true}
      >
        <Body className="request-view__body" {...otherProps} />
      </Section>
      <Section
        className="request-view__section"
        header={<h3>Response Headers</h3>}
        isInitiallyOpen={false}
        {...otherProps}
      >
        <HeadersList
          headers={otherProps.responseHeaders}
          onChange={(responseHeaders) =>
            otherProps.onChange({ responseHeaders })
          }
        />
      </Section>
    </div>
  );
};

export default Response;
