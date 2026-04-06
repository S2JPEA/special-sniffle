"use client";

import { useEffect, useState } from 'react';

type Status = {
  isLive: boolean;
  useMock: boolean;
  hasKey: boolean;
  model?: string;
};

export function useGenerationStatus() {
  const [status, setStatus] = useState<Status | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;
    fetch('/api/status')
      .then((res) => res.json())
      .then((data: Status) => {
        if (!cancelled) setStatus(data);
      })
      .catch((err) => {
        if (!cancelled) setError(err?.message || 'status fetch failed');
      });
    return () => {
      cancelled = true;
    };
  }, []);

  return { status, error };
}

