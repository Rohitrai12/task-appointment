import { useState, useEffect, useCallback } from "react";
import { fetchAppointment } from "../api/mockData";

export function useAppointment(appointmentId) {
  const [appointment, setAppointment] = useState(null);
  const [invoice, setInvoice] = useState(null);
  const [error, setError] = useState(null);
  const [retryCount, setRetryCount] = useState(0);
  const [resolvedKey, setResolvedKey] = useState(null);

  const fetchKey = `${appointmentId}:${retryCount}`;
  const loading = resolvedKey !== fetchKey;

  useEffect(() => {
    let cancelled = false;

    fetchAppointment(appointmentId)
      .then((data) => {
        if (cancelled) return;
        setAppointment(data.appointment);
        setInvoice(data.invoice);
        setError(null);
        setResolvedKey(fetchKey);
      })
      .catch((err) => {
        if (cancelled) return;
        setAppointment(null);
        setInvoice(null);
        setError(
          err.response?.data?.message ||
          err.message ||
          "Failed to load appointment",
        );
        setResolvedKey(fetchKey);
      });

    return () => {
      cancelled = true;
    };
  }, [appointmentId, fetchKey]);

  const retry = useCallback(() => {
    setAppointment(null);
    setInvoice(null);
    setError(null);
    setRetryCount((count) => count + 1);
  }, []);

  const updateAppointmentStatus = (status) => {
    setAppointment((prev) => (prev ? { ...prev, status } : prev));
  };

  const updateInvoiceStatus = (status) => {
    setInvoice((prev) => (prev ? { ...prev, status } : prev));
  };

  return {
    appointment,
    invoice,
    loading,
    error,
    retry,
    updateAppointmentStatus,
    updateInvoiceStatus,
  };
}
