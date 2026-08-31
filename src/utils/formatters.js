export const formatCurrency = (pence) => {
    const amount = Number(pence) || 0;
  
    return new Intl.NumberFormat('en-GB', {
      style: 'currency',
      currency: 'GBP',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(amount / 100);
  };
  
  export const formatDate = (date) => {
    if (!date) return '';
  
    return new Intl.DateTimeFormat('en-GB', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
    }).format(new Date(date));
  };
  
  export const formatTime = (time) => {
    if (!time) return '';
  
    const [hours, minutes] = time.split(':').map(Number);
  
    if (Number.isNaN(hours) || Number.isNaN(minutes)) {
      return time;
    }
  
    const date = new Date();
    date.setHours(hours, minutes, 0, 0);
  
    return new Intl.DateTimeFormat('en-GB', {
      hour: 'numeric',
      minute: '2-digit',
      hour12: true,
    }).format(date);
  };
  
  export const capitalize = (value) => {
    if (!value) return '';
  
    return value.charAt(0).toUpperCase() + value.slice(1);
  };
  
  export const formatStatus = (status) => {
    if (!status) return '';
  
    return status
      .split('-')
      .map((word) => capitalize(word))
      .join(' ');
  };