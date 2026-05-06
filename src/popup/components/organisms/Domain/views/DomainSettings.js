import React, { useState, useEffect } from 'react';
import cn from 'classnames';
import { evolve } from 'immutableql';
import Button from 'atoms/Button/Button';
import Icons from 'atoms/Icons/Icons';
import Input from 'atoms/Input/Input';
import FileInput from 'atoms/FileInput/FileInput';

import '../Domain.css';
import ConfirmationButton from 'atoms/Button/ConfirmationButton';
const DomainSettings = ({
  id,
  activeUrls,
  updateNode,
  name,
  className,
  removeDomain,
  ...otherProps
}) => {
  const [domainName, setName] = useState('');
  const [error, setError] = useState('');
  useEffect(() => {
    setName(name || '');
  }, [setName, name]);
  const importToDomain = (importResult) => {
    try {
      let asJson = JSON.parse(importResult);
      if (!Array.isArray(asJson)) {
        asJson = [asJson];
      }
      importResult && otherProps.doImport && otherProps.doImport(asJson);
    } catch (e) {
      setError('File contents could not been parsed as json');
    }
  };
  return (
    <div className={cn(className, 'wmax domain-settings')}>
      <h3 className="domain-settings__title">URL</h3>
      <Input
        label="Name"
        className="domain-settings__name"
        value={domainName}
        validate={(value) => {
          return value === '' && 'Shall not be empty';
        }}
        onChange={(newName) => {
          setName(newName);
          updateNode && updateNode({ id, name: newName });
        }}
      />
      {activeUrls?.map((url, index) => (
        <Input
          key={index}
          label={index === 0 ? 'Active on' : ''}
          value={url}
          className="domain-settings__active-url"
          onChange={(newValue) => {
            let updatedActiveUrls = activeUrls;
            if (newValue === '' && activeUrls.length > 1) {
              updatedActiveUrls = activeUrls.filter((e, i) => i !== index);
            } else {
              updatedActiveUrls = evolve(activeUrls, {
                [index]: newValue,
              });
            }
            updateNode && updateNode({ id, activeUrls: updatedActiveUrls });
          }}
        />
      ))}
      <Button
        tretiary
        Icon={Icons.Add}
        className="domain-settings__add-url animate_add"
        onClick={() =>
          updateNode &&
          updateNode({ id, activeUrls: [...(activeUrls || []), 'https://'] })
        }
      >
        Add active URL
      </Button>
      <h3 className="domain-settings__title">Import and Export</h3>
      <p className="domain-settings__description">
        You can export all the underlying overrides into a file and import them
        for another domain, browser, or folder.
      </p>
      <div className="wmax button-row domain-settings__actions">
        <FileInput secondary onSubmit={importToDomain} error={error}>
          Import
        </FileInput>
        <Button
          secondary
          Icon={Icons.Export}
          onClick={() => otherProps.doExport && otherProps.doExport()}
        >
          Export
        </Button>
      </div>
      <h3 className="domain-settings__title">Turn OFF</h3>
      <p className="domain-settings__description">
        Disabling will temporary disable the underlying overrides. Removing will
        delete them completely.
      </p>
      <div className="wmax button-row domain-settings__actions domain-settings__actions_last">
        <Button secondary Icon={Icons.TurnOff} onClick={otherProps.toggle}>
          {otherProps.isOn ? 'Disable' : 'Enable'}
        </Button>
        <ConfirmationButton secondary Icon={Icons.Trash} onClick={removeDomain}>
          Remove
        </ConfirmationButton>
      </div>
    </div>
  );
};

export default DomainSettings;
