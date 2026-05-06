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
    padding: 12px 20px;
    border-radius: 8px;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
    z-index: 2147483647;
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, sans-serif;
    font-size: 14px;
    font-weight: 500;
    display: flex;
    align-items: center;
    gap: 8px;
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

  #${NOTIFICATION_ID} .proxy-icon {
    width: 18px;
    height: 18px;
    display: inline-block;
  }

  #${NOTIFICATION_ID} .proxy-icon svg {
    width: 100%;
    height: 100%;
  }

  #${NOTIFICATION_ID} .proxy-count {
    background: rgba(255, 255, 255, 0.2);
    padding: 2px 8px;
    border-radius: 12px;
    font-size: 12px;
    font-weight: 600;
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
    <span class="proxy-icon">
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <path d="M5 12h14"></path>
        <path d="M12 5l7 7-7 7"></path>
      </svg>
    </span>
    <span>Request Proxied</span>
    <span class="proxy-count"></span>
  `;
  document.body.appendChild(notificationElement);
};

const showNotification = () => {
  activeRequestCount++;
  
  createNotification();
  
  const countElement = notificationElement.querySelector('.proxy-count');
  if (countElement) {
    countElement.textContent = activeRequestCount;
  }
  
  notificationElement.style.display = 'flex';
  notificationElement.style.opacity = '1';
  
  if (timeoutId) {
    clearTimeout(timeoutId);
  }
  
  timeoutId = setTimeout(() => {
    hideNotification();
  }, 3000);
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
