import React from 'react';
import cn from 'classnames';
import RequestsList from 'molecules/RequestsList/RequestsList';

import '../Domain.css';
const DomainRequests = ({
  requests,
  className,
  addOverride,
  selectNode,
  onAnalyse,
}) => {
  return (
    <div className={cn('wmax domain-requests', className)}>
      <RequestsList
        className="domain-requests__list"
        requests={requests}
        onSelect={(request) => {
          request?.isProxied ? selectNode(request.id) : addOverride(request);
        }}
        onAnalyse={onAnalyse}
      />
    </div>
  );
};

export default DomainRequests;
