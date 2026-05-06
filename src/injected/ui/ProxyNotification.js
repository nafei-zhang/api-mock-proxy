let notificationElement = null;
let timeoutId = null;
let activeRequestCount = 0;

const NOTIFICATION_ID = 'api-mock-proxy-notification';
const STYLES = `
  #${NOTIFICATION_ID} {
    position: fixed;
    top: 20px;
    right: 20px;
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    color: white;
    padding: 14px 20px;
    border-radius: 10px;
    box-shadow: 0 6px 20px rgba(0, 0, 0, 0.2);
    z-index: 2147483647;
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, sans-serif;
    font-size: 14px;
    font-weight: 500;
    display: flex;
    flex-direction: column;
    gap: 6px;
    min-width: 280px;
    max-width: 400px;
    transition: opacity 0.3s ease, transform 0.3s ease;
    animation: slideIn 0.3s ease;
  }

  @keyframes slideIn {
    from {
      opacity: 0;
      transform: translateX(100px);
    }
    to {
      opacity: 1;
      transform: translateX(0);
    }
  }

  #${NOTIFICATION_ID} .proxy-header {
    display: flex;
    align-items: center;
    gap: 8px;
  }

  #${NOTIFICATION_ID} .proxy-icon {
    width: 20px;
    height: 20px;
    display: inline-block;
    flex-shrink: 0;
  }

  #${NOTIFICATION_ID} .proxy-icon svg {
    width: 100%;
    height: 100%;
  }

  #${NOTIFICATION_ID} .proxy-title {
    font-weight: 600;
    flex-grow: 1;
  }

  #${NOTIFICATION_ID} .proxy-count {
    background: rgba(255, 255, 255, 0.2);
    padding: 2px 10px;
    border-radius: 12px;
    font-size: 12px;
    font-weight: 600;
  }

  #${NOTIFICATION_ID} .proxy-url {
    background: rgba(0, 0, 0, 0.15);
    padding: 8px 10px;
    border-radius: 6px;
    font-size: 12px;
    font-family: 'SF Mono', Monaco, 'Cascadia Code', 'Courier New', monospace;
    word-break: break-all;
    line-height: 1.4;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
  }
`;

const createNotification = () => {
  if (notificationElement) {
    return;
  }

  const style = document.createElement('style');
  style.textContent = STYLES;
  document.head.appendChild(style);

  notificationElement = document.createElement('div');
  notificationElement.id = NOTIFICATION_ID;
  notificationElement.innerHTML = `
    <div class="proxy-header">
      <span class="proxy-icon">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <path d="M5 12h14"></path>
          <path d="M12 5l7 7-7 7"></path>
        </svg>
      </span>
      <span class="proxy-title">Request Proxied</span>
      <span class="proxy-count"></span>
    </div>
    <div class="proxy-url"></div>
  `;
  document.body.appendChild(notificationElement);
};

const showNotification = (url) => {
  activeRequestCount++;
  
  createNotification();
  
  const countElement = notificationElement.querySelector('.proxy-count');
  if (countElement) {
    countElement.textContent = activeRequestCount;
  }
  
  const urlElement = notificationElement.querySelector('.proxy-url');
  if (urlElement) {
    urlElement.textContent = url || '';
  }
  
  notificationElement.style.display = 'flex';
  notificationElement.style.opacity = '1';
  
  if (timeoutId) {
    clearTimeout(timeoutId);
  }
  
  timeoutId = setTimeout(() => {
    hideNotification();
  }, 4000);
};

const hideNotification = () => {
  if (notificationElement) {
    notificationElement.style.opacity = '0';
    setTimeout(() => {
      notificationElement.style.display = 'none';
    }, 300);
  }
};

const resetNotification = () => {
  activeRequestCount = 0;
  if (notificationElement) {
    const countElement = notificationElement.querySelector('.proxy-count');
    if (countElement) {
      countElement.textContent = '';
    }
  }
};

export default {
  showNotification,
  hideNotification,
  resetNotification
};
