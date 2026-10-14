// for <input type="datetime-local">
export const toDateTimeInput = (d?: Date | null) =>
  d ? new Date(d.getTime() - d.getTimezoneOffset() * 60000).toISOString().slice(0, 16) : "";

// for <input type="date">
export const toDateInput = (d?: Date | null) => (d ? d.toISOString().slice(0, 10) : "");