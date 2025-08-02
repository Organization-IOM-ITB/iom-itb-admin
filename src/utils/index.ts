export const formattedPrice = (value: number) => {
    if (value === undefined || value === null) return '';
    const numberValue = value;
  
    if (isNaN(numberValue)) return '';
  
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0,
    }).format(numberValue);
  };
  

export const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = {
      weekday: 'short',
      day: '2-digit',
      month: 'short',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      hour12: true,
    };
    
    const date = new Date(dateString);
    const monthNames = ["Jan", "Feb", "Mar", "Apr", "Mei", "Jun", "Jul", "Agu", "Sep", "Okt", "Nov", "Des"];
    const formattedDate = date.toLocaleDateString('en-US', options)
      .replace(/(Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec)/g, (matched) => monthNames[new Date(`${matched} 1`).getMonth()]);
  
    return formattedDate.replace('AM', 'AM').replace('PM', 'PM');
  };

  export const truncate = (name: string, length = 50) => {
    return name?.length > length ? `${name.substring(0, length)}...` : name;
  };
