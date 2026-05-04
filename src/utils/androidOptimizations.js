// src/utils/androidOptimizations.js
// Optymalizacje dla Androida

import { Capacitor } from '@capacitor/core';

/**
 * Sprawdzenie czy aplikacja działa na Androidzie
 */
export const isAndroid = () => {
  return Capacitor.getPlatform() === 'android';
};

/**
 * Optymalizacja dla urządzeń mobilnych
 */
export const initializeAndroidOptimizations = () => {
  if (!isAndroid()) return;

  // Zapobieganie zmianom rozmiaru przy pokazaniu klawiatury
  document.addEventListener('touchmove', (e) => {
    if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') {
      return;
    }
  }, { passive: false });

  // Ustawienie viewport dla lepszego skalowania
  const meta = document.querySelector('meta[name="viewport"]');
  if (meta) {
    meta.setAttribute(
      'content',
      'width=device-width, initial-scale=1.0, viewport-fit=cover, user-scalable=no'
    );
  }
};

/**
 * Funkcja wyjścia z aplikacji
 */
export const exitApp = () => {
  if (isAndroid()) {
    navigator.app?.exitApp?.();
  }
};

/**
 * Obsługa przycisku wstecz
 */
export const setupBackButton = (callback) => {
  if (!isAndroid()) return;

  document.addEventListener('backbutton', () => {
    callback?.();
  });
};
