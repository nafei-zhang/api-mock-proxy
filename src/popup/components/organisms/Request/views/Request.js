import React, { useState, useEffect } from 'react';
import Input from 'atoms/Input/Input';
import Section from 'atoms/Section/Section';
import Url from 'molecules/Url/Url';
import HeadersList from 'molecules/HeadersList/HeadersList';
import Body from 'molecules/Body/Body';
import { renameKeys } from 'utils/utils';
import { METHODS } from 'app/utils/constants';

const Request = (props) => {
  const [name, setName] = useState('');
  useEffect(() => {
    setName(props.name);
  }, [props.name]);
  const updateName = (newName) => {
    setName(newName);
    props.onChange && props.onChange({ name: newName });
  };
  return (
    <div className="request-view wmax">
      <Input
        className="request-view__name"
        label="Name"
        value={name}
        onChange={updateName}
        validate={(value) => value === '' && 'Cannot be empty'}
      />
      <Section
        className="request-view__section"
        header={<h3>Request URL</h3>}
        isInitiallyOpen={true}
      >
        <Url
          className="request-view__url"
          initialMethod={props.initialMethod}
          initialUrl={props.initialUrl}
          method={(props.method || props.type || METHODS[0]).toUpperCase()}
          url={props.url || ''}
          onChange={(change) => {
            change = renameKeys(change, [{ from: 'method', to: 'type' }]);
            props.onChange && props.onChange(change);
          }}
        />
      </Section>
      <Section className="request-view__section" header={<h3>Request Body</h3>}>
        <Body
          className="request-view__body"
          body={props.body}
          initialBody={props.initialBody}
          type={props.requestBodyType}
          blobType={props.requestBlobType}
          noChunks={true}
          noDelay={true}
          onChange={(change) => {
            change = renameKeys(change, [
              { from: 'type', to: 'requestBodyType' },
              { from: 'blobType', to: 'requestBlobType' },
            ]);
            props.onChange && props.onChange(change);
          }}
          hideCode
        />
      </Section>
      <Section
        className="request-view__section"
        header={<h3>Request Headers</h3>}
      >
        <HeadersList
          headers={props.requestHeaders}
          onChange={(requestHeaders) => props.onChange({ requestHeaders })}
        />
      </Section>
    </div>
  );
};

export default Request;
